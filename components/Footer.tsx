'use client';

export default function Footer() {
  const publicLinks = [
    { href: '/submit', label: 'Submit a Case' },
    { href: '/status', label: 'Check Case Status' },
    { href: '/translate', label: 'Translation Tool' },
    { href: '/resources', label: 'Information & Help' },
  ];

  const staffLinks = [
    { href: '/agents', label: 'Agent Portal' },
    { href: '/agents/live-desk', label: 'Live Desk' },
    { href: '/agents/callbacks', label: 'Callbacks' },
    { href: 'https://migrantdesk.sharepoint.com/sites/AMAMigrant', label: 'Operations Centre ↗' },
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
            <div style={{ display: 'flex', gap: 16, marginTop: 24, alignItems: 'center' }}>
              <img src="/ama-logo.png" alt="AMA" style={{ height: 28, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
              <img src="/iom-logo.png" alt="IOM Ghana" style={{ height: 28, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
              <img src="/giz-logo.png" alt="GIZ" style={{ height: 28, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
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
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
            This initiative is implemented by IOM with funding from the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH.
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            Built by Asteri Technologies · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
