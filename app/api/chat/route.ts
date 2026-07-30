import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `You are a helpful assistant for the AMA Migrant Desk, operated by the Accra Metropolitan Assembly in Ghana in partnership with IOM Ghana and funded by GIZ/GEC. You help vulnerable migrants understand available services, how to submit cases, and what their case status means. Always respond in the same language the user writes in. Be empathetic, clear, and concise. Never share personal case information. If someone is in immediate danger tell them to call emergency services or the desk directly. The desk provides: protection from abuse and violence, legal support, medical assistance, counselling, reintegration support, and documentation help. Referral partners include Ministry of Gender Children and Social Protection, AMA Social Welfare, Ghana European Centre for Jobs, and AMA Legal Department. Case statuses mean: New = just approved and being assessed, In Review = agent is working on it, Referred = sent to an external organisation, Escalated = urgent attention needed, Resolved = issue has been resolved, Closed = case is fully closed.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('[Chat] GROQ_API_KEY is not set');
      return NextResponse.json(
        { error: 'Chat service not configured' },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const text = completion.choices[0]?.message?.content;

    if (!text) {
      console.error('[Chat] No text in Groq response');
      return NextResponse.json(
        { error: 'No response from AI service' },
        { status: 502 }
      );
    }

    return NextResponse.json({ response: text });

  } catch (error) {
    console.error('[Chat] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Chat service temporarily unavailable' },
      { status: 500 }
    );
  }
}
