'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';

function KiroLogoSVG() {
  return (
    <svg viewBox="0 0 36 36" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
      <polygon points="6,14 10,2 15,14" fill="var(--color-accent)" />
      <polygon points="8,13 10,5 13,13" fill="#fce8d5" />
      <polygon points="21,14 26,2 30,14" fill="var(--color-accent)" />
      <polygon points="23,13 26,5 28,13" fill="#fce8d5" />
      <polygon points="9,5 10,2 11,5" fill="#3d2b1f" />
      <polygon points="25,5 26,2 27,5" fill="#3d2b1f" />
      <ellipse cx="18" cy="21" rx="13" ry="12" fill="var(--color-accent)" />
      <ellipse cx="18" cy="24" rx="9" ry="8" fill="#fce8d5" />
      <circle cx="13" cy="19" r="2.5" fill="#1a1714" />
      <circle cx="23" cy="19" r="2.5" fill="#1a1714" />
      <circle cx="14" cy="18" r="0.8" fill="#fff" />
      <circle cx="24" cy="18" r="0.8" fill="#fff" />
      <ellipse cx="18" cy="23" rx="2" ry="1.5" fill="#3d2b1f" />
      <path d="M16,25 Q18,27 20,25" fill="none" stroke="#3d2b1f" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/category', label: 'Tools' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <KiroLogoSVG />
            <span
              className="text-[17px] font-semibold tracking-tight text-foreground transition-opacity group-hover:opacity-80"
              style={{ fontFamily: 'var(--font-source-serif), Georgia, serif' }}
            >
              KIRO
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {links.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-sm transition-colors rounded-md ${
                    isActive
                      ? 'text-foreground font-medium'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-x-2 -bottom-[17px] h-px bg-foreground"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              href="/#search"
              className="hidden sm:flex h-9 items-center gap-2 rounded-lg border border-border bg-sand px-3.5 text-sm text-muted transition-all hover:border-border-strong hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="text-sm">Search tools…</span>
            </Link>

            <Link
              href="/category"
              className="hidden md:inline-flex btn-primary text-[13px] py-2 px-4"
            >
              Browse all
            </Link>

            {/* Mobile search icon */}
            <Link href="/#search" className="sm:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground transition-colors">
              <Search className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-foreground md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="overflow-hidden border-t border-border md:hidden bg-background"
          >
            <div className="px-5 py-3 space-y-0.5">
              {links.map(({ href, label }) => {
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-sand font-medium text-foreground'
                        : 'text-muted hover:bg-sand hover:text-foreground'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
