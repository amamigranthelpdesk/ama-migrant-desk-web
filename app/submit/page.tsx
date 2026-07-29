'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from '@/lib/translations';

const FORM_URL = 'https://forms.cloud.microsoft/r/AWKgFLFCQ5';

export default function SubmitPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-[600px] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ama-green sm:text-4xl">{t.submit.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-gray-700">{t.submit.intro}</p>

      <div className="mt-6 rounded-xl bg-ama-green-light p-4 text-sm font-medium text-ama-green">
        {t.submit.languagesNote}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 text-center shadow-md sm:p-8">
        <h2 className="text-xl font-bold text-ama-green sm:text-2xl">{t.submit.qrHeading}</h2>

        <div className="mt-6 flex justify-center">
          <div
            className="inline-block rounded-xl bg-white p-4"
            style={{ border: '3px solid #1a6b3a' }}
          >
            <QRCodeSVG
              value={FORM_URL}
              size={280}
              className="h-[220px] w-[220px] sm:h-[280px] sm:w-[280px]"
              level="M"
            />
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-gray-600">
          {t.submit.qrInstruction}
        </p>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-sm font-medium text-gray-700">{t.submit.orDirect}</p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-lg bg-ama-green px-8 py-4 text-base font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            {t.submit.openFormButton}
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-xl border-l-4 border-ama-green bg-ama-green-light p-4 text-sm leading-relaxed text-gray-700">
        {t.submit.nextStepsBody}
      </div>
    </div>
  );
}
