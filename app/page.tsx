'use client';

import React from 'react';
import Link from 'next/link';
import { OPEN_CHAT_EVENT } from '@/components/ChatbotWidget';

interface ActionCard {
  href?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  accentLight: string;
  isChat?: boolean;
}

const ACTION_CARDS: ActionCard[] = [
  {
    href: '/submit',
    title: 'Submit a Case',
    description: 'Report your situation. An agent will contact you within 2 working days.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
    accent: '#1a6b3a',
    accentLight: '#e8f5ee',
  },
  {
    href: '/status',
    title: 'Check My Case',
    description: 'Track your case progress using your reference number.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    accent: '#c8880a',
    accentLight: '#fff8ee',
  },
  {
    href: '/translate',
    title: 'Translation Tool',
    description: 'Communicate in 12 languages including Arabic, Chinese, and Swahili.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
    title: 'Talk to Assistant',
    description: 'Get instant answers from our AI assistant in your language.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    accent: '#5e35b1',
    accentLight: '#f3f0ff',
    isChat: true,
  },
];

const cardBaseStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e8e0d0',
  borderRadius: 16,
  padding: '28px 24px',
  textDecoration: 'none',
  display: 'block',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(13,40,24,0.06)',
  width: '100%',
  textAlign: 'left',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
};

function ActionCardContent({ card }: { card: (typeof ACTION_CARDS)[number] }) {
  return (
    <>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: card.accentLight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: card.accent,
        marginBottom: 20,
      }}>
        {card.icon}
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 20,
        color: '#0d2818',
        marginBottom: 10,
        fontWeight: 400,
      }}>
        {card.title}
      </h3>
      <p style={{ fontSize: 13, color: '#4a6b55', lineHeight: 1.6, marginBottom: 20 }}>
        {card.description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: card.accent, fontSize: 13, fontWeight: 600 }}>
        Get started
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: card.accent,
        borderRadius: '16px 16px 0 0',
      }} />
    </>
  );
}

export default function HomePage() {
  return (
    <main style={{ fontFamily: 'var(--font-body)' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0d2818 0%, #1a6b3a 60%, #1e7a42 100%)',
        padding: '80px 32px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(80px, 15vw, 180px)',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.04)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          letterSpacing: '-4px',
          userSelect: 'none',
        }}>
          Help is here
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 100,
            padding: '6px 16px',
            marginBottom: 32,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 600 }}>
              Free · Confidential · Available Now
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-1px',
          }}>
            Every migrant<br />
            <span style={{ color: '#86efac' }}>deserves to be heard.</span>
          </h1>

          <p style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: 540,
            lineHeight: 1.7,
            marginBottom: 40,
          }}>
            The AMA Migrant Desk provides free, confidential assistance to vulnerable migrants in Accra. We are here to help — in English, French, Spanish, and Arabic.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/submit" style={{
              background: '#ffffff',
              color: '#0d2818',
              padding: '14px 28px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              letterSpacing: '-0.2px',
            }}>
              Get Help Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/status" style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              padding: '14px 28px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              letterSpacing: '-0.2px',
            }}>
              Check My Case
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{
        background: '#ffffff',
        borderBottom: '1px solid #e8e0d0',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          {[
            { value: '24/7', label: 'Online form available' },
            { value: '4', label: 'Languages supported' },
            { value: '2 days', label: 'Agent response time' },
          ].map((stat, i) => (
            <div key={i} style={{
              textAlign: 'center',
              padding: '0 24px',
              borderRight: i < 2 ? '1px solid #e8e0d0' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 40,
                color: '#1a6b3a',
                lineHeight: 1,
                marginBottom: 8,
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: '#4a6b55', letterSpacing: '0.3px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Action cards */}
      <section style={{ padding: '72px 32px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a6b55', marginBottom: 16 }}>
              How we can help
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: '#0d2818', letterSpacing: '-0.5px' }}>
              What do you need today?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {ACTION_CARDS.map((card, i) =>
              card.isChat ? (
                <button
                  key={i}
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT))}
                  style={cardBaseStyle}
                >
                  <ActionCardContent card={card} />
                </button>
              ) : (
                <Link key={i} href={card.href!} style={cardBaseStyle}>
                  <ActionCardContent card={card} />
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Services section */}
      <section style={{ padding: '72px 32px', background: '#ffffff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a6b55', marginBottom: 16 }}>
              Our services
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: '#0d2818', letterSpacing: '-0.5px', maxWidth: 500 }}>
              How the desk can help you
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: '#e8e0d0', border: '1px solid #e8e0d0', borderRadius: 16, overflow: 'hidden' }}>
            {[
              { icon: '🛡️', title: 'Protection', desc: 'Help for survivors of abuse, violence, trafficking, and exploitation' },
              { icon: '⚖️', title: 'Legal Support', desc: 'Documentation assistance, legal aid referrals, and rights guidance' },
              { icon: '🏥', title: 'Medical Assistance', desc: 'NHIS registration, emergency healthcare referrals' },
              { icon: '🤝', title: 'Counselling', desc: 'Psychosocial support and mental health referrals' },
              { icon: '🏘️', title: 'Reintegration', desc: 'Support for returning migrants including vocational training and grants' },
              { icon: '📄', title: 'Documentation', desc: 'Help obtaining Ghana Card, passport, and official documents' },
            ].map((service, i) => (
              <div key={i} style={{ background: '#ffffff', padding: '28px 24px' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{service.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#0d2818', marginBottom: 8, fontWeight: 400 }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: 13, color: '#4a6b55', lineHeight: 1.6 }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section style={{ padding: '72px 32px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a6b55', marginBottom: 16 }}>
              About us
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: '#0d2818', letterSpacing: '-0.5px', marginBottom: 24 }}>
              A desk built for migrants, by people who care
            </h2>
            <p style={{ fontSize: 15, color: '#4a6b55', lineHeight: 1.8, marginBottom: 16 }}>
              The AMA Migrant Desk is operated by the Accra Metropolitan Assembly in partnership with IOM Ghana. We provide free, confidential case management services to vulnerable migrants in the Greater Accra region.
            </p>
            <p style={{ fontSize: 13, color: '#8a9e92', lineHeight: 1.8, fontStyle: 'italic' }}>
              This initiative is implemented by IOM with funding from the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Project Sponsor', value: 'IOM Ghana', color: '#1565c0' },
              { label: 'Implementing Partner', value: 'Accra Metropolitan Assembly', color: '#1a6b3a' },
              { label: 'Funder', value: 'GIZ / GEC', color: '#c8880a' },
              { label: 'Technology Partner', value: 'Asteri Technologies', color: '#5e35b1' },
            ].map((partner, i) => (
              <div key={i} style={{
                background: '#ffffff',
                border: '1px solid #e8e0d0',
                borderRadius: 12,
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderLeft: `4px solid ${partner.color}`,
              }}>
                <div style={{ fontSize: 12, color: '#8a9e92', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{partner.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0d2818' }}>{partner.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section style={{ padding: '72px 32px', background: '#0d2818' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: '#ffffff', letterSpacing: '-0.5px', marginBottom: 16 }}>
            Need immediate help?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginBottom: 48, maxWidth: 480, margin: '0 auto 48px' }}>
            Call the AMA Migrant Desk directly or submit your case online. We respond within 2 working days.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '24px 32px', textAlign: 'center', minWidth: 200 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Call Centre</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#86efac' }}>Coming Soon</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '24px 32px', textAlign: 'center', minWidth: 200 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Location</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#ffffff' }}>AMA Head Office, Accra</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '24px 32px', textAlign: 'center', minWidth: 200 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Hours</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#ffffff' }}>Mon – Fri, 8AM – 5PM</div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
