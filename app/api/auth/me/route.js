import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { destroySession, getSessionUserId } from "@/lib/session";
import { json, serverError } from "@/lib/http";
import { findUserById, parseUserId, toPublicUser } from "@/models/User";

// Returns the signed-in user, or { user: null } for visitors (always 200, so
// anonymous page loads do not log errors in the browser console).
export async function GET() {
  // Depends on the visitor's cookie: always render at request time, never at build time.
  await connection();
  try {
    const rawId = await getSessionUserId();
    const userId = parseUserId(rawId);
    if (!userId) {
      if (rawId) await destroySession();
      return json({ user: null });
    }

    await connectDB();
    const user = await findUserById(userId);
    if (!user) {
      await destroySession(); // account was deleted
      return json({ user: null });
    }
    return json({ user: toPublicUser(user) });
  } catch (err) {
    return serverError(err, "me");
  }
}
