import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { Facebook, Instagram, Twitter, Linkedin } from "./Icons.jsx";

const social = [
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "X (Twitter)", icon: Twitter, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
];

const sitemap = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Global Trade", to: "/global-trade" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="ajrak-pattern-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Import, export and cultural textiles from Pakistan to the world. Global trade, rooted in tradition.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">Follow us</h3>
          <div className="mt-4 flex gap-3">
            {social.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-navy-800"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">Sitemap</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/75">
            {sitemap.map((s) => (
              <li key={s.label}>
                <Link to={s.to} className="transition-colors duration-200 hover:text-white hover:underline">
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" className="transition-colors hover:text-white hover:underline">Log in</Link>
            </li>
            <li>
              <Link to="/signup" className="transition-colors hover:text-white hover:underline">Sign up</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-maroon-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-4 py-3 text-xs text-white/85 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Ajrak Impex International. All rights reserved.</p>
          <p>Import &bull; Export &bull; Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
