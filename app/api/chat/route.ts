import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[Chat] GEMINI_API_KEY is not set');
      return NextResponse.json(
        { error: 'Chat service not configured' },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const systemPrompt = `You are a helpful assistant for the AMA Migrant Desk, operated by the Accra Metropolitan Assembly in Ghana in partnership with IOM Ghana and funded by GIZ/GEC. You help vulnerable migrants understand available services, how to submit cases, and what their case status means. Always respond in the same language the user writes in. Be empathetic, clear, and concise. Never share personal case information. If someone is in immediate danger tell them to call emergency services or the desk directly. The desk provides: protection from abuse and violence, legal support, medical assistance, counselling, reintegration support, and documentation help. Referral partners include CHRAJ, NHIS, Legal Aid Commission, IOM Ghana, Ministry of Gender Children and Social Protection, AMA Social Welfare, Ghana European Centre for Jobs, and AMA Legal Department. Case statuses mean: New = just approved and being assessed, In Review = agent is working on it, Referred = sent to an external organisation, Escalated = urgent attention needed, Resolved = issue has been resolved, Closed = case is fully closed.`;

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const requestBody = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    };

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      }
    );

    const geminiData = await geminiResponse.json();

    console.log('[Chat] Gemini status:', geminiResponse.status);
    console.log('[Chat] Gemini response:', JSON.stringify(geminiData).slice(0, 500));

    if (!geminiResponse.ok) {
      console.error('[Chat] Gemini error:', geminiData);
      return NextResponse.json(
        { error: 'AI service temporarily unavailable' },
        { status: 502 }
      );
    }

    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('[Chat] No text in Gemini response:', geminiData);
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
