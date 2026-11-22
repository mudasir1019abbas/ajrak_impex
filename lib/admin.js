import "server-only";
import { connectDB } from "@/lib/db";
import { getSessionUserId } from "@/lib/session";
import { parseUserId, findUserById } from "@/models/User";
import { isAdminUserId } from "@/lib/adminConfig";

export async function getAdminUser() {
  const userId = parseUserId(await getSessionUserId());
  if (!userId) return null;

  await connectDB();
  const user = await findUserById(userId);
  return user && isAdminUserId(user.id) ? user : null;
}
