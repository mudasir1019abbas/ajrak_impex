import "server-only";
import { fail } from "@/lib/http";
import { getAdminUser } from "@/lib/admin";
import { hasConfiguredAdminUsers } from "@/lib/adminConfig";

export async function requireAdminApi() {
  if (!hasConfiguredAdminUsers()) {
    return fail("Admin access is not configured on this server.", 503);
  }
  if (!(await getAdminUser())) {
    return fail("Admin access required.", 403);
  }
  return null;
}
