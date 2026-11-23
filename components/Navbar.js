"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Menu, Close, ChevronDown, User } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";

// Same behaviour as react-router's <NavLink>: "/" only matches exactly,
// every other link is also active on its sub-pages.
const isActive = (pathname, to) => {
  return to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
};
const isGroupActive = (pathname, item) =>
  isActive(pathname, item.to) ||
  item.children.some((child) => isActive(pathname, child.to.split("#")[0]));

const linkClass = (isActive) =>
  `relative py-1 text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-maroon-700 after:transition-all after:duration-300 hover:text-maroon-700 ${isActive ? "text-maroon-700 after:w-full" : "text-slate-700 after:w-0 hover:after:w-full"
  }`;
const nav = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "Company Overview", to: "/about#company-overview" },
      { label: "Mission & Vision", to: "/about#mission-vision" },
      { label: "Partner Network", to: "/about#partner-network" },
      { label: "Legal Info", to: "/legal#company-information" },
      { label: "Legal FAQs", to: "/legal/faqs" },
      { label: "Our Team", to: "/team" },
    ],
  },
  {
    label: "Our Services",
    to: "/services",
    children: [
      { label: "Global Trade", to: "/global-trade" },
      { label: "Business Registration & Compliance", to: "/services/business-registration" },
      { label: "Business & Foreign Consultancy", to: "/services/business-foreign-consultancy" },
      { label: "Business Development & Innovation", to: "/services/business-development" },
    ],
  },
  {
    label: "Products",
    to: "/products",
    children: [
      { label: "Machinery", to: "/products/machinery" },
      { label: "Electronic Items", to: "/products/electronic-items" },
      { label: "Gaming Gadgets", to: "/products/gaming-gadgets" },
      { label: "Other Gadgets", to: "/products/other-gadgets" },
      { label: "Mobile Accessories", to: "/products/mobile-accessories" },
      { label: "Toys", to: "/products/toys" },
      { label: "Sleeping and Traveling Items", to: "/products/sleeping-and-traveling-items" },
      { label: "Shoes", to: "/products/shoes" },
      { label: "Home Décor", to: "/products/home-decor" },
      { label: "Kitchen Accessories", to: "/products/kitchen-accessories" },
      { label: "Jewelry", to: "/products/jewelry" },
      { label: "Industrial Chemicals", to: "/products/industrial-chemicals" },
    ],
  },
  { label: "How We Work", to: "/how-we-work" },
  {
    label: "Resources",
    to: "/news",
    children: [
      { label: "Business Guides", to: "/news#business-guides" },
      { label: "News & Updates", to: "/news" },
      { label: "Articles & Insights", to: "/news" },
    ],
  },
  { label: "Inquiry", to: "/inquiry" },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  // Menus remember the page they were opened on, so they close by themselves on navigation.
  const [openOn, setOpenOn] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, loading, user, logout } = useAuth();
  const router = useRouter();

  const open = openOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:h-20 lg:px-12">
        <Logo />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {nav.map((item) => {
            if (item.children) {
              const isDropdownOpen = openDropdown === item.label;
              const isDropdownActive = isGroupActive(pathname, item);
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.to === "/products" ? (
                    <div className="flex items-center gap-1">
                      <Link
                        href={item.to}
                        aria-current={isDropdownActive ? "page" : undefined}
                        className={linkClass(isDropdownActive)}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={`${isDropdownOpen ? "Hide" : "Show"} ${item.label} submenu`}
                        aria-expanded={isDropdownOpen}
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
                        className={`rounded-md p-1 transition-colors hover:bg-slate-100 ${
                          isDropdownActive ? "text-maroon-700" : "text-slate-700"
                        }`}
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={`relative flex items-center gap-1 py-1 text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-maroon-700 after:transition-all after:duration-300 hover:text-maroon-700 ${isDropdownActive
                          ? "text-maroon-700 after:w-full"
                          : "text-slate-700 after:w-0 hover:after:w-full"
                        }`}
                      aria-expanded={isDropdownOpen}
                      onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                  )}
                  <div
                    className={`absolute left-1/2 top-full w-max min-w-[14rem] -translate-x-1/2 pt-3 transition-all duration-300 ${isDropdownOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                      }`}
                  >
                    <ul className="overflow-hidden rounded-lg border border-slate-100 bg-white py-1.5 shadow-xl">
                      {item.children.map((c) => {
                        const isChildActive = isActive(pathname, c.to.split("#")[0]);
                        return (
                          <li key={c.label}>
                            <Link
                              href={c.to}
                              aria-current={isChildActive ? "page" : undefined}
                              className={`block whitespace-nowrap px-4 py-2 text-sm transition-colors ${isChildActive
                                  ? "bg-maroon-50 font-medium text-maroon-700"
                                  : "text-slate-700 hover:bg-maroon-50 hover:text-maroon-700"
                                }`}
                            >
                              {c.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.to}
                aria-current={isActive(pathname, item.to) ? "page" : undefined}
                className={linkClass(isActive(pathname, item.to))}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth actions (desktop) */}
        <div className={`hidden items-center gap-3 lg:flex ${loading ? "invisible" : ""}`}>
          {isAuthenticated ? (
            <>
              {user?.isAdmin && (
                <Link
                  href="/admin"
                  aria-current={isActive(pathname, "/admin") ? "page" : undefined}
                  className="text-sm font-semibold text-maroon-700 transition hover:text-maroon-800"
                >
                  Admin
                </Link>
              )}
              <Link href="/account" className="flex items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-maroon-700">
                <User className="h-5 w-5" /> {user?.name?.split(" ")[0] || "Account"}
              </Link>
              <button onClick={handleLogout} className="rounded-md border border-maroon-700 px-4 py-1.5 text-sm font-semibold text-maroon-700 transition hover:bg-maroon-700 hover:text-white">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-navy-800 transition hover:text-maroon-700">
                Log in
              </Link>
              <Link href="/signup" className="rounded-md bg-maroon-700 px-4 py-2 text-sm font-semibold text-white shadow transition duration-300 hover:-translate-y-0.5 hover:bg-maroon-800 hover:shadow-lg">
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
          onClick={() => {
            if (open) {
              setOpenOn(null);
              setOpenMobileDropdown(null);
            } else {
              setOpenOn(pathname);
              const activeParent = nav.find(
                (item) => item.children && isGroupActive(pathname, item)
              );
              setOpenMobileDropdown(activeParent ? activeParent.label : null);
            }
          }}
        >
          {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile / tablet panel */}
      <div
        className={`grid max-h-[calc(100dvh_-_4rem)] overflow-hidden border-t border-slate-100 bg-white transition-all duration-500 lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] border-transparent opacity-0"
          }`}
      >
        <div className="min-h-0 overflow-y-auto">
          <nav className="flex flex-col gap-1 px-6 py-4 sm:px-8" aria-label="Mobile">
            {nav.map((item, i) => {
              const active = item.children
                ? isGroupActive(pathname, item)
                : isActive(pathname, item.to);
              const current = isActive(pathname, item.to);
              const mobileLinkClass = `rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-300 ${open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                } ${active ? "bg-maroon-50 text-maroon-700" : "text-slate-700 hover:bg-slate-50"}`;

              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={item.to}
                    aria-current={current ? "page" : undefined}
                    style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                    onClick={() => setOpenOn(null)}
                    className={mobileLinkClass}
                  >
                    {item.label}
                  </Link>
                );
              }

              const submenuOpen = openMobileDropdown === item.label;
              const submenuId = `mobile-submenu-${i}`;

              return (
                <div key={item.label}>
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.to}
                      aria-current={current ? "page" : undefined}
                      style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                      onClick={() => setOpenOn(null)}
                      className={`${mobileLinkClass} min-w-0 flex-1`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`${submenuOpen ? "Hide" : "Show"} ${item.label} submenu`}
                      aria-expanded={submenuOpen}
                      aria-controls={submenuId}
                      onClick={() =>
                        setOpenMobileDropdown(submenuOpen ? null : item.label)
                      }
                      className={`rounded-md p-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 ${active
                          ? "text-maroon-700 hover:bg-maroon-100/50"
                          : "text-navy-800 hover:bg-slate-100"
                        }`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${submenuOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  </div>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${submenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                  >
                    <ul
                      id={submenuId}
                      aria-label={`${item.label} submenu`}
                      aria-hidden={!submenuOpen}
                      className="min-h-0 overflow-hidden ml-3.5 pl-3.5 border-l-2 border-slate-200 py-1 space-y-0.5"
                    >
                      {item.children.map((child) => {
                        const isChildActive = isActive(
                          pathname,
                          child.to.split("#")[0]
                        );
                        return (
                          <li key={child.label}>
                            <Link
                              href={child.to}
                              tabIndex={submenuOpen ? 0 : -1}
                              aria-current={isChildActive ? "page" : undefined}
                              onClick={() => setOpenOn(null)}
                              className={`block rounded-md px-3 py-2 text-sm transition ${isChildActive
                                  ? "bg-maroon-50 font-semibold text-maroon-700"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-maroon-700"
                                }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
            {isAuthenticated && user?.isAdmin && (
              <Link
                href="/admin"
                aria-current={isActive(pathname, "/admin") ? "page" : undefined}
                style={{ transitionDelay: open ? `${nav.length * 40}ms` : "0ms" }}
                onClick={() => setOpenOn(null)}
                className={`rounded-md px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  } ${isActive(pathname, "/admin")
                    ? "bg-maroon-50 text-maroon-700"
                    : "text-maroon-700 hover:bg-maroon-50"
                  }`}
              >
                Admin dashboard
              </Link>
            )}
            <div className={`mt-3 flex gap-3 border-t border-slate-100 pt-4 ${loading ? "invisible" : ""}`}>
              {isAuthenticated ? (
                <>
                  <Link href="/account" className="flex-1 rounded-md border border-navy-800 py-2 text-center text-sm font-semibold text-navy-800">
                    My account
                  </Link>
                  <button onClick={handleLogout} className="flex-1 rounded-md bg-maroon-700 py-2 text-sm font-semibold text-white">
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex-1 rounded-md border border-navy-800 py-2 text-center text-sm font-semibold text-navy-800">
                    Log in
                  </Link>
                  <Link href="/signup" className="flex-1 rounded-md bg-maroon-700 py-2 text-center text-sm font-semibold text-white">
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
