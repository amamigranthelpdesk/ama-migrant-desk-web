'use client';
import React, { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  const publicNav = [
    { href: '/', label: t.nav.home },
    { href: '/submit', label: t.nav.submit },
    { href: '/status', label: t.nav.status },
    { href: '/translate', label: t.nav.translate },
    { href: '/resources', label: t.nav.resources },
  ];

  const navItems = isAgentSection ? AGENT_NAV : publicNav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        background: '#1a6b3a',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: scrolled ? '0 4px 20px rgba(13,40,24,0.2)' : '0 1px 0 rgba(255,255,255,0.1)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <nav
        style={{
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
        }}
      >
        {/* Logo */}
        <Link href={isAgentSection ? '/agents' : '/'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36,
            height: 36,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px', fontFamily: 'var(--font-body)' }}>
              AMA Migrant Desk
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {isAgentSection ? 'Agent Portal' : 'Accra Metropolitan Assembly'}
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 2 }}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: active ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                  letterSpacing: '-0.1px',
                }}
              >
                {item.label}
              </Link>
            );
          })}

          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)', margin: '0 8px' }} />

          {!isAgentSection && <LanguageSwitcher language={language} setLanguage={setLanguage} variant="dark" />}

          {isAgentSection ? (
            <Link
              href="/"
              style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginLeft: 8,
              }}
            >
              ← Public Site
            </Link>
          ) : (
            <Link
              href="/agents"
              style={{
                color: '#0d2818',
                textDecoration: 'none',
                padding: '8px 18px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                background: '#ffffff',
                letterSpacing: '-0.1px',
                marginLeft: 8,
              }}
            >
              Staff Login
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
        <div className="lg:hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.15)', background: '#0d2818', padding: '12px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: active ? '#ffffff' : 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    padding: '10px 14px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            {isAgentSection ? (
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'rgba(255,255,255,0.7)',
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
                  color: '#0d2818',
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  background: '#ffffff',
                  marginTop: 4,
                  fontWeight: 600,
                }}
              >
                Staff Login
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
