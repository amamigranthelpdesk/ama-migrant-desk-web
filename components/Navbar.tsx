'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/theme';
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  const themeToggleButton = (
    <button
      onClick={toggleTheme}
      style={{
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 8,
        width: 36,
        height: 36,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        transition: 'all 0.2s',
      }}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );

  return (
    <header
      style={{
        background: '#1a6b3a',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.2)' : 'none',
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
          <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img
              src="/ama-logo.png"
              alt="AMA"
              style={{ width: 36, height: 36, objectFit: 'contain' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px' }}>
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
                  color: active ? '#ffffff' : 'rgba(255,255,255,0.75)',
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {item.label}
              </Link>
            );
          })}

          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)', margin: '0 8px' }} />

          {!isAgentSection && <LanguageSwitcher language={language} setLanguage={setLanguage} variant="dark" />}

          <div style={{ marginLeft: 8, marginRight: 8 }}>{themeToggleButton}</div>

          {isAgentSection ? (
            <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', padding: '8px 14px', borderRadius: 8, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Public Site
            </Link>
          ) : (
            <Link
              href="/agents"
              style={{
                color: '#0d2818',
                padding: '8px 18px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                background: '#ffffff',
                transition: 'all 0.2s',
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Public Site
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

          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            {!isAgentSection && <LanguageSwitcher language={language} setLanguage={setLanguage} variant="dark" />}
            {themeToggleButton}
          </div>
        </div>
      )}
    </header>
  );
}
