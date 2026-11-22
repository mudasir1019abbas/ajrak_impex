import { Suspense } from "react";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import { getAdminUser } from "@/lib/admin";
import { hasConfiguredAdminUsers } from "@/lib/adminConfig";
import { toPublicUser } from "@/models/User";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

function AdminLoading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
      <p role="status" className="text-sm font-medium text-slate-600">
        Loading admin dashboard…
      </p>
    </main>
  );
}

function AdminSetupNotice() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <h1 className="text-2xl font-extrabold text-navy-800">
          Admin access is not configured
        </h1>
        <p className="mt-3 leading-7 text-slate-700">
          Set the numeric user ID of an existing administrator account in the
          server-side <code className="font-semibold">ADMIN_USER_IDS</code>{" "}
          environment variable, then restart the app.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          The ID is available in the MySQL <code>users</code> table. Separate
          multiple administrator IDs with commas.
        </p>
      </section>
    </main>
  );
}

async function AdminContent() {
  if (!hasConfiguredAdminUsers()) return <AdminSetupNotice />;

  const admin = await getAdminUser();
  if (!admin) redirect("/");
  return <AdminDashboard admin={toPublicUser(admin)} />;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminContent />
    </Suspense>
  );
}
