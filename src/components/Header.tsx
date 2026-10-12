import { useEffect, useState } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/config/nav";
import { candidate } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Only draw the header's bottom edge once content scrolls under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/90 backdrop-blur-md transition-shadow duration-200 ${
        scrolled || open ? "shadow-[0_1px_0_rgba(43,12,18,0.1)]" : ""
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link to="/" className="group flex items-center gap-2" aria-label={`${candidate.brandName} ${candidate.electionYear}, home`}>
          <img
            src="/logo-mark.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 transition-transform duration-300 group-hover:-rotate-6"
          />
          <span className="display text-[1.75rem] text-berry">
            {candidate.brandName}
          </span>
          <span className="mt-1 self-start text-xs font-semibold text-ink/60">
            {candidate.electionYear}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks
            .filter((link) => link.to !== "/")
            .map((link) => (
              <RouterNavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                    isActive
                      ? "bg-berry/[0.08] text-berry"
                      : "text-ink/75 hover:text-ink"
                  }`
                }
              >
                {link.label}
              </RouterNavLink>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/#join" className="btn-primary hidden min-h-[2.75rem] px-5 text-[0.9375rem] sm:inline-flex">
            Join the campaign
          </Link>
          <button
            type="button"
            className="-mr-2 rounded-full p-2.5 text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-ink/10 bg-paper lg:hidden" aria-label="Mobile">
          <ul className="shell flex flex-col py-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <RouterNavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `block py-3 font-serif text-2xl ${
                      isActive ? "text-berry" : "text-ink"
                    }`
                  }
                  style={{ fontVariationSettings: '"SOFT" 60' }}
                >
                  {link.label}
                </RouterNavLink>
              </li>
            ))}
            <li className="pb-3 pt-4">
              <Link to="/#join" className="btn-primary w-full">
                Join the campaign
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
