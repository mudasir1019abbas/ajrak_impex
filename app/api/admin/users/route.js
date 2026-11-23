import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { fail, json, serverError } from "@/lib/http";
import { requireAdminApi } from "@/lib/adminApi";
import { getAdminUserPage } from "@/models/User";

const PAGE_SIZE = 20;

export async function GET(request) {
  await connection();
  try {
    const denied = await requireAdminApi();
    if (denied) return denied;
    await connectDB();

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const search = (url.searchParams.get("search") || "").trim();
    if (!Number.isSafeInteger(page) || page < 1 || page > 10000) {
      return fail("Invalid page number.", 400);
    }
    if (search.length > 100) return fail("Search must be 100 characters or fewer.", 400);

    const pageSize = PAGE_SIZE;
    const result = await getAdminUserPage({
      search,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    return json({ ...result, page, pageSize });
  } catch (err) {
    return serverError(err, "admin users");
  }
}
