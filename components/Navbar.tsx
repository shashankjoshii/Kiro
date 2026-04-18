'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';

function KiroLogoSVG() {
  return (
    <svg viewBox="0 0 36 36" className="h-8 w-8" xmlns="http://www.w3.org/2000/svg">
      {/* Left ear */}
      <polygon points="6,14 10,2 15,14" fill="#e8863c" />
      <polygon points="8,13 10,5 13,13" fill="#fce8d5" />
      {/* Right ear */}
      <polygon points="21,14 26,2 30,14" fill="#e8863c" />
      <polygon points="23,13 26,5 28,13" fill="#fce8d5" />
      {/* Ear tips */}
      <polygon points="9,5 10,2 11,5" fill="#3d2b1f" />
      <polygon points="25,5 26,2 27,5" fill="#3d2b1f" />
      {/* Head */}
      <ellipse cx="18" cy="21" rx="13" ry="12" fill="#e8863c" />
      {/* Cheeks */}
      <ellipse cx="18" cy="24" rx="9" ry="8" fill="#fce8d5" />
      {/* Eyes */}
      <circle cx="13" cy="19" r="2.5" fill="#1a1714" />
      <circle cx="23" cy="19" r="2.5" fill="#1a1714" />
      <circle cx="14" cy="18" r="0.8" fill="#fff" />
      <circle cx="24" cy="18" r="0.8" fill="#fff" />
      {/* Nose */}
      <ellipse cx="18" cy="23" rx="2" ry="1.5" fill="#3d2b1f" />
      {/* Mouth */}
      <path d="M16,25 Q18,27 20,25" fill="none" stroke="#3d2b1f" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/category', label: 'Categories' },
  ];

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-lg"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <KiroLogoSVG />
            <span className="text-base font-semibold tracking-tight text-foreground">
              KIRO
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative rounded-md px-3.5 py-1.5 text-sm transition-colors ${isActive
                    ? 'font-medium text-foreground'
                    : 'text-muted hover:text-foreground'
                    }`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-x-1 -bottom-[13px] h-[2px] bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Search + mobile */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/#search"
              className="flex h-8 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted transition-all hover:border-accent/30 hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search tools...</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground md:hidden"
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
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="space-y-0.5 px-5 py-2">
              {links.map(({ href, label }) => {
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${isActive
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
    </motion.nav>
  );
}
