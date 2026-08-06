'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/lib/translations';
import { translate } from '@/lib/mymemory';

interface LangOption {
  code: string;
  label: string;
  speechCode: string;
}

const LANGUAGES: LangOption[] = [
  { code: 'en', label: 'English', speechCode: 'en-US' },
  { code: 'fr', label: 'Français', speechCode: 'fr-FR' },
  { code: 'es', label: 'Español', speechCode: 'es-ES' },
  { code: 'ar', label: 'العربية', speechCode: 'ar-SA' },
  { code: 'pt', label: 'Português', speechCode: 'pt-PT' },
  { code: 'zh', label: '中文 (Chinese)', speechCode: 'zh-CN' },
  { code: 'de', label: 'Deutsch', speechCode: 'de-DE' },
  { code: 'it', label: 'Italiano', speechCode: 'it-IT' },
  { code: 'ru', label: 'Русский', speechCode: 'ru-RU' },
  { code: 'sw', label: 'Swahili', speechCode: 'sw-KE' },
  { code: 'am', label: 'Amharic (አማርኛ)', speechCode: 'am-ET' },
  { code: 'so', label: 'Somali', speechCode: 'so-SO' },
];

const CLIENT_LANGUAGES: LangOption[] = [
  { code: 'auto', label: 'Auto-detect', speechCode: '' },
  ...LANGUAGES,
];

function speechCodeFor(code: string): string {
  return LANGUAGES.find((l) => l.code === code)?.speechCode ?? 'en-US';
}

// Minimal ambient types for the Web Speech API, which is not part of
// standard TypeScript DOM lib typings.
interface SpeechRecognitionResultLike {
  0: { transcript: string };
  isFinal: boolean;
}
interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const SUPPORTED_SOURCE_LANGS = LANGUAGES.map((l) => l.code);

function getSourceLang(selected: string): string {
  if (selected === 'auto') {
    // MyMemory does not support "auto" as a language code — use the
    // browser's language as a hint, falling back to English.
    const browserLang = typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2) : undefined;
    return browserLang && SUPPORTED_SOURCE_LANGS.includes(browserLang) ? browserLang : 'en';
  }
  return selected;
}

// Speech recognition, unlike MyMemory, natively supports an empty lang
// string as a hint for the browser to auto-detect the spoken language.
function getRecognitionLang(langCode: string): string {
  if (langCode === 'auto') return '';
  return speechCodeFor(langCode);
}

function speak(text: string, langCode: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis || !text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = speechCodeFor(langCode);
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function VoicePanel({
  label,
  speakerLangCode,
  listenerLangCode,
  langOptions,
  onLangChange,
  notSupportedText,
  listeningText,
  speakButtonText,
}: {
  label: string;
  speakerLangCode: string;
  listenerLangCode: string;
  langOptions: LangOption[];
  onLangChange: (code: string) => void;
  notSupportedText: string;
  listeningText: string;
  speakButtonText: string;
}) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    setSupported(!!getSpeechRecognitionCtor());
  }, []);

  async function handleMicClick() {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setSupported(false);
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new Ctor();
    recognition.lang = getRecognitionLang(speakerLangCode);
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const text = event.results[event.results.length - 1]?.[0]?.transcript ?? '';
      setTranscript(text);
      try {
        const result = await translate(text, getSourceLang(speakerLangCode), listenerLangCode);
        setTranslation(result.translation);
        speak(result.translation, listenerLangCode);
      } catch (error) {
        setTranslation('');
      }
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  return (
    <div className="rounded-2xl border border-parchment-border p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-ama-green">{label}</h3>
        <select
          value={speakerLangCode}
          onChange={(e) => onLangChange(e.target.value)}
          className="rounded-md border border-parchment-border px-2 py-1 text-sm"
        >
          {langOptions.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {!supported ? (
        <p className="mt-4 text-sm text-red-600">{notSupportedText}</p>
      ) : (
        <>
          <button
            type="button"
            onClick={handleMicClick}
            className={`mt-4 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-md transition-colors ${
              listening ? 'bg-red-500' : 'bg-ama-green'
            }`}
            aria-label={label}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path d="M19 10v1a7 7 0 01-14 0v-1M12 18v4M8 22h8" strokeLinecap="round" />
            </svg>
          </button>
          {listening && <p className="mt-2 text-xs font-medium text-ama-green">{listeningText}</p>}

          <div className="mt-4 min-h-[3rem] rounded-lg bg-parchment p-3 text-sm text-ink">
            {transcript || <span className="text-ink-light">—</span>}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-ama-green-light p-3">
            <p className="text-sm text-ink">{translation || <span className="text-ink-light">—</span>}</p>
            <button
              type="button"
              onClick={() => speak(translation, listenerLangCode)}
              disabled={!translation}
              aria-label={speakButtonText}
              className="ml-2 shrink-0 rounded-full bg-ama-gold p-2 text-white disabled:opacity-40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.5 8.5a5 5 0 010 7" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function TranslatePage() {
  const { t } = useTranslation();

  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('fr');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [agentLang, setAgentLang] = useState('en');
  const [clientLang, setClientLang] = useState('fr');

  async function handleTranslate() {
    if (!inputText.trim() || loading) return;
    setLoading(true);
    try {
      const result = await translate(inputText, getSourceLang(sourceLang), targetLang);
      setOutputText(result.translation);
    } catch (error) {
      setOutputText('');
    } finally {
      setLoading(false);
    }
  }

  function handleSwap() {
    if (sourceLang === 'auto') return;
    const newSource = targetLang;
    const newTarget = sourceLang;
    setSourceLang(newSource);
    setTargetLang(newTarget);
    setInputText(outputText);
    setOutputText(inputText);
  }

  async function handleCopy() {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ama-green sm:text-4xl">{t.translatePage.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-ink-mid">{t.translatePage.intro}</p>

      {/* Text translation */}
      <div className="mt-8 rounded-2xl border border-parchment-border p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-ama-green">{t.translatePage.sourceLabel}</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="rounded-md border border-parchment-border px-2 py-1 text-sm"
              >
                <option value="auto">{t.translatePage.autoDetect}</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            {sourceLang === 'auto' && (
              <p className="mt-1 text-xs text-ink-light">{t.translatePage.autoDetectInfo}</p>
            )}
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.translatePage.inputPlaceholder}
              rows={8}
              className="mt-2 w-full resize-none rounded-lg border border-parchment-border p-3 text-sm focus:border-ama-green focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-ama-green">{t.translatePage.targetLabel}</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="rounded-md border border-parchment-border px-2 py-1 text-sm"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder={t.translatePage.outputPlaceholder}
              rows={8}
              className="mt-2 w-full resize-none rounded-lg border border-parchment-border bg-parchment p-3 text-sm"
            />
            <button
              type="button"
              onClick={handleCopy}
              disabled={!outputText}
              className="mt-2 rounded-md border border-parchment-border px-3 py-1 text-xs font-semibold text-ink-mid disabled:opacity-40"
            >
              {copied ? t.translatePage.copied : t.translatePage.copyButton}
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleTranslate}
            disabled={loading || !inputText.trim()}
            className="rounded-lg bg-ama-green px-6 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {t.translatePage.translateButton}
          </button>
          <button
            type="button"
            onClick={handleSwap}
            disabled={sourceLang === 'auto'}
            className="rounded-lg border border-parchment-border px-4 py-2 text-sm font-semibold text-ink-mid disabled:opacity-40"
          >
            {t.translatePage.swapButton}
          </button>
        </div>
      </div>

      {/* Voice translation */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-ama-green">{t.translatePage.voiceTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-mid">{t.translatePage.voiceExplain}</p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <VoicePanel
            label={t.translatePage.agentLabel}
            speakerLangCode={agentLang}
            listenerLangCode={clientLang === 'auto' ? 'en' : clientLang}
            langOptions={LANGUAGES}
            onLangChange={setAgentLang}
            notSupportedText={t.translatePage.notSupported}
            listeningText={t.translatePage.listening}
            speakButtonText={t.translatePage.speakButton}
          />
          <VoicePanel
            label={t.translatePage.clientLabel}
            speakerLangCode={clientLang}
            listenerLangCode={agentLang}
            langOptions={CLIENT_LANGUAGES}
            onLangChange={setClientLang}
            notSupportedText={t.translatePage.notSupported}
            listeningText={t.translatePage.listening}
            speakButtonText={t.translatePage.speakButton}
          />
        </div>
      </div>
    </div>
  );
}
