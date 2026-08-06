'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { supabase, Conversation, Message } from '@/lib/supabase';

const statusColors: Record<string, string> = {
  active: '#1565c0',
  waiting_agent: '#c8880a',
  agent_joined: '#1a6b3a',
  callback_requested: '#c62828',
  resolved: '#546e7a',
};

const statusLabels: Record<string, string> = {
  active: 'Active',
  waiting_agent: 'Waiting for Agent',
  agent_joined: 'Agent Joined',
  callback_requested: 'Callback Requested',
  resolved: 'Resolved',
};

export default function LiveDeskPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [agentMessage, setAgentMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState('all');
  const [agentName, setAgentName] = useState('Agent');

  const fetchConversations = useCallback(async () => {
    const url = filter === 'all' ? '/api/conversations' : `/api/conversations?status=${filter}`;
    const res = await fetch(url);
    const data = await res.json();
    setConversations(data.conversations || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    void fetchConversations();

    // Real-time subscription
    const channel = supabase
      .channel('conversations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, () => {
        void fetchConversations();
      })
      .subscribe();

    return () => { void supabase.removeChannel(channel); };
  }, [fetchConversations]);

  const loadMessages = async (conv: Conversation) => {
    setSelectedConv(conv);
    const res = await fetch(`/api/conversations/${conv.id}/messages`);
    const data = await res.json();
    setMessages(data.messages || []);

    // Real-time messages subscription
    supabase
      .channel(`messages-${conv.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conv.id}`,
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();
  };

  const sendAgentMessage = async () => {
    if (!agentMessage.trim() || !selectedConv || sending) return;
    setSending(true);

    try {
      await fetch(`/api/conversations/${selectedConv.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: agentMessage,
          role: 'agent',
          senderName: agentName,
        }),
      });
      setAgentMessage('');
    } finally {
      setSending(false);
    }
  };

  const markResolved = async (convId: string) => {
    // Routed through the authenticated API (rather than a direct client-side
    // Supabase write) so this write always goes through the same auth gate
    // that protects this page.
    await fetch(`/api/conversations/${convId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'resolved' }),
    });
    void fetchConversations();
    if (selectedConv?.id === convId) setSelectedConv(null);
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-GB', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    });
  };

  const s = {
    container: { display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif', background: '#f9fafb' } as React.CSSProperties,
    sidebar: { width: 340, background: '#ffffff', borderRight: '1px solid #e0e8e3', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' },
    header: { padding: '16px 20px', background: '#1a6b3a', color: '#ffffff' },
    filterBar: { padding: '12px 16px', borderBottom: '1px solid #e0e8e3', display: 'flex', gap: 8, flexWrap: 'wrap' as const },
    convList: { flex: 1, overflowY: 'auto' as const },
    convItem: (selected: boolean) => ({
      padding: '14px 16px',
      borderBottom: '1px solid #f0f0f0',
      cursor: 'pointer',
      background: selected ? '#f4f8f5' : '#ffffff',
      borderLeft: selected ? '3px solid #1a6b3a' : '3px solid transparent',
      transition: 'all 0.15s',
    }),
    main: { flex: 1, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' },
    chatArea: { flex: 1, overflowY: 'auto' as const, padding: 20, display: 'flex', flexDirection: 'column' as const, gap: 12 },
    inputArea: { padding: '12px 20px', borderTop: '1px solid #e0e8e3', background: '#ffffff', display: 'flex', gap: 8, alignItems: 'flex-end' },
  };

  return (
    <div style={s.container}>
      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={s.header}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Live Desk</div>
          <div style={{ fontSize: 12, color: '#a8d5b5', marginTop: 2 }}>{conversations.length} conversations</div>
        </div>

        {/* Agent name */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #e0e8e3', background: '#f9fafb' }}>
          <input
            value={agentName}
            onChange={e => setAgentName(e.target.value)}
            placeholder="Your name (shown to clients)"
            style={{ width: '100%', border: '1px solid #e0e8e3', borderRadius: 6, padding: '6px 10px', fontSize: 12, outline: 'none', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif' }}
          />
        </div>

        {/* Filters */}
        <div style={s.filterBar}>
          {['all', 'active', 'callback_requested', 'waiting_agent', 'resolved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '4px 10px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: filter === f ? '#1a6b3a' : '#e0e8e3',
                background: filter === f ? '#1a6b3a' : '#ffffff',
                color: filter === f ? '#ffffff' : '#4a6b55',
                fontSize: 11,
                cursor: 'pointer',
                fontFamily: 'Arial, sans-serif',
                textTransform: 'capitalize',
              }}
            >
              {f === 'all' ? 'All' : statusLabels[f] || f}
            </button>
          ))}
        </div>

        {/* Conversation list */}
        <div style={s.convList}>
          {loading && <div style={{ padding: 20, color: '#4a6b55', fontSize: 13 }}>Loading...</div>}
          {!loading && conversations.length === 0 && (
            <div style={{ padding: 20, color: '#9ca3af', fontSize: 13, textAlign: 'center' }}>
              No conversations yet
            </div>
          )}
          {conversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => void loadMessages(conv)}
              style={s.convItem(selectedConv?.id === conv.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0d1f14' }}>
                  {conv.client_name || 'Unknown Client'}
                </div>
                <div style={{
                  fontSize: 10,
                  background: statusColors[conv.status] || '#546e7a',
                  color: '#ffffff',
                  padding: '2px 6px',
                  borderRadius: 10,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>
                  {statusLabels[conv.status] || conv.status}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#4a6b55' }}>
                {conv.client_contact || 'No contact'}
              </div>
              {conv.case_id && (
                <div style={{ fontSize: 11, color: '#1a6b3a', marginTop: 2 }}>
                  Case: {conv.case_id}
                </div>
              )}
              {conv.callback_requested && !conv.callback_done && (
                <div style={{ fontSize: 11, color: '#c62828', marginTop: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#c62828" stroke="none" style={{ marginRight: 4, verticalAlign: 'middle' }}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Callback needed
                </div>
              )}
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
                {formatTime(conv.updated_at)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div style={s.main}>
        {!selectedConv ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#9ca3af' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e0e8e3" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <div style={{ fontSize: 14 }}>Select a conversation to view</div>
          </div>
        ) : (
          <>
            {/* Conversation header */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #e0e8e3', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0d1f14' }}>
                  {selectedConv.client_name || 'Unknown Client'}
                </div>
                <div style={{ fontSize: 12, color: '#4a6b55', display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                  {selectedConv.client_contact && (
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
                      </svg>
                      {selectedConv.client_contact}
                    </span>
                  )}
                  {selectedConv.client_email && (
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      · <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 4px' }}>
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      {selectedConv.client_email}
                    </span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {selectedConv.status !== 'resolved' && (
                  <button
                    onClick={() => void markResolved(selectedConv.id)}
                    style={{
                      background: '#1a6b3a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    Mark Resolved
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 6, verticalAlign: 'middle' }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div style={s.chatArea}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: msg.role === 'client' ? 'flex-start' : msg.role === 'agent' ? 'flex-end' : 'center',
                }}>
                  {msg.role === 'bot' ? (
                    <div style={{
                      background: '#f4f8f5',
                      border: '1px solid #e0e8e3',
                      borderRadius: 10,
                      padding: '8px 14px',
                      fontSize: 12,
                      color: '#4a6b55',
                      maxWidth: '70%',
                      whiteSpace: 'pre-wrap',
                    }}>
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 4 }}>Bot</span>
                      {msg.content}
                    </div>
                  ) : (
                    <div style={{
                      maxWidth: '70%',
                      padding: '10px 14px',
                      borderRadius: msg.role === 'client' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                      background: msg.role === 'client' ? '#ffffff' : '#1a6b3a',
                      color: msg.role === 'client' ? '#0d1f14' : '#ffffff',
                      fontSize: 13,
                      lineHeight: 1.5,
                      border: msg.role === 'client' ? '1px solid #e0e8e3' : 'none',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      whiteSpace: 'pre-wrap',
                    }}>
                      {msg.role === 'agent' && (
                        <span style={{ fontSize: 10, fontWeight: 700, display: 'block', marginBottom: 4, color: '#a8d5b5' }}>
                          {msg.sender_name || 'Agent'}
                        </span>
                      )}
                      {msg.content}
                      <div style={{ fontSize: 10, color: msg.role === 'client' ? '#9ca3af' : '#a8d5b5', marginTop: 4 }}>
                        {formatTime(msg.created_at)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Agent input */}
            {selectedConv.status !== 'resolved' && (
              <div style={s.inputArea}>
                <textarea
                  value={agentMessage}
                  onChange={e => setAgentMessage(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void sendAgentMessage(); } }}
                  placeholder="Type a message to the client..."
                  rows={2}
                  style={{
                    flex: 1,
                    border: '1px solid #e0e8e3',
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: 13,
                    fontFamily: 'Arial, sans-serif',
                    resize: 'none',
                    outline: 'none',
                    color: '#0d1f14',
                  }}
                />
                <button
                  onClick={() => void sendAgentMessage()}
                  disabled={!agentMessage.trim() || sending}
                  style={{
                    background: agentMessage.trim() && !sending ? '#1a6b3a' : '#e0e8e3',
                    border: 'none',
                    borderRadius: 10,
                    width: 44,
                    height: 44,
                    cursor: agentMessage.trim() && !sending ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={agentMessage.trim() && !sending ? '#ffffff' : '#9ca3af'} strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
