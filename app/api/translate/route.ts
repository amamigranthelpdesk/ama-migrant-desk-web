import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, from, to } = await request.json();

    if (!text || !to) {
      return NextResponse.json({ error: 'Missing text or target language' }, { status: 400 });
    }

    const langpair = `${from || 'en'}|${to}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langpair)}`;

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: 'Translation service unavailable' }, { status: 502 });
    }

    const data = await response.json();

    const translation = data?.responseData?.translatedText;
    const confidence = data?.responseData?.match ?? null;

    if (!translation) {
      return NextResponse.json({ error: 'No translation returned' }, { status: 502 });
    }

    return NextResponse.json({ translation, confidence });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process translation request' }, { status: 500 });
  }
}
