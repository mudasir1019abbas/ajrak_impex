import { connection } from "next/server";
import { json, serverError } from "@/lib/http";
import { requireAdminApi } from "@/lib/adminApi";
import { getAdminInquiryStats } from "@/models/ContactMessage";
import { getUserCount } from "@/models/User";

export async function GET() {
  await connection();
  try {
    const denied = await requireAdminApi();
    if (denied) return denied;

    const [users, inquiries] = await Promise.all([
      getUserCount(),
      getAdminInquiryStats(),
    ]);

    return json({
      overview: {
        users,
        inquiries: inquiries.total,
        newInquiries: inquiries.new,
        inReviewInquiries: inquiries.read,
        repliedInquiries: inquiries.replied,
      },
    });
  } catch (err) {
    return serverError(err, "admin overview");
  }
}
