'use client';

import { useTranslation } from '@/lib/translations';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-ama-green/10 bg-ama-green-light">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-10">
          <img src="/ama-logo.png" alt="Accra Metropolitan Assembly logo" className="h-14 w-auto object-contain" />
          <img src="/iom-logo.png" alt="IOM Ghana logo" className="h-14 w-auto object-contain" />
          <img src="/giz-logo.png" alt="GIZ logo" className="h-14 w-auto object-contain" />
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-gray-600">
          This initiative is implemented by IOM with funding from the Deutsche Gesellschaft für
          Internationale Zusammenarbeit (GIZ) GmbH.
        </p>

        <p className="mt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} AMA Migrant Desk — {t.home.contactAddressValue}
        </p>
      </div>
    </footer>
  );
}
