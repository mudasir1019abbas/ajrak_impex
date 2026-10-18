import { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import { Menu, Close, ChevronDown, User } from "./Icons.jsx";
import { nav } from "../data/content.js";
import { useAuth } from "../context/AuthContext.jsx";

const linkClass = ({ isActive }) =>
  `relative py-1 text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-maroon-700 after:transition-all after:duration-300 hover:text-maroon-700 ${
    isActive ? "text-maroon-700 after:w-full" : "text-slate-700 after:w-0 hover:after:w-full"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
    setResOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setResOpen(true)}
                onMouseLeave={() => setResOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-maroon-700"
                  aria-expanded={resOpen}
                  onClick={() => setResOpen((v) => !v)}
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${resOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`absolute left-1/2 top-full w-48 -translate-x-1/2 pt-3 transition-all duration-300 ${
                    resOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  <ul className="overflow-hidden rounded-lg border border-slate-100 bg-white py-1 shadow-xl">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <Link to={c.to} className="block px-4 py-2 text-sm hover:bg-maroon-50 hover:text-maroon-700">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <NavLink key={item.label} to={item.to} end={item.to === "/"} className={linkClass}>
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Auth actions (desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <Link to="/account" className="flex items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-maroon-700">
                <User className="h-5 w-5" /> {user?.name?.split(" ")[0] || "Account"}
              </Link>
              <button onClick={handleLogout} className="rounded-md border border-maroon-700 px-4 py-1.5 text-sm font-semibold text-maroon-700 transition hover:bg-maroon-700 hover:text-white">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-navy-800 transition hover:text-maroon-700">
                Log in
              </Link>
              <Link to="/signup" className="rounded-md bg-maroon-700 px-4 py-2 text-sm font-semibold text-white shadow transition duration-300 hover:-translate-y-0.5 hover:bg-maroon-800 hover:shadow-lg">
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-md p-2 text-navy-800 transition hover:bg-slate-100 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile / tablet panel */}
      <div
        className={`grid overflow-hidden border-t border-slate-100 bg-white transition-all duration-500 lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] border-transparent opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile">
            {nav.flatMap((item) => (item.children ? item.children : [item])).map((item, i) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                    open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  } ${isActive ? "bg-maroon-50 text-maroon-700" : "text-slate-700 hover:bg-slate-50"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 flex gap-3 border-t border-slate-100 pt-4">
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="flex-1 rounded-md border border-navy-800 py-2 text-center text-sm font-semibold text-navy-800">
                    My account
                  </Link>
                  <button onClick={handleLogout} className="flex-1 rounded-md bg-maroon-700 py-2 text-sm font-semibold text-white">
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex-1 rounded-md border border-navy-800 py-2 text-center text-sm font-semibold text-navy-800">
                    Log in
                  </Link>
                  <Link to="/signup" className="flex-1 rounded-md bg-maroon-700 py-2 text-center text-sm font-semibold text-white">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
