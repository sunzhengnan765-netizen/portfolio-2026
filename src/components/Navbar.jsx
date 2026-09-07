import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "2 internship experience", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
      {/* Logo */}
      <a
        href="#home"
        className="text-xl font-medium tracking-tight text-white"
        aria-label="Back to home"
      >
        2026
      </a>

      {/* Desktop nav — 右对齐两行：链接 + © 2026 */}
      <nav
        className="hidden flex-col items-end gap-1.5 md:flex"
        aria-label="Primary"
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-[15px] text-white/85 transition-colors duration-200 hover:text-white"
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Mobile menu trigger */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="ethan-mobile-menu"
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      {/* Mobile full-screen overlay */}
      {open && (
        <div
          id="ethan-mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-ink/95 backdrop-blur-md"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6"
          >
            <X className="h-7 w-7 text-white" />
          </button>
          <nav
            className="flex flex-col items-center gap-8"
            aria-label="Mobile"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-3xl font-semibold tracking-tight text-white transition-colors hover:text-white/70"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
