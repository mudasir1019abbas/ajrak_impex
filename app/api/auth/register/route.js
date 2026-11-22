import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { createSession } from "@/lib/session";
import { fail, json, readJson, serverError, tooMany } from "@/lib/http";
import { rateLimit } from "@/lib/rateLimit";
import { validateRegister } from "@/lib/validators";
import { createUser, toPublicUser, userExistsByEmail } from "@/models/User";

export async function POST(request) {
  const limit = rateLimit(request, "register", { limit: 10, windowMs: 60 * 60 * 1000 });
  if (!limit.ok) return tooMany(limit.retryAfter);

  const body = await readJson(request);
  if (!body) return fail("Invalid request.", 400);

  const errors = validateRegister(body);
  if (Object.keys(errors).length) return fail(Object.values(errors)[0], 422, { errors });

  const name = body.name.trim();
  const email = body.email.trim().toLowerCase();
  try {
    await connectDB();

    if (await userExistsByEmail(email)) {
      return fail("An account with this email already exists.", 409);
    }

    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = await createUser({ name, email, passwordHash });

    await createSession(user.id);

    return json({ user: toPublicUser(user) }, 201);
  } catch (err) {
    // Two sign-ups racing on the same email hit the unique index
    if (err?.code === "ER_DUP_ENTRY") return fail("An account with this email already exists.", 409);
    return serverError(err, "register");
  }
}
