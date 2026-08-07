'use client';
import React from 'react';

interface AgentCard {
  href: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: React.ReactNode;
  accent: string;
  accentLight: string;
  external?: boolean;
}

export default function AgentDashboard() {
  const cards: AgentCard[] = [
    {
      href: '/agents/live-desk',
      title: 'Live Desk',
      description: 'View and respond to client chatbot conversations in real time',
      stat: 'Real-time',
      statLabel: 'Updates',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="12" cy="10" r="1" fill="currentColor" />
          <circle cx="15" cy="10" r="1" fill="currentColor" />
        </svg>
      ),
      accent: '#1a6b3a',
      accentLight: '#e8f5ee',
    },
    {
      href: '/agents/callbacks',
      title: 'Callback Requests',
      description: 'View and manage clients who have requested a call back from an agent',
      stat: 'Pending',
      statLabel: 'Requests',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
        </svg>
      ),
      accent: '#c8880a',
      accentLight: '#fff8ee',
    },
    {
      href: '/agents/translate',
      title: 'Translation Tool',
      description: 'Real-time text and voice translation in 12 languages for client interactions',
      stat: '12',
      statLabel: 'Languages',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8l6 6" />
          <path d="M4 14l6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="M22 22l-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
      ),
      accent: '#1565c0',
      accentLight: '#f0f7ff',
    },
    {
      href: 'https://migrantdesk.sharepoint.com/sites/AMAMigrant',
      title: 'Operations Centre',
      description: 'Open the full SharePoint case management dashboard to manage cases',
      stat: 'Full',
      statLabel: 'Dashboard',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      accent: '#5e35b1',
      accentLight: '#f3f0ff',
      external: true,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-body)' }}>

      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0d2818 0%, #1a6b3a 100%)',
        padding: '48px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative */}
        <div style={{
          position: 'absolute',
          right: -60,
          top: -60,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          right: 60,
          bottom: -80,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 22, fontFamily: 'var(--font-display)' }}>Agent Portal</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 2 }}>AMA Migrant Desk Operations</div>
            </div>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, maxWidth: 480, lineHeight: 1.7 }}>
            Welcome. Use the tools below to manage client conversations, handle callback requests, translate in real time, and access the full case management system.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 40 }}>
          {cards.map((card, i) => (
            <a
              key={i}
              href={card.href}
              target={card.external ? '_blank' : undefined}
              rel={card.external ? 'noopener noreferrer' : undefined}
              className="card-hover"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '28px 24px',
                display: 'block',
                boxShadow: 'var(--shadow-sm)',
                borderTop: `3px solid ${card.accent}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: card.accentLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.accent,
                }}>
                  {card.icon}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: card.accent, fontFamily: 'var(--font-display)' }}>{card.stat}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{card.statLabel}</div>
                </div>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)', marginBottom: 10, fontWeight: 400 }}>
                {card.title}
                {card.external && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 6, verticalAlign: 'middle' }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                )}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 20 }}>
                {card.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: card.accent, fontSize: 13, fontWeight: 600 }}>
                Open
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Quick info */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            This portal is for authorised AMA Migrant Desk staff only.
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Technical support: <span style={{ color: 'var(--green)', fontWeight: 600 }}>ama@migrantdesk.onmicrosoft.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
