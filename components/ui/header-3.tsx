"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";

const navLinks = [
  { label: "Služby", href: "#sluzby" },
  { label: "Jak to funguje", href: "#jak-to-funguje" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change / resize
  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0F1E]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="ROVIMAX – zpět na začátek">
            <Image
              src="/logo.png"
              alt="ROVIMAX"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Hlavní navigace">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg transition-colors hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Button asChild className="hidden sm:inline-flex" size="default">
              <Link href="#kontakt">Konzultace zdarma</Link>
            </Button>

            <button
              onClick={() => setIsOpen((o) => !o)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white transition-colors hover:bg-white/5"
              aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={isOpen}
            >
              <MenuToggleIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="lg:hidden overflow-hidden border-t border-white/[0.06] bg-[#0A0F1E]/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-3 text-base font-medium text-slate-300 hover:text-white rounded-lg transition-colors hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-3 w-full" size="lg">
                <Link href="#kontakt" onClick={() => setIsOpen(false)}>
                  Konzultace zdarma
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
