"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "inquiries", label: "Inquiries" },
  { id: "users", label: "Accounts" },
];

const inquiryStatuses = [
  { value: "new", label: "Received" },
  { value: "read", label: "In review" },
  { value: "replied", label: "Replied" },
];

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function StatCard({ label, value, note }) {
  return (
    <article className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold tracking-tight text-navy-800">
        {value ?? "—"}
      </p>
      <p className="mt-2 text-xs text-slate-500">{note}</p>
    </article>
  );
}

function Pagination({ page, pageSize, total, onChange }) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 text-sm">
      <p className="text-slate-500">
        {total === 0
          ? "No records"
          : `Showing ${(page - 1) * pageSize + 1}–${Math.min(
              page * pageSize,
              total
            )} of ${total}`}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className="rounded-md border border-slate-200 px-3 py-1.5 font-semibold text-navy-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onChange(page + 1)}
          className="rounded-md border border-slate-200 px-3 py-1.5 font-semibold text-navy-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard({ admin }) {
  const { logout } = useAuth();
  const router = useRouter();
  const [section, setSection] = useState("overview");
  const [overview, setOverview] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [inquiryStatus, setInquiryStatus] = useState("all");
  const [inquirySearchInput, setInquirySearchInput] = useState("");
  const [inquirySearch, setInquirySearch] = useState("");
  const [accountSearchInput, setAccountSearchInput] = useState("");
  const [accountSearch, setAccountSearch] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [loadedRequestKey, setLoadedRequestKey] = useState(null);
  const requestKey = JSON.stringify([
    section,
    page,
    inquiryStatus,
    inquirySearch,
    accountSearch,
    reloadKey,
  ]);
  const loading = loadedRequestKey !== requestKey;

  useEffect(() => {
    let active = true;

    async function loadSection() {
      if (section === "overview") {
        const result = await api("/admin/overview");
        if (active) setOverview(result.overview);
        return;
      }

      const params = new URLSearchParams({ page: String(page) });
      if (section === "inquiries") {
        params.set("search", inquirySearch);
        params.set("status", inquiryStatus);
        const result = await api(`/admin/inquiries?${params.toString()}`);
        if (active) {
          setInquiries(result.inquiries);
          setTotal(result.total);
          setPageSize(result.pageSize);
        }
        return;
      }

      params.set("search", accountSearch);
      const result = await api(`/admin/users?${params.toString()}`);
      if (active) {
        setAccounts(result.users);
        setTotal(result.total);
        setPageSize(result.pageSize);
      }
    }

    loadSection()
      .catch((err) => {
        if (active) setError(err.message || "Unable to load admin data.");
      })
      .finally(() => {
        if (active) setLoadedRequestKey(requestKey);
      });

    return () => {
      active = false;
    };
  }, [
    section,
    page,
    inquiryStatus,
    inquirySearch,
    accountSearch,
    reloadKey,
    requestKey,
  ]);

  const changeSection = (nextSection) => {
    setError("");
    setNotice("");
    setPage(1);
    setSection(nextSection);
  };

  const changePage = (nextPage) => {
    setError("");
    setPage(nextPage);
  };

  const updateInquiryStatus = async (id, status) => {
    setSavingId(id);
    setError("");
    setNotice("");
    try {
      const result = await api("/admin/inquiries", {
        method: "PATCH",
        body: { id, status },
      });
      const noLongerMatchesFilter =
        inquiryStatus !== "all" && status !== inquiryStatus;
      setInquiries((current) =>
        current.flatMap((inquiry) => {
          if (inquiry.id !== result.inquiry.id) return [inquiry];
          return noLongerMatchesFilter ? [] : [result.inquiry];
        })
      );
      if (noLongerMatchesFilter) {
        setTotal((current) => Math.max(0, current - 1));
        if (inquiries.length === 1 && page > 1) changePage(page - 1);
      }
      setNotice(`Inquiry #${id} status updated.`);
      try {
        const summary = await api("/admin/overview");
        setOverview(summary.overview);
      } catch (refreshError) {
        setError(
          `The status was saved, but dashboard metrics could not refresh: ${refreshError.message}`
        );
      }
    } catch (err) {
      setError(err.message || "Unable to update inquiry status.");
    } finally {
      setSavingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      setError(err.message || "Unable to log out. Please try again.");
    }
  };

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <header className="bg-navy-900 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/65">
              Ajrak Impex
            </p>
            <h1 className="mt-1 text-3xl font-extrabold">Admin dashboard</h1>
            <p className="mt-2 text-sm text-white/75">
              Signed in as {admin.name} · User ID {admin.id}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-md border border-white/35 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View website
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-navy-800 transition hover:bg-slate-100"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Admin sections"
          className="flex flex-wrap gap-2 border-b border-slate-200"
        >
          {sections.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={section === item.id}
              onClick={() => changeSection(item.id)}
              className={`border-b-2 px-4 py-3 text-sm font-semibold transition ${
                section === item.id
                  ? "border-maroon-700 text-maroon-700"
                  : "border-transparent text-slate-600 hover:text-navy-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {error && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => {
                setError("");
                setReloadKey((current) => current + 1);
              }}
              className="font-semibold underline underline-offset-2"
            >
              Retry
            </button>
          </div>
        )}
        {notice && (
          <p
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            {notice}
          </p>
        )}

        {section === "overview" && (
          <section aria-label="Dashboard overview">
            <h2 className="sr-only">Overview</h2>
            {loading ? (
              <p role="status" className="py-8 text-sm text-slate-500">
                Loading dashboard metrics…
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <StatCard
                  label="Customer accounts"
                  value={overview?.users}
                  note="Registered accounts"
                />
                <StatCard
                  label="All inquiries"
                  value={overview?.inquiries}
                  note="Contact requests received"
                />
                <StatCard
                  label="Received"
                  value={overview?.newInquiries}
                  note="Waiting for review"
                />
                <StatCard
                  label="In review"
                  value={overview?.inReviewInquiries}
                  note="Being handled"
                />
                <StatCard
                  label="Replied"
                  value={overview?.repliedInquiries}
                  note="Marked as replied"
                />
              </div>
            )}
            <p className="mt-5 text-sm text-slate-500">
              Use Inquiries to search requests and update their status, or
              Accounts to review registered customers.
            </p>
          </section>
        )}

        {section === "inquiries" && (
          <section className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-navy-800">
                  Inquiries
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Search messages, update status, or refresh for new submissions.
                </p>
              </div>
              <form
                className="flex flex-col gap-2 sm:flex-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  setError("");
                  setPage(1);
                  setInquirySearch(inquirySearchInput.trim());
                }}
              >
                <label className="sr-only" htmlFor="inquiry-search">
                  Search inquiries
                </label>
                <input
                  id="inquiry-search"
                  value={inquirySearchInput}
                  maxLength={100}
                  onChange={(event) => setInquirySearchInput(event.target.value)}
                  placeholder="Name, email, phone, subject or message"
                  className="min-w-0 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-maroon-700 focus:ring-2 focus:ring-maroon-700/20 sm:w-64"
                />
                <label className="sr-only" htmlFor="inquiry-status-filter">
                  Filter inquiries by status
                </label>
                <select
                  id="inquiry-status-filter"
                  value={inquiryStatus}
                  onChange={(event) => {
                    setError("");
                    setPage(1);
                    setInquiryStatus(event.target.value);
                  }}
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-maroon-700 focus:ring-2 focus:ring-maroon-700/20"
                >
                  <option value="all">All statuses</option>
                  {inquiryStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-md bg-maroon-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-maroon-800"
                >
                  Search
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setError("");
                    setNotice("");
                    setReloadKey((current) => current + 1);
                  }}
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-navy-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Refresh
                </button>
              </form>
            </div>

            {loading ? (
              <p role="status" className="p-6 text-sm text-slate-500">
                Loading inquiries…
              </p>
            ) : inquiries.length ? (
              <div className="divide-y divide-slate-100">
                {inquiries.map((inquiry) => (
                  <article key={inquiry.id} className="space-y-3 p-5">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div className="min-w-0">
                        <h3 className="break-words font-bold text-navy-800">
                          {inquiry.subject}
                        </h3>
                        <p className="mt-1 flex flex-wrap gap-x-2 text-sm text-slate-600">
                          <span>{inquiry.name}</span>
                          {inquiry.email && (
                            <a
                              href={`mailto:${inquiry.email}`}
                              className="text-maroon-700 underline"
                            >
                              {inquiry.email}
                            </a>
                          )}
                          {inquiry.phone && (
                            <a
                              href={`tel:${inquiry.phone.replace(/[^+\d]/g, "")}`}
                              className="text-maroon-700 underline"
                            >
                              {inquiry.phone}
                            </a>
                          )}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-wrap items-center gap-3">
                        <time className="text-xs text-slate-500">
                          {formatDate(inquiry.createdAt)}
                        </time>
                        <label className="sr-only" htmlFor={`status-${inquiry.id}`}>
                          Inquiry status
                        </label>
                        <select
                          id={`status-${inquiry.id}`}
                          value={inquiry.status}
                          disabled={savingId === inquiry.id}
                          onChange={(event) =>
                            updateInquiryStatus(inquiry.id, event.target.value)
                          }
                          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-navy-800 outline-none focus:border-maroon-700 focus:ring-2 focus:ring-maroon-700/20 disabled:opacity-50"
                        >
                          {inquiryStatuses.map((status) => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                      {inquiry.message}
                    </p>
                    <p className="text-xs text-slate-500">
                      {inquiry.userId
                        ? `Linked to account #${inquiry.userId}`
                        : "Guest inquiry"}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="p-8 text-center text-sm text-slate-500">
                No inquiries match these filters.
              </p>
            )}
            {!loading && (
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onChange={changePage}
              />
            )}
          </section>
        )}

        {section === "users" && (
          <section className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-navy-800">
                  Customer accounts
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review registered customers and their linked inquiry totals.
                </p>
              </div>
              <form
                className="flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  setError("");
                  setPage(1);
                  setAccountSearch(accountSearchInput.trim());
                }}
              >
                <label className="sr-only" htmlFor="account-search">
                  Search customer accounts
                </label>
                <input
                  id="account-search"
                  value={accountSearchInput}
                  maxLength={100}
                  onChange={(event) => setAccountSearchInput(event.target.value)}
                  placeholder="Search name or email"
                  className="min-w-0 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-maroon-700 focus:ring-2 focus:ring-maroon-700/20 sm:w-64"
                />
                <button
                  type="submit"
                  className="rounded-md bg-maroon-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-maroon-800"
                >
                  Search
                </button>
              </form>
            </div>

            {loading ? (
              <p role="status" className="p-6 text-sm text-slate-500">
                Loading accounts…
              </p>
            ) : accounts.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Customer
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Joined
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Linked inquiries
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Account ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {accounts.map((account) => (
                      <tr key={account.id} className="text-slate-700">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-navy-800">
                            {account.name}
                          </p>
                          <a
                            href={`mailto:${account.email}`}
                            className="mt-1 inline-block text-xs text-maroon-700 underline"
                          >
                            {account.email}
                          </a>
                        </td>
                        <td className="px-5 py-4">
                          {formatDate(account.createdAt)}
                        </td>
                        <td className="px-5 py-4">{account.inquiryCount}</td>
                        <td className="px-5 py-4 font-mono text-xs">
                          {account.id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="p-8 text-center text-sm text-slate-500">
                No accounts match this search.
              </p>
            )}
            {!loading && (
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onChange={setPage}
              />
            )}
          </section>
        )}
      </div>
    </main>
  );
}
