import { Link } from "react-router-dom";
import bullEmblem from "../assests/images/logo/ajrak-bull-emblem.svg";

export function Emblem({ className = "h-11 w-11" }) {
  return <img src={bullEmblem} className={className} alt="ajrak-logo" />;
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
