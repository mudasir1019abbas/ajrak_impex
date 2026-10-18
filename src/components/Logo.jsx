import { Link } from "react-router-dom";

// Round emblem + wordmark. Swap the emblem for your real logo file if you have one.
export function Emblem({ className = "h-11 w-11" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#fff" stroke="#14294f" strokeWidth="2" />
      <circle cx="24" cy="24" r="17" fill="none" stroke="#7a1c2a" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M15 28c0-6 3-10 9-10s9 4 9 10l-3 4H18z" fill="#14294f" />
      <path d="M17 18l-2-5 5 3M31 18l2-5-5 3" fill="none" stroke="#14294f" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M21 26h6M24 23v6" stroke="#fff" strokeWidth="1.4" />
    </svg>
  );
}

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Ajrak Impex International - Home">
      <Emblem className="h-11 w-11 transition-transform duration-500 group-hover:rotate-[360deg]" />
      <span className="leading-tight">
        <span className={`block text-lg font-extrabold tracking-wide ${light ? "text-white" : "text-navy-800"}`}>
          AJRAK IMPEX
        </span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.25em] ${light ? "text-white/70" : "text-maroon-700"}`}>
          International
        </span>
      </span>
    </Link>
  );
}
