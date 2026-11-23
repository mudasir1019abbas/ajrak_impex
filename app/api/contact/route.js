import { connectDB } from "@/lib/db";
import { getSessionUserId } from "@/lib/session";
import { fail, json, readJson, serverError, tooMany } from "@/lib/http";
import { rateLimit } from "@/lib/rateLimit";
import { validateContact } from "@/lib/validators";
import { createInquiryMessage } from "@/models/InquiryMessage";
import { parseUserId } from "@/models/User";

export async function POST(request) {
  const limit = rateLimit(request, "contact", { limit: 5, windowMs: 60 * 60 * 1000 });
  if (!limit.ok) return tooMany(limit.retryAfter);

  const body = await readJson(request);
  if (!body) return fail("Invalid request.", 400);

  const errors = validateContact(body);
  if (Object.keys(errors).length) return fail(Object.values(errors)[0], 422, { errors });

  try {
    await connectDB();

    // Link the message to the account when the sender is logged in
    const userId = parseUserId(await getSessionUserId());

    await createInquiryMessage({
      name: body.name.trim(),
      email:
        typeof body.email === "string" && body.email.trim()
          ? body.email.trim().toLowerCase()
          : null,
      phone:
        typeof body.phone === "string" && body.phone.trim()
          ? body.phone.trim()
          : null,
      subject: body.subject,
      message: body.message.trim(),
      user: userId,
    });

    return json({ message: "Thank you! We'll reply within one business day." }, 201);
  } catch (err) {
    return serverError(err, "contact");
  }
}
