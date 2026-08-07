'use client';

import type { ReactNode } from 'react';

export default function Footer() {
  const publicLinks = [
    { href: '/submit', label: 'Submit a Case' },
    { href: '/status', label: 'Check Case Status' },
    { href: '/translate', label: 'Translation Tool' },
    { href: '/resources', label: 'Information & Help' },
  ];

  const staffLinks: { href: string; label: ReactNode }[] = [
    { href: '/agents', label: 'Agent Portal' },
    { href: '/agents/live-desk', label: 'Live Desk' },
    { href: '/agents/callbacks', label: 'Callbacks' },
    {
      href: 'https://migrantdesk.sharepoint.com/sites/AMAMigrant',
      label: (
        <>
          Operations Centre
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 4, display: 'inline', verticalAlign: 'middle' }}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </>
      ),
    },
  ];

  return (
    <footer
      style={{
        background: '#0d2818',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '48px 32px 32px',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="grid-cols-1 sm:grid-cols-3" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: '#ffffff', marginBottom: 12 }}>
              AMA Migrant Desk
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 280 }}>
              Free, confidential migrant assistance services in Accra, Ghana. Operated by AMA in partnership with IOM Ghana.
            </p>
            {/* Logos */}
            <div style={{ display: 'flex', marginTop: 24, alignItems: 'center' }}>
              <img src="/ama-logo.png" alt="AMA" style={{ height: 32, width: 'auto', marginRight: 12 }} />
              <img src="/iom-logo.png" alt="IOM Ghana" style={{ height: 32, width: 'auto', marginRight: 12 }} />
              <img src="/giz-logo.png" alt="GIZ" style={{ height: 32, width: 'auto' }} />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
              For Migrants
            </div>
            {publicLinks.map((link) => (
              <a key={link.href} href={link.href} style={{ display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13, marginBottom: 10, lineHeight: 1 }}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Agent links */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
              For Staff
            </div>
            {staffLinks.map((link) => (
              <a key={link.href} href={link.href} style={{ display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13, marginBottom: 10, lineHeight: 1 }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            Built by Asteri Technologies · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
