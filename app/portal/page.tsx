'use client';

import { useTranslation } from '@/lib/translations';

export default function PortalPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ama-green sm:text-4xl">{t.portal.title}</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-gray-700">{t.portal.body}</p>

      <a
        href="https://migrantdesk.sharepoint.com/sites/AMAMigrant"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 rounded-lg bg-ama-green px-8 py-4 text-base font-bold text-white shadow-md transition-opacity hover:opacity-90"
      >
        {t.portal.button}
      </a>

      <p className="mt-6 text-sm text-gray-500">{t.portal.note}</p>
    </div>
  );
}
