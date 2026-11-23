import { query } from "@/lib/db";
import { isAdminUserId } from "@/lib/adminConfig";

// SQL version of the old Mongoose User model. A "user" here is a plain
// object: { id, name, email, createdAt, updatedAt } — plus passwordHash
// only when explicitly requested with { withHash: true } (login check).

function rowToUser(row, { withHash = false } = {}) {
  if (!row) return null;
  const user = {
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
  if (withHash) user.passwordHash = row.passwordHash;
  return user;
}

const COLUMNS = "id, name, email, created_at AS createdAt, updated_at AS updatedAt";

export async function findUserByEmail(email, { withHash = false } = {}) {
  const columns = withHash ? `${COLUMNS}, password_hash AS passwordHash` : COLUMNS;
  const rows = await query(`SELECT ${columns} FROM users WHERE email = ? LIMIT 1`, [email]);
  return rowToUser(rows[0], { withHash });
}

export async function findUserById(id) {
  const rows = await query(`SELECT ${COLUMNS} FROM users WHERE id = ? LIMIT 1`, [id]);
  return rowToUser(rows[0]);
}

export async function userExistsByEmail(email) {
  const rows = await query("SELECT 1 AS found FROM users WHERE email = ? LIMIT 1", [email]);
  return rows.length > 0;
}

export async function getUserCount() {
  const rows = await query("SELECT COUNT(*) AS total FROM users");
  return Number(rows[0].total);
}

export async function getAdminUserPage({ search, limit, offset }) {
  const where = search ? "WHERE u.name LIKE ? OR u.email LIKE ?" : "";
  const params = search ? [`%${search}%`, `%${search}%`] : [];
  const countRows = await query(
    `SELECT COUNT(*) AS total FROM users u ${where}`,
    params
  );
  const rows = await query(
    `SELECT u.id, u.name, u.email, u.created_at AS createdAt,
            COUNT(i.id) AS inquiryCount
       FROM users u
       LEFT JOIN inquiries i ON i.user_id = u.id
       ${where}
      GROUP BY u.id, u.name, u.email, u.created_at
      ORDER BY u.created_at DESC, u.id DESC
      LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return {
    total: Number(countRows[0].total),
    users: rows.map((row) => ({
      id: String(row.id),
      name: row.name,
      email: row.email,
      createdAt: row.createdAt,
      inquiryCount: Number(row.inquiryCount),
    })),
  };
}

export async function createUser({ name, email, passwordHash }) {
  const result = await query(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, passwordHash]
  );
  return findUserById(result.insertId);
}

// Session cookies carry the user id as a string. Returns a positive
// integer id, or null for anything else (replaces mongoose.isValidObjectId).
export function parseUserId(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

// Public shape; the admin flag is derived from the server-side ID allowlist.
export function toPublicUser(user) {
  return {
    id: String(user.id),
    name: user.name,
    email: user.email,
    isAdmin: isAdminUserId(user.id),
  };
}
