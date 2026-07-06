import { useState } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/config/nav";
import { candidate } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5"
        >
          <img
            src="/logo-mark.png"
            alt=""
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span className="font-serif text-2xl font-semibold tracking-tight text-ink">
            {candidate.brandName}
            <span className="text-berry">&middot;</span>2027
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <RouterNavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-wide transition hover:text-berry ${
                  isActive ? "text-berry" : "text-ink/70"
                }`
              }
            >
              {link.label}
            </RouterNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/#join" className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex">
            Join the campaign
          </Link>
          <button
            type="button"
            className="p-2 text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className="ledger-rule text-ink/15" aria-hidden="true" />

      {open && (
        <nav
          className="bg-paper px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <RouterNavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-2 py-3 text-base font-medium ${
                      isActive ? "text-berry" : "text-ink"
                    }`
                  }
                >
                  {link.label}
                </RouterNavLink>
              </li>
            ))}
            <li>
              <Link
                to="/#join"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 w-full"
              >
                Join the campaign
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
