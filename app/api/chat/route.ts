import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { supabase } from '@/lib/supabase';

const KNOWLEDGE_BASE = `
ABOUT AMA MIGRANT DESK:
The AMA Migrant Desk is operated by the Accra Metropolitan Assembly (AMA) in Ghana in partnership with IOM Ghana and funded by GIZ/GEC. The desk provides free assistance to vulnerable migrants including returnees, refugees, asylum seekers, and those in transit. The desk is located at the AMA Head Office in Accra. An agent will respond within 2 working days of a case being logged.

SERVICES PROVIDED:
1. Protection from abuse and violence - helping clients who have experienced physical abuse, sexual abuse, domestic violence, trafficking, or exploitation
2. Legal support - connecting clients with legal aid, documentation help, court support
3. Medical assistance - connecting clients with NHIS and healthcare services
4. Counselling - psychosocial support and mental health referrals
5. Reintegration support - help returning migrants reintegrate into Ghanaian society including business grants and vocational training
6. Documentation help - assistance with Ghana Card, passport, and other official documents

REFERRAL ORGANISATIONS:
1. Ministry of Gender, Children and Social Protection - handles child welfare, women's rights, social protection. Contact them for: child abuse, women's rights, social welfare
2. AMA Social Welfare - provides social welfare services within AMA jurisdiction. Contact them for: general social welfare needs
3. Ghana European Centre for Jobs - provides employment support and job placement. Contact them for: employment assistance, vocational training, job seeking
4. AMA Legal Department - handles legal matters within AMA jurisdiction

WHAT IS GBV:
Gender-Based Violence (GBV) refers to harmful acts directed at someone based on their gender. This includes physical abuse, sexual abuse, psychological abuse, economic abuse, forced marriage, trafficking, and female genital mutilation. The desk can connect GBV survivors with counselling services and appropriate referral organisations.

MIGRANT RIGHTS IN GHANA:
All migrants in Ghana have the right to: safety and protection from abuse, access to healthcare, legal representation, humane treatment, confidentiality of their personal information, and to submit a complaint or case without fear.

DATA PROTECTION:
All information shared with the AMA Migrant Desk is strictly confidential and processed under the Ghana Data Protection Act 2012 and IOM data protection principles. Information is only used to provide assistance.

CASE STATUSES:
- New: Case approved and being assessed by an agent
- In Review: Agent is actively working on the case
- Referred: Case has been sent to an external organisation for specialist help
- Escalated: Case requires urgent attention
- Resolved: Issue has been resolved
- Closed: Case is fully closed

FAQ:
Q: How long does it take to get help?
A: An agent will contact you within 2 working days of submitting your case.

Q: Is my information safe?
A: Yes. All information is strictly confidential under Ghana's Data Protection Act 2012.

Q: What documents should I bring?
A: Bring any ID you have - Ghana Card, passport, driver's license, or any other identification. Do not worry if you do not have documents - we can still help you.

Q: Can I get help if I am not Ghanaian?
A: Yes. The desk helps all migrants regardless of nationality.

Q: What if I cannot speak English?
A: The desk has translation support. You can also use our translation tool on this website.

Q: How do I check my case status?
A: Go to the Check My Case page on this website and enter your case reference number.
`;

const SYSTEM_PROMPT = `You are a compassionate and helpful assistant for the AMA Migrant Desk in Accra, Ghana. You help vulnerable migrants get assistance.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}

YOUR BEHAVIOUR:
- Always respond in the same language the user writes in
- Be warm, empathetic, and clear
- Never share personal case information
- If someone is in immediate danger tell them to call emergency services immediately
- You have four modes:

MODE 1 - GUIDED INTAKE (when user wants to log a case):
Walk through these questions ONE AT A TIME, in this order: full name, contact number, email (optional), nationality, migration status (Returnee / In-Transit / Asylum Seeker / Refugee / Other), type of support needed (protection, medical, legal, financial, counselling, documentation, reintegration), a brief description of their situation, then confirm before logging. Do not ask multiple questions at once. After the user answers, acknowledge their answer warmly and ask the next question. Keep track of their answers. When all questions are answered and user confirms, tell them their case will be logged and an agent will contact them within 2 working days.

MODE 2 - FAQ AND INFORMATION:
Answer questions about GBV, migrant rights, services, referral organisations using the knowledge base above.

MODE 3 - CALLBACK REQUEST:
If the user wants an agent to call them back, collect their name and contact number and confirm their callback request has been registered.

MODE 4 - GENERAL ASSISTANCE:
Help users navigate the website, explain how to check case status, submit forms, use the translation tool.

IMPORTANT RULES:
- Always start by greeting warmly and asking how you can help
- If user says they want to "log a case", "report", "get help", "submit a case" - switch to MODE 1
- If user says "speak to an agent", "live agent", "human" - tell them no live agents are available right now but offer to log a callback request
- If user says "call me back", "callback" - switch to MODE 3
- Keep responses concise - maximum 3 sentences unless giving structured information
- Always end with a follow-up question or offer of further help

CASE CREATION SIGNAL:
When the user has answered all intake questions AND confirmed they want to log a case (said "yes" or equivalent), include this exact marker at the very end of your response on a new line:
[CREATE_CASE:name={client_name}|contact={client_contact}|email={client_email}|nationality={nationality}|migration={migration_status}|support={support_type}|situation={situation_summary}]

Replace each value with what the client actually provided. If a field was not provided use "Not provided". Only include this marker once, when the client explicitly confirms they want to submit.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId, conversationId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Chat service not configured' }, { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Get or create conversation in Supabase
    let convId = conversationId;
    if (!convId && sessionId) {
      const { data: existingConv } = await supabase
        .from('conversations')
        .select('id')
        .eq('session_id', sessionId)
        .single();

      if (existingConv) {
        convId = existingConv.id;
      } else {
        const { data: newConv } = await supabase
          .from('conversations')
          .insert({ session_id: sessionId, status: 'active' })
          .select('id')
          .single();
        convId = newConv?.id;
      }
    }

    // Save the latest user message to Supabase
    const lastMessage = messages[messages.length - 1];
    if (convId && lastMessage?.role === 'user') {
      await supabase.from('messages').insert({
        conversation_id: convId,
        role: 'client',
        content: lastMessage.content,
      });
    }

    // Get AI response from Groq
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
      temperature: 0.6,
      max_tokens: 512,
    });

    const responseText = completion.choices[0]?.message?.content || 'I apologise, I could not generate a response. Please try again.';

    // Check if the bot wants to create a case
    const caseMarkerMatch = responseText.match(/\[CREATE_CASE:([^\]]+)\]/);
    let finalResponse = responseText.replace(/\[CREATE_CASE:[^\]]+\]/, '').trim();
    let caseId: string | null = null;

    if (caseMarkerMatch) {
      try {
        const params: Record<string, string> = {};
        caseMarkerMatch[1].split('|').forEach(pair => {
          const [key, ...valueParts] = pair.split('=');
          params[key.trim()] = valueParts.join('=').trim();
        });

        const { createCase } = await import('@/lib/graph');
        const result = await createCase({
          fullName: params.name || '',
          contactNumber: params.contact || '',
          email: params.email === 'Not provided' ? '' : (params.email || ''),
          nationality: params.nationality || 'Not provided',
          migrationStatus: params.migration || '',
          supportType: params.support || '',
          situation: params.situation || '',
          mode: 'Chatbot',
          otherInfo: 'Case logged via web chatbot',
        });

        caseId = result.caseId;

        // Update conversation in Supabase with case ID and client info
        if (convId) {
          await supabase
            .from('conversations')
            .update({
              case_id: caseId,
              client_name: params.name || null,
              client_contact: params.contact || null,
              client_email: params.email === 'Not provided' ? null : (params.email || null),
              status: 'resolved',
            })
            .eq('id', convId);
        }

        // Replace the bot response to include the case ID prominently
        finalResponse = `✅ Your case has been logged successfully!\n\n📋 Your Case Reference Number:\n\n${caseId}\n\nPlease save this number. You can check your case status at any time using the Check My Case page.\n\nAn agent will contact you on ${params.contact} within 2 working days.\n\n${finalResponse}`;

      } catch (error) {
        console.error('[Chat] Case creation failed:', error);
        finalResponse += '\n\n⚠️ I was unable to automatically log your case. Please use the Submit a Case page or call the desk directly.';
      }
    }

    // Save bot response to Supabase
    if (convId) {
      await supabase.from('messages').insert({
        conversation_id: convId,
        role: 'bot',
        content: finalResponse,
      });

      // Update conversation updated_at
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', convId);
    }

    // Check if we should extract client info from the conversation
    const fullConversation = messages.map((m: { role: string; content: string }) => `${m.role}: ${m.content}`).join('\n');

    // Simple extraction — look for patterns in the conversation (skip if the
    // case marker already gave us structured name/contact info above)
    if (convId && !caseMarkerMatch && messages.length > 4) {
      const nameMatch = fullConversation.match(/user: ([A-Z][a-z]+ [A-Z][a-z]+)/);
      const phoneMatch = fullConversation.match(/user: (0[0-9]{9}|\+233[0-9]{9})/);

      if (nameMatch || phoneMatch) {
        await supabase
          .from('conversations')
          .update({
            client_name: nameMatch ? nameMatch[1] : undefined,
            client_contact: phoneMatch ? phoneMatch[1] : undefined,
          })
          .eq('id', convId);
      }
    }

    return NextResponse.json({
      response: finalResponse,
      conversationId: convId,
      caseId,
    });

  } catch (error) {
    console.error('[Chat] Error:', error);
    return NextResponse.json({ error: 'Chat service temporarily unavailable' }, { status: 500 });
  }
}
