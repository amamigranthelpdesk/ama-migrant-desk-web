import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { conversationId, clientName, contactNumber, notes } = await req.json();

    if (!contactNumber) {
      return NextResponse.json({ error: 'Contact number is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('callback_requests')
      .insert({
        conversation_id: conversationId || null,
        client_name: clientName || null,
        contact_number: contactNumber,
        notes: notes || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // Update conversation status if we have a conversation ID
    if (conversationId) {
      await supabase
        .from('conversations')
        .update({
          callback_requested: true,
          status: 'callback_requested',
        })
        .eq('id', conversationId);
    }

    return NextResponse.json({ success: true, callbackId: data.id });

  } catch (error) {
    console.error('[Callback] Error:', error);
    return NextResponse.json({ error: 'Failed to register callback' }, { status: 500 });
  }
}
