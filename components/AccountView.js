"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { accountService } from "@/lib/authService";
import { Button } from "@/components/UI";

function Icon({ name, className = "h-5 w-5" }) {
  const paths = {
    inquiries: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" /><path d="M8 12h8m-8 4h5" /></>,
    pending: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    replied: <><path d="M20 6 9 17l-5-5" /><path d="M21 12a9 9 0 1 1-5.3-8.2" /></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-13 5h18m-11 0v2h4v-2" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11" /><path d="m9 12 2 2 4-4" /></>,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[name]}
    </svg>
  );
}

function StatCard({ title, value, note, icon, tone }) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-navy-800">{value == null ? "—" : value.toLocaleString()}</p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
          <Icon name={icon} />
        </span>
      </div>
      <p className="mt-4 text-xs text-slate-500">{note}</p>
    </article>
  );
}

function InquiryStatus({ status }) {
  const styles = {
    new: "bg-amber-50 text-amber-800 ring-amber-600/15",
    read: "bg-blue-50 text-blue-800 ring-blue-600/15",
    replied: "bg-emerald-50 text-emerald-800 ring-emerald-600/15",
  };
  const labels = { new: "Received", read: "In review", replied: "Replied" };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status] || "bg-slate-100 text-slate-700 ring-slate-500/15"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[status] || "Received"}
    </span>
  );
}

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function formatDate(value, options) {
  return new Intl.DateTimeFormat("en", options).format(new Date(value));
}

export default function AccountView() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const retryDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setDashboard(await accountService.summary());
    } catch (err) {
      if (err.status === 401) {
        router.replace("/login?from=%2Faccount");
        return;
      }
      setError(err.message || "Unable to load your account right now.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    let active = true;
    accountService.summary()
      .then((data) => {
        if (active) setDashboard(data);
      })
      .catch((err) => {
        if (!active) return;
        if (err.status === 401) {
          router.replace("/login?from=%2Faccount");
          return;
        }
        setError(err.message || "Unable to load your account right now.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const profile = dashboard?.profile;
  const summary = dashboard?.summary;

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0 ajrak-pattern-dark opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-800/90 to-maroon-800/80" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl font-bold text-white shadow-lg">
                {initials(profile?.name || user?.name || "Customer")}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/65">Your Ajrak Impex account</p>
                <h1 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                  {profile?.name ? `Welcome, ${profile.name}` : "Welcome to your account"}
                </h1>
                <p className="mt-1 text-sm text-white/70">Your business conversations and account details, together.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" variant="light">Start a business inquiry</Button>
              <button onClick={handleLogout} className="rounded-md border border-white/35 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Log out
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            This is your private account. It shows inquiries linked to your account, plus older unassigned inquiries sent from your account email. Messages linked to another account are never shown here.
          </p>
        </div>

        {error && (
          <div role="alert" className="flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between">
            <p>{error}</p>
            <button type="button" onClick={retryDashboard} className="w-fit font-semibold underline underline-offset-2">Try again</button>
          </div>
        )}

        <section aria-label="Your business inquiry summary" className="grid gap-4 sm:grid-cols-3">
          <StatCard title="Business inquiries" value={summary?.total} note="Requests sent to our team" icon="inquiries" tone="bg-maroon-50 text-maroon-700" />
          <StatCard title="Awaiting a reply" value={summary?.awaitingReply} note="Received or currently in review" icon="pending" tone="bg-amber-50 text-amber-700" />
          <StatCard title="Replied" value={summary?.replied} note="Messages answered by our team" icon="replied" tone="bg-emerald-50 text-emerald-700" />
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.8fr)]">
          <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-navy-800">Your business inquiries</h2>
                <p className="mt-1 text-sm text-slate-500">A history of your conversations with our team.</p>
              </div>
              <Link href="/contact" className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-maroon-700 hover:text-maroon-800 sm:inline-flex">
                New inquiry <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>

            {loading ? (
              <div role="status" className="flex items-center justify-center gap-3 px-6 py-16 text-sm text-slate-500">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-maroon-100 border-t-maroon-700" />
                Loading your inquiries…
              </div>
            ) : dashboard?.inquiries?.length ? (
              <ul className="divide-y divide-slate-100">
                {dashboard.inquiries.map((inquiry) => (
                  <li key={inquiry.id} className="px-5 py-5 sm:px-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-navy-800">{inquiry.subject}</h3>
                          <InquiryStatus status={inquiry.status} />
                        </div>
                        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-600">{inquiry.message}</p>
                      </div>
                      <time className="shrink-0 text-xs text-slate-500">
                        {formatDate(inquiry.createdAt, { month: "short", day: "numeric", year: "numeric" })}
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
            ) : !error ? (
              <div className="px-6 py-12 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-maroon-50 text-maroon-700">
                  <Icon name="inquiries" className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-navy-800">Your business journey starts here</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                  Ask us about import and export, products, logistics, or partnerships. Requests submitted while signed in, or sent from your account email, appear here.
                </p>
                <Button href="/contact" className="mt-5">Talk to our team</Button>
              </div>
            ) : null}
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-800 text-white"><Icon name="briefcase" /></span>
                <div>
                  <h2 className="font-bold text-navy-800">Your account</h2>
                  <p className="text-xs text-slate-500">Personal profile details</p>
                </div>
              </div>
              {loading ? (
                <p className="mt-5 text-sm text-slate-500">Loading profile…</p>
              ) : profile ? (
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Name</dt>
                    <dd className="mt-1 break-words text-sm font-semibold text-navy-800">{profile.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Email</dt>
                    <dd className="mt-1 flex items-start gap-2 break-all text-sm font-semibold text-navy-800">
                      <Icon name="email" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      {profile.email}
                    </dd>
                  </div>
                  {profile.joinedAt && (
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Member since</dt>
                      <dd className="mt-1 text-sm font-semibold text-navy-800">
                        {formatDate(profile.joinedAt, { month: "long", year: "numeric" })}
                      </dd>
                    </div>
                  )}
                </dl>
              ) : null}
            </section>

            <section className="rounded-2xl bg-gradient-to-br from-maroon-800 to-navy-900 p-5 text-white shadow-sm sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">Trade, made clearer</p>
              <h2 className="mt-2 text-lg font-bold">Planning your next step?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Tell us what you are looking to source, ship, or build. Our team can help you discuss the right path for your business.
              </p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80">
                Contact our team <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </section>

            <p className="px-1 text-xs leading-relaxed text-slate-500">
              Orders and shipment tracking are not available in this account yet. For an update on an arrangement, contact our team and include the details in your inquiry.
            </p>
          </aside>
        </div>

        <div className="border-t border-slate-200 pt-5 text-xs text-slate-500">
          Up to 10 of your most recent inquiries are shown. New requests are linked to your account when you submit them while signed in.
        </div>
      </div>
    </main>
  );
}
