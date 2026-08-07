'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { OPEN_CHAT_EVENT } from '@/components/ChatbotWidget';

// Intersection Observer hook for scroll animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = ref.current?.querySelectorAll('.scroll-animate');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

interface ActionCard {
  href?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  accentLight: string;
  isChat?: boolean;
}

const cardBaseStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 16,
  padding: '28px 24px',
  display: 'block',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-sm)',
  width: '100%',
  textAlign: 'left',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
};

function ActionCardContent({ card }: { card: ActionCard }) {
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: card.accent, borderRadius: '16px 16px 0 0' }} />
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 14,
        background: card.accentLight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: card.accent,
        marginBottom: 20,
        transition: 'all 0.25s ease',
      }}>
        {card.icon}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--text-primary)', marginBottom: 10, fontWeight: 400 }}>
        {card.title}
      </h3>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 24 }}>
        {card.description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: card.accent, fontSize: 13, fontWeight: 600 }}>
        Get started
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.2s' }}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </>
  );
}

export default function HomePage() {
  const pageRef = useScrollAnimation();

  const actionCards: ActionCard[] = [
    {
      href: '/submit',
      title: 'Submit a Case',
      description: 'Report your situation securely. An agent will contact you within 2 working days.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      accent: '#1a6b3a',
      accentLight: 'var(--green-light)',
    },
    {
      href: '/status',
      title: 'Check My Case',
      description: 'Track your case progress using your reference number.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      accent: '#c8880a',
      accentLight: 'var(--gold-light)',
    },
    {
      href: '/translate',
      title: 'Translation Tool',
      description: 'Communicate in 12 languages including Arabic, Chinese, and Swahili.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      accent: '#5e35b1',
      accentLight: '#f3f0ff',
      isChat: true,
    },
  ];

  const services = [
    {
      title: 'Protection',
      desc: 'Help for survivors of abuse, violence, trafficking, and exploitation',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: 'Legal Support',
      desc: 'Documentation assistance, legal aid referrals, and rights guidance',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v19M5 8l7-5 7 5M3 13l4-5 4 5M17 13l4-5 4 5" transform="scale(0.9) translate(1.2, 1.2)" />
          <path d="M3 17h6M15 17h6" />
        </svg>
      ),
    },
    {
      title: 'Medical Assistance',
      desc: 'NHIS registration, emergency healthcare and hospital referrals',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      title: 'Counselling',
      desc: 'Psychosocial support and mental health referrals',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: 'Reintegration',
      desc: 'Support for returning migrants including vocational training and grants',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      title: 'Documentation',
      desc: 'Help obtaining Ghana Card, passport, and official documents',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
  ];

  return (
    <main ref={pageRef} style={{ fontFamily: 'var(--font-body)' }}>

      {/* VIDEO HERO */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/Help Is Here.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(13,40,24,0.85) 0%, rgba(26,107,58,0.7) 60%, rgba(13,40,24,0.75) 100%)',
          zIndex: 1,
        }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto', padding: '0 32px', width: '100%' }}>
          <div className="animate-fadeInUp" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 100,
            padding: '6px 16px',
            marginBottom: 32,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 600 }}>
              Free · Confidential · Available Now
            </span>
          </div>

          <h1 className="animate-fadeInUp delay-1" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 7vw, 80px)',
            color: '#ffffff',
            lineHeight: 1.05,
            marginBottom: 24,
            letterSpacing: '-1.5px',
          }}>
            Every migrant<br />
            <span style={{ color: '#86efac' }}>deserves to be heard.</span>
          </h1>

          <p className="animate-fadeInUp delay-2" style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: 520,
            lineHeight: 1.7,
            marginBottom: 40,
          }}>
            The AMA Migrant Desk provides free, confidential assistance to vulnerable migrants in Accra. Available in English, French, Spanish, and Arabic.
          </p>

          <div className="animate-fadeInUp delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/submit" style={{
              background: '#ffffff',
              color: '#0d2818',
              padding: '14px 28px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s',
            }}>
              Get Help Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/status" style={{
              background: 'rgba(255,255,255,0.12)',
              color: '#ffffff',
              padding: '14px 28px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 15,
              border: '1px solid rgba(255,255,255,0.25)',
              transition: 'all 0.2s',
            }}>
              Check My Case
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</div>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }} />
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { value: '24/7', label: 'Online form available' },
            { value: '4', label: 'Languages supported' },
            { value: '2 days', label: 'Agent response time' },
          ].map((stat, i) => (
            <div key={i} className="scroll-animate animate-fadeInUp" style={{ textAlign: 'center', padding: '0 24px', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, color: 'var(--green)', lineHeight: 1, marginBottom: 8 }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTION CARDS */}
      <section style={{ padding: '80px 32px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="scroll-animate animate-fadeInUp" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 16 }}>
              How we can help
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              What do you need today?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {actionCards.map((card, i) =>
              card.isChat ? (
                <button
                  key={i}
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT))}
                  className={`card-hover scroll-animate animate-fadeInUp delay-${i + 1}`}
                  style={cardBaseStyle}
                >
                  <ActionCardContent card={card} />
                </button>
              ) : (
                <Link
                  key={i}
                  href={card.href!}
                  className={`card-hover scroll-animate animate-fadeInUp delay-${i + 1}`}
                  style={cardBaseStyle}
                >
                  <ActionCardContent card={card} />
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: '80px 32px', background: 'var(--bg-card)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="scroll-animate animate-fadeInUp" style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 16 }}>
              Our services
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)', letterSpacing: '-0.5px', maxWidth: 500 }}>
              How the desk can help you
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            {services.map((service, i) => (
              <div
                key={i}
                className={`service-card scroll-animate animate-fadeInUp delay-${(i % 4) + 1}`}
                style={{ background: 'var(--bg-card)', padding: '28px 24px', cursor: 'default' }}
              >
                <div
                  className="service-icon"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--green-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--green)',
                    marginBottom: 16,
                    transition: 'all 0.25s ease',
                  }}
                >
                  {service.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)', marginBottom: 8, fontWeight: 400 }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ padding: '80px 32px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="scroll-animate animate-fadeInUp" style={{ maxWidth: 600 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 16 }}>
              About us
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 24 }}>
              A desk built for migrants, by people who care
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
              The AMA Migrant Desk is operated by the Accra Metropolitan Assembly in partnership with IOM Ghana. We provide free, confidential case management services to vulnerable migrants in the Greater Accra region.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Our team of trained agents handles cases involving protection, legal support, medical assistance, counselling, reintegration, and documentation — connecting migrants with the right organisations and following up until every case is resolved.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ padding: '80px 32px', background: '#0d2818' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="scroll-animate animate-fadeInUp" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#ffffff', letterSpacing: '-0.5px', marginBottom: 16 }}>
            Need immediate help?
          </h2>
          <p className="scroll-animate animate-fadeInUp delay-1" style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginBottom: 48, maxWidth: 480, margin: '0 auto 48px' }}>
            Submit your case online and an agent will contact you within 2 working days.
          </p>
          <div className="scroll-animate animate-fadeInUp delay-2" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '24px 32px', textAlign: 'center', minWidth: 200 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Location</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#ffffff' }}>AMA Head Office, Accra</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '24px 32px', textAlign: 'center', minWidth: 200 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Hours</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#ffffff' }}>Mon – Fri, 8AM – 5PM</div>
            </div>
            <Link href="/submit" style={{ background: '#1a6b3a', border: '1px solid #1a6b3a', borderRadius: 12, padding: '24px 32px', textAlign: 'center', minWidth: 200, display: 'block', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Online</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                Submit a Case
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
