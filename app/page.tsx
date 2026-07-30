'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/translations';
import { OPEN_CHAT_EVENT } from '@/components/ChatbotWidget';

export default function HomePage() {
  const { t } = useTranslation();

  const services = [
    { title: t.home.serviceProtectionTitle, desc: t.home.serviceProtectionDesc, icon: '🛡️' },
    { title: t.home.serviceLegalTitle, desc: t.home.serviceLegalDesc, icon: '⚖️' },
    { title: t.home.serviceMedicalTitle, desc: t.home.serviceMedicalDesc, icon: '🩺' },
    { title: t.home.serviceCounsellingTitle, desc: t.home.serviceCounsellingDesc, icon: '💬' },
    { title: t.home.serviceReintegrationTitle, desc: t.home.serviceReintegrationDesc, icon: '🤝' },
    { title: t.home.serviceDocumentationTitle, desc: t.home.serviceDocumentationDesc, icon: '📄' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-ama-green-light">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-ama-green sm:text-5xl lg:text-6xl">
            {t.home.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">
            {t.home.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Hero images */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="my-12 grid grid-cols-3 gap-4 overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop"
            alt={t.home.heroImage1Alt}
            className="h-48 w-full rounded-xl object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
            alt={t.home.heroImage2Alt}
            className="h-48 w-full rounded-xl object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop"
            alt={t.home.heroImage3Alt}
            className="h-48 w-full rounded-xl object-cover"
          />
        </div>

        {/* Stats strip */}
        <div className="my-10 grid grid-cols-3 gap-8 border-y border-gray-100 py-10">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-ama-green">{t.home.statAvailabilityValue}</div>
            <div className="text-sm text-gray-500">{t.home.statAvailabilityLabel}</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-ama-green">{t.home.statLanguagesValue}</div>
            <div className="text-sm text-gray-500">{t.home.statLanguagesLabel}</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-ama-green">{t.home.statResponseValue}</div>
            <div className="text-sm text-gray-500">{t.home.statResponseLabel}</div>
          </div>
        </div>
      </section>

      {/* Action cards */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Link href="/submit" className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-ama-green hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f5ee] transition-colors duration-300 group-hover:bg-ama-green">
              <div className="text-ama-green transition-colors duration-300 group-hover:text-white">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">{t.home.cardSubmitTitle}</h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">{t.home.cardSubmitDesc}</p>
            <div className="flex items-center text-sm font-semibold text-ama-green transition-all duration-300 group-hover:gap-2">
              {t.home.getStarted}
              <svg className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/status" className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-ama-gold hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff8ee] transition-colors duration-300 group-hover:bg-ama-gold">
              <div className="text-ama-gold transition-colors duration-300 group-hover:text-white">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">{t.home.cardStatusTitle}</h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">{t.home.cardStatusDesc}</p>
            <div className="flex items-center text-sm font-semibold text-ama-gold transition-all duration-300 group-hover:gap-2">
              {t.home.getStarted}
              <svg className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/translate" className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-ama-green hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f5ee] transition-colors duration-300 group-hover:bg-ama-green">
              <div className="text-ama-green transition-colors duration-300 group-hover:text-white">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 8l6 6" />
                  <path d="M4 14l6-6 2-3" />
                  <path d="M2 5h12" />
                  <path d="M7 2h1" />
                  <path d="M22 22l-5-10-5 10" />
                  <path d="M14 18h6" />
                </svg>
              </div>
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">{t.home.cardTranslateTitle}</h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">{t.home.cardTranslateDesc}</p>
            <div className="flex items-center text-sm font-semibold text-ama-green transition-all duration-300 group-hover:gap-2">
              {t.home.getStarted}
              <svg className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT))}
            className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 text-left shadow-sm transition-all duration-300 hover:border-ama-gold hover:shadow-md"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff8ee] transition-colors duration-300 group-hover:bg-ama-gold">
              <div className="text-ama-gold transition-colors duration-300 group-hover:text-white">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">{t.home.cardChatTitle}</h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">{t.home.cardChatDesc}</p>
            <div className="flex items-center text-sm font-semibold text-ama-gold transition-all duration-300 group-hover:gap-2">
              {t.home.getStarted}
              <svg className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </section>

      {/* Services */}
      <section className="bg-ama-green-light py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-ama-green">{t.home.servicesTitle}</h2>
            <p className="mt-3 text-gray-600">{t.home.servicesSubtitle}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="text-3xl">{service.icon}</div>
                <h3 className="mt-3 text-lg font-bold text-ama-green">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-ama-green">{t.home.aboutTitle}</h2>
        <p className="mt-4 text-base leading-relaxed text-gray-700">{t.home.aboutBody}</p>
      </section>

      {/* Contact */}
      <section className="bg-ama-green-light py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ama-green">{t.home.contactTitle}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ama-gold">
                {t.home.contactCallCentre}
              </h3>
              <p className="mt-2 text-lg font-semibold text-gray-800">{t.home.contactCallCentreValue}</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ama-gold">
                {t.home.contactAddress}
              </h3>
              <p className="mt-2 text-lg font-semibold text-gray-800">{t.home.contactAddressValue}</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ama-gold">
                {t.home.contactHours}
              </h3>
              <p className="mt-2 text-lg font-semibold text-gray-800">{t.home.contactHoursValue}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
