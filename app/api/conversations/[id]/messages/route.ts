import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', params.id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ messages: data });

  } catch (error) {
    console.error('[Messages] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { content, role, senderName } = await req.json();

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: params.id,
        role: role || 'agent',
        content,
        sender_name: senderName || 'Agent',
      })
      .select()
      .single();

    if (error) throw error;

    // Update conversation status to agent_joined
    await supabase
      .from('conversations')
      .update({
        status: 'agent_joined',
        agent_id: senderName || 'Agent',
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id);

    return NextResponse.json({ message: data });

  } catch (error) {
    console.error('[Messages POST] Error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
