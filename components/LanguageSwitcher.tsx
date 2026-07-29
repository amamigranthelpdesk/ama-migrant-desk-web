'use client';

import { LANGUAGES, Language } from '@/lib/translations';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  variant?: 'light' | 'dark';
}

export default function LanguageSwitcher({ language, setLanguage, variant = 'dark' }: LanguageSwitcherProps) {
  const base =
    variant === 'dark'
      ? 'border-white/40 bg-white/10 text-white'
      : 'border-ama-green/30 bg-white text-ama-green';

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selector">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setLanguage(lang.code)}
          aria-pressed={language === lang.code}
          className={`rounded-md border px-2 py-1 text-xs font-bold transition-colors ${base} ${
            language === lang.code
              ? variant === 'dark'
                ? 'bg-ama-gold border-ama-gold text-white'
                : 'bg-ama-green border-ama-green text-white'
              : 'hover:opacity-80'
          }`}
        >
          {lang.short}
        </button>
      ))}
    </div>
  );
}
