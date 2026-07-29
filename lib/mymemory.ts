export interface TranslateResult {
  translation: string;
  confidence: number | null;
}

/**
 * Calls the app's /api/translate route, which proxies MyMemory.
 * `from` should be a language code such as "en", or "auto" for auto-detect.
 */
export async function translate(text: string, from: string, to: string): Promise<TranslateResult> {
  if (!text.trim()) {
    return { translation: '', confidence: null };
  }

  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, from, to }),
  });

  if (!response.ok) {
    throw new Error('Translation request failed');
  }

  const data = await response.json();
  return {
    translation: data.translation ?? '',
    confidence: typeof data.confidence === 'number' ? data.confidence : null,
  };
}
