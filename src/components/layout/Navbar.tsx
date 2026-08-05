// src/components/layout/Navbar.tsx
// Floating pill-style navbar, inset from the viewport edges.
// Always shows its own background — no more scroll-triggered
// transparent/opaque toggle, which is what made nav text hard to
// read over the cream Hero before.

"use client";

import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 inset-x-4 md:top-6 md:inset-x-6 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-5 md:px-8 py-3 rounded-full border border-[var(--cream-deep)] bg-[var(--cream)]/90 backdrop-blur-md shadow-sm">

        {/* Logo */}
        <a href="#home" className="flex items-center shrink-0 transition-opacity hover:opacity-80">
          <img src="/images/logo.png" alt="AJM logo" className="h-8 md:h-9 w-auto" />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[var(--navy-muted)] hover:text-[var(--navy)] hover:bg-[var(--navy)]/5 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA button — desktop */}
        <a
          href="mailto:madialesalced@gmail.com"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--navy)] hover:bg-[var(--navy-soft)] text-[var(--cream)] text-sm font-medium transition-all duration-200 shrink-0"
        >
          Contact Me
          <ArrowRight size={15} />
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[var(--navy)] hover:opacity-70 transition-opacity"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 rounded-2xl border border-[var(--cream-deep)] bg-[var(--cream)]/95 backdrop-blur-md shadow-lg overflow-hidden">
          <ul className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-[var(--navy)] hover:bg-[var(--navy)]/5 rounded-xl transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="mailto:madialesalced@gmail.com"
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-3",
                  "bg-[var(--navy)] text-[var(--cream)] rounded-xl font-medium"
                )}
              >
                Contact Me
                <ArrowRight size={15} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}