'use client';

import { useTranslation } from '@/lib/translations';

export default function SubmitPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ama-green sm:text-4xl">{t.submit.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-gray-700">{t.submit.intro}</p>

      <div className="mt-6 rounded-xl bg-ama-green-light p-4 text-sm font-medium text-ama-green">
        {t.submit.languagesNote}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <iframe
          src="https://forms.cloud.microsoft/r/AWKgFLFCQ5"
          title="AMA Migrant Desk case submission form"
          width="100%"
          height="900"
          style={{ border: 0 }}
          allowFullScreen
        />
      </div>

      <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm font-medium text-amber-900 ring-1 ring-amber-200">
        {t.submit.afterNote}
      </div>
    </div>
  );
}
