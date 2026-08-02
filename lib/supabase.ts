import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ConversationStatus =
  | 'active'
  | 'waiting_agent'
  | 'agent_joined'
  | 'callback_requested'
  | 'resolved';

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  client_name: string | null;
  client_contact: string | null;
  client_email: string | null;
  language: string;
  status: ConversationStatus;
  case_id: string | null;
  agent_id: string | null;
  callback_requested: boolean;
  callback_done: boolean;
  session_id: string;
}

export interface Message {
  id: string;
  created_at: string;
  conversation_id: string;
  role: 'client' | 'bot' | 'agent';
  content: string;
  sender_name: string | null;
}

export interface CallbackRequest {
  id: string;
  created_at: string;
  conversation_id: string;
  client_name: string | null;
  contact_number: string;
  notes: string | null;
  status: 'pending' | 'called' | 'resolved';
  agent_notes: string | null;
}
