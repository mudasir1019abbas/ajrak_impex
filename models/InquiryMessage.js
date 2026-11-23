import { query } from "@/lib/db";

// SQL access for inquiry records.

export async function createInquiryMessage({
  name,
  email,
  phone,
  subject,
  message,
  user,
}) {
  await query(
    "INSERT INTO inquiries (name, email, phone, subject, message, user_id) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email ?? null, phone ?? null, subject, message, user ?? null]
  );
}

// Counts + latest 10 inquiries for one account, used by /api/account.
export async function getUserInquirySummary(userId) {
  const countRows = await query(
    `SELECT COUNT(*) AS total,
            COALESCE(SUM(status <> 'replied'), 0) AS awaitingReply,
            COALESCE(SUM(status = 'replied'), 0) AS replied
       FROM inquiries
      WHERE user_id = ?`,
    [userId]
  );
  const inquiries = await query(
    `SELECT id, subject, message, status, created_at AS createdAt
       FROM inquiries
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 10`,
    [userId]
  );
  const counts = countRows[0] ?? { total: 0, awaitingReply: 0, replied: 0 };
  return {
    total: Number(counts.total),
    awaitingReply: Number(counts.awaitingReply),
    replied: Number(counts.replied),
    inquiries: inquiries.map((inquiry) => ({
      id: String(inquiry.id),
      subject: inquiry.subject,
      message: inquiry.message,
      status: inquiry.status,
      createdAt: inquiry.createdAt,
    })),
  };
}

function rowToAdminInquiry(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    status: row.status,
    createdAt: row.createdAt,
    userId: row.userId == null ? null : String(row.userId),
  };
}

export async function getAdminInquiryStats() {
  const rows = await query(
    `SELECT COUNT(*) AS total,
            COALESCE(SUM(status = 'new'), 0) AS newCount,
            COALESCE(SUM(status = 'read'), 0) AS readCount,
            COALESCE(SUM(status = 'replied'), 0) AS repliedCount
       FROM inquiries`
  );
  const row = rows[0];
  return {
    total: Number(row.total),
    new: Number(row.newCount),
    read: Number(row.readCount),
    replied: Number(row.repliedCount),
  };
}

export async function getAdminInquiryPage({
  status,
  search,
  limit,
  offset,
}) {
  const conditions = [];
  const params = [];

  if (status !== "all") {
    conditions.push("status = ?");
    params.push(status);
  }
  if (search) {
    conditions.push("(name LIKE ? OR email LIKE ? OR phone LIKE ? OR subject LIKE ? OR message LIKE ?)");
    const term = `%${search}%`;
    params.push(term, term, term, term, term);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const countRows = await query(
    `SELECT COUNT(*) AS total FROM inquiries ${where}`,
    params
  );
  const rows = await query(
    `SELECT id, name, email, phone, subject, message, status,
            created_at AS createdAt, user_id AS userId
       FROM inquiries
       ${where}
      ORDER BY created_at DESC, id DESC
      LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return {
    total: Number(countRows[0].total),
    inquiries: rows.map(rowToAdminInquiry),
  };
}

export async function updateInquiryStatus(id, status) {
  await query("UPDATE inquiries SET status = ? WHERE id = ?", [status, id]);
  const rows = await query(
    `SELECT id, name, email, phone, subject, message, status,
            created_at AS createdAt, user_id AS userId
       FROM inquiries
      WHERE id = ?
      LIMIT 1`,
    [id]
  );
  return rowToAdminInquiry(rows[0]);
}
