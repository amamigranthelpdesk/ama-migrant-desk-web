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

      {/* Action cards */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Link
            href="/submit"
            className="rounded-2xl bg-ama-green p-6 text-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-bold">{t.home.cardSubmitTitle}</h2>
            <p className="mt-2 text-sm text-white/90">{t.home.cardSubmitDesc}</p>
          </Link>

          <Link
            href="/status"
            className="rounded-2xl bg-ama-gold p-6 text-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-bold">{t.home.cardStatusTitle}</h2>
            <p className="mt-2 text-sm text-white/90">{t.home.cardStatusDesc}</p>
          </Link>

          <Link
            href="/translate"
            className="rounded-2xl bg-ama-green p-6 text-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-bold">{t.home.cardTranslateTitle}</h2>
            <p className="mt-2 text-sm text-white/90">{t.home.cardTranslateDesc}</p>
          </Link>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT))}
            className="rounded-2xl bg-ama-gold p-6 text-left text-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-bold">{t.home.cardChatTitle}</h2>
            <p className="mt-2 text-sm text-white/90">{t.home.cardChatDesc}</p>
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
