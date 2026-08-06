'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/translations';
import LanguageSwitcher from './LanguageSwitcher';

const AGENT_NAV = [
  { href: '/agents', label: 'Dashboard' },
  { href: '/agents/live-desk', label: 'Live Desk' },
  { href: '/agents/callbacks', label: 'Callbacks' },
  { href: '/agents/translate', label: 'Translate' },
];

export default function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const pathname = usePathname();
  const isAgentSection = pathname?.startsWith('/agents');
  const [menuOpen, setMenuOpen] = useState(false);

  const publicNav = [
    { href: '/', label: t.nav.home },
    { href: '/submit', label: t.nav.submit },
    { href: '/status', label: t.nav.status },
    { href: '/translate', label: t.nav.translate },
    { href: '/resources', label: t.nav.resources },
  ];

  const navItems = isAgentSection ? AGENT_NAV : publicNav;

  return (
    <header
      style={{
        background: '#1a6b3a',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <nav
        style={{
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Logo */}
        <Link href={isAgentSection ? '/agents' : '/'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>AMA Migrant Desk</div>
            {isAgentSection && <div style={{ color: '#a8d5b5', fontSize: 10 }}>Agent Portal</div>}
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 4 }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: pathname === item.href ? '#ffffff' : '#a8d5b5',
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: pathname === item.href ? 700 : 500,
                background: pathname === item.href ? 'rgba(255,255,255,0.15)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              {item.label}
            </Link>
          ))}

          {!isAgentSection && (
            <div style={{ marginLeft: 4 }}>
              <LanguageSwitcher language={language} setLanguage={setLanguage} variant="dark" />
            </div>
          )}

          {/* Switch between public and agent */}
          {isAgentSection ? (
            <Link
              href="/"
              style={{
                color: '#a8d5b5',
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 13,
                border: '1px solid rgba(255,255,255,0.2)',
                marginLeft: 8,
              }}
            >
              ← Public Site
            </Link>
          ) : (
            <Link
              href="/agents"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 13,
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                marginLeft: 8,
                fontWeight: 600,
              }}
            >
              Agent Login →
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff', padding: 8 }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="lg:hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.2)', background: '#145530', padding: '12px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: pathname === item.href ? '#ffffff' : '#a8d5b5',
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: pathname === item.href ? 700 : 500,
                  background: pathname === item.href ? 'rgba(255,255,255,0.15)' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            ))}

            {isAgentSection ? (
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: '#a8d5b5',
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  border: '1px solid rgba(255,255,255,0.2)',
                  marginTop: 4,
                }}
              >
                ← Public Site
              </Link>
            ) : (
              <Link
                href="/agents"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  marginTop: 4,
                  fontWeight: 600,
                }}
              >
                Agent Login →
              </Link>
            )}
          </div>

          {!isAgentSection && (
            <div style={{ marginTop: 12 }}>
              <LanguageSwitcher language={language} setLanguage={setLanguage} variant="dark" />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
