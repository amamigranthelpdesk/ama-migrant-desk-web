'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/translations';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/submit', label: t.nav.submit },
    { href: '/status', label: t.nav.status },
    { href: '/translate', label: t.nav.translate },
    { href: '/resources', label: t.nav.resources },
    { href: '/portal', label: t.nav.portal },
  ];

  const staffLink = { href: '/live-desk', label: 'Live Desk' };

  return (
    <header className="sticky top-0 z-40 bg-ama-green shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-white sm:text-xl">
          AMA Migrant Desk
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold text-white transition-opacity hover:opacity-80 ${
                pathname === link.href ? 'underline underline-offset-4' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={staffLink.href}
            title="For AMA Migrant Desk staff only"
            className={`flex items-center gap-1 rounded-md border border-dashed border-white/40 px-2 py-0.5 text-xs font-semibold text-white/70 transition-opacity hover:opacity-100 ${
              pathname === staffLink.href ? 'underline underline-offset-4' : ''
            }`}
          >
            {staffLink.label}
            <span className="rounded-sm bg-white/20 px-1 text-[10px] uppercase tracking-wide">Staff</span>
          </Link>
        </nav>

        <div className="hidden lg:block">
          <LanguageSwitcher language={language} setLanguage={setLanguage} variant="dark" />
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-white lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/20 bg-ama-green-dark px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-semibold text-white ${
                  pathname === link.href ? 'underline underline-offset-4' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={staffLink.href}
              onClick={() => setMenuOpen(false)}
              title="For AMA Migrant Desk staff only"
              className="flex w-fit items-center gap-1 rounded-md border border-dashed border-white/40 px-2 py-0.5 text-xs font-semibold text-white/70"
            >
              {staffLink.label}
              <span className="rounded-sm bg-white/20 px-1 text-[10px] uppercase tracking-wide">Staff</span>
            </Link>
          </nav>
          <div className="mt-4">
            <LanguageSwitcher language={language} setLanguage={setLanguage} variant="dark" />
          </div>
        </div>
      )}
    </header>
  );
}
