import { connection } from "next/server";
import { connectDB } from "@/lib/db";
import { fail, json, readJson, serverError } from "@/lib/http";
import { requireAdminApi } from "@/lib/adminApi";
import {
  getAdminInquiryPage,
  updateInquiryStatus,
} from "@/models/InquiryMessage";

const PAGE_SIZE = 20;
const STATUSES = new Set(["new", "read", "replied"]);

function getPagination(url) {
  const page = Number(url.searchParams.get("page") || "1");
  if (!Number.isSafeInteger(page) || page < 1 || page > 10000) return null;
  return { page, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE };
}

export async function GET(request) {
  await connection();
  try {
    const denied = await requireAdminApi();
    if (denied) return denied;
    await connectDB();

    const url = new URL(request.url);
    const pagination = getPagination(url);
    const status = url.searchParams.get("status") || "all";
    const search = (url.searchParams.get("search") || "").trim();

    if (!pagination) return fail("Invalid page number.", 400);
    if (status !== "all" && !STATUSES.has(status)) {
      return fail("Invalid inquiry status.", 400);
    }
    if (search.length > 100) return fail("Search must be 100 characters or fewer.", 400);

    const result = await getAdminInquiryPage({
      status,
      search,
      limit: pagination.limit,
      offset: pagination.offset,
    });
    return json({ ...result, page: pagination.page, pageSize: PAGE_SIZE });
  } catch (err) {
    return serverError(err, "admin inquiries");
  }
}

export async function PATCH(request) {
  try {
    const denied = await requireAdminApi();
    if (denied) return denied;
    await connectDB();

    const body = await readJson(request);
    if (!body) return fail("Invalid request.", 400);

    const id = Number(body.id);
    if (!Number.isSafeInteger(id) || id < 1 || id > 4294967295) {
      return fail("Invalid inquiry ID.", 422);
    }
    if (!STATUSES.has(body.status)) {
      return fail("Invalid inquiry status.", 422);
    }

    const inquiry = await updateInquiryStatus(id, body.status);
    if (!inquiry) return fail("Inquiry not found.", 404);
    return json({ inquiry });
  } catch (err) {
    return serverError(err, "admin inquiry status");
  }
}
