import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { destroySession, getSessionUserId } from "@/lib/session";
import { fail, json, serverError } from "@/lib/http";
import { getUserInquirySummary } from "@/models/InquiryMessage";
import { findUserById, parseUserId } from "@/models/User";

export async function GET() {
  await connection();
  try {
    const rawId = await getSessionUserId();
    const userId = parseUserId(rawId);
    if (!userId) {
      if (rawId) await destroySession();
      return fail("Please log in to view your account.", 401);
    }

    await connectDB();
    const user = await findUserById(userId);
    if (!user) {
      await destroySession();
      return fail("Please log in to view your account.", 401);
    }

    const summary = await getUserInquirySummary(user.id);

    return json({
      profile: {
        name: user.name,
        email: user.email,
        joinedAt: user.createdAt,
      },
      summary: {
        total: summary.total,
        awaitingReply: summary.awaitingReply,
        replied: summary.replied,
      },
      inquiries: summary.inquiries,
    });
  } catch (err) {
    return serverError(err, "account");
  }
}
