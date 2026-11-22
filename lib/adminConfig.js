import "server-only";

export function getAdminUserIds() {
  return new Set(
    (process.env.ADMIN_USER_IDS || "")
      .split(",")
      .map((value) => value.trim())
      .filter((value) => /^\d+$/.test(value))
      .map(Number)
      .filter((id) => Number.isSafeInteger(id) && id > 0 && id <= 4294967295)
  );
}

export function hasConfiguredAdminUsers() {
  return getAdminUserIds().size > 0;
}

export function isAdminUserId(id) {
  const numericId = Number(id);
  return Number.isSafeInteger(numericId) && getAdminUserIds().has(numericId);
}
