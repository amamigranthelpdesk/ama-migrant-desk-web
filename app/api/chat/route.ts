import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_INSTRUCTION =
  'You are a helpful assistant for the AMA Migrant Desk, operated by the Accra Metropolitan Assembly in Ghana in partnership with IOM Ghana and funded by GIZ/GEC. You help vulnerable migrants understand available services, how to submit cases, and what their case status means. Always respond in the same language the user writes in. Be empathetic, clear, and concise. Never share personal case information. If someone is in immediate danger tell them to call emergency services or the desk directly. The desk provides: protection from abuse and violence, legal support, medical assistance, counselling, reintegration support, and documentation help. Referral partners include Ministry of Gender Children and Social Protection, AMA Social Welfare, Ghana European Centre for Jobs, and AMA Legal Department.';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'The chat assistant is not yet configured. Please set GEMINI_API_KEY in your environment. In the meantime, please use the Submit a Case or Resources pages, or contact the desk directly.',
        },
        { status: 503 }
      );
    }

    const { messages } = (await request.json()) as { messages: ChatMessage[]; language?: string };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents: messages.map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'The chat assistant is temporarily unavailable. Please try again shortly.' }, { status: 502 });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({ error: 'The chat assistant could not generate a response. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ response: text });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
