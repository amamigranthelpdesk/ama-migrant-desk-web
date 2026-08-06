'use client';
import React from 'react';

interface AgentCard {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  external?: boolean;
}

export default function AgentDashboard() {
  const cards: AgentCard[] = [
    {
      href: '/agents/live-desk',
      title: 'Live Desk',
      description: 'View and respond to client chatbot conversations in real time',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      color: '#1a6b3a',
      bg: '#e8f5ee',
    },
    {
      href: '/agents/callbacks',
      title: 'Callback Requests',
      description: 'View clients who have requested a callback from an agent',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
        </svg>
      ),
      color: '#c8880a',
      bg: '#fff8ee',
    },
    {
      href: '/agents/translate',
      title: 'Translation Tool',
      description: 'Translate text and voice in real time during client interactions',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 8l6 6" />
          <path d="M4 14l6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="M22 22l-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
      ),
      color: '#1565c0',
      bg: '#f0f7ff',
    },
    {
      href: 'https://migrantdesk.sharepoint.com/sites/AMAMigrant',
      title: 'Operations Centre',
      description: 'Open the SharePoint case management dashboard',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      color: '#5e35b1',
      bg: '#f3f0ff',
      external: true,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f4f8f5', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1a6b3a', marginBottom: 8 }}>
            AMA Migrant Desk
          </div>
          <div style={{ fontSize: 18, color: '#4a6b55', marginBottom: 4 }}>Agent Portal</div>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>
            Authorised personnel only — AMA Migrant Desk Staff
          </div>
        </div>

        {/* Quick action cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
          {cards.map((card, i) => (
            <a
              key={i}
              href={card.href}
              target={card.external ? '_blank' : undefined}
              rel={card.external ? 'noopener noreferrer' : undefined}
              style={{
                background: '#ffffff',
                border: '1px solid #e0e8e3',
                borderRadius: 16,
                padding: 24,
                textDecoration: 'none',
                display: 'block',
                transition: 'all 0.2s',
                borderTop: `3px solid ${card.color}`,
              }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: card.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: card.color,
                marginBottom: 16,
              }}>
                {card.icon}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0d1f14', marginBottom: 8 }}>
                {card.title}
                {card.external && ' ↗'}
              </div>
              <div style={{ fontSize: 13, color: '#4a6b55', lineHeight: 1.6 }}>
                {card.description}
              </div>
            </a>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12 }}>
          This portal is for authorised AMA Migrant Desk staff only.
          <br />
          For technical support contact ama@migrantdesk.onmicrosoft.com
        </div>
      </div>
    </div>
  );
}
