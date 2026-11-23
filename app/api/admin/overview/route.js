import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { json, serverError } from "@/lib/http";
import { requireAdminApi } from "@/lib/adminApi";
import { getAdminInquiryStats } from "@/models/InquiryMessage";
import { getUserCount } from "@/models/User";

export async function GET() {
  await connection();
  try {
    const denied = await requireAdminApi();
    if (denied) return denied;
    await connectDB();

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
