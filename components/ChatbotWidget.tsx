'use client';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const OPEN_CHAT_EVENT = 'ama-open-chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface QuickReply {
  label: string;
  value: string;
}

const QUICK_REPLIES_INITIAL: QuickReply[] = [
  { label: '📝 Log a Case', value: 'I want to log a case and get help' },
  { label: '🔍 Check Case Status', value: 'How do I check my case status?' },
  { label: '📞 Request Callback', value: 'I want an agent to call me back' },
  { label: '❓ What services do you offer?', value: 'What services does the AMA Migrant Desk offer?' },
  { label: '🏢 Referral organisations', value: 'Tell me about the referral organisations' },
  { label: '🛡️ What is GBV?', value: 'What is GBV and how can you help?' },
];

export const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sessionId] = React.useState(() => uuidv4());
  const [conversationId, setConversationId] = React.useState<string | null>(null);
  const [showQuickReplies, setShowQuickReplies] = React.useState(true);
  const [showCallbackForm, setShowCallbackForm] = React.useState(false);
  const [callbackName, setCallbackName] = React.useState('');
  const [callbackContact, setCallbackContact] = React.useState('');
  const [callbackSubmitted, setCallbackSubmitted] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  React.useEffect(() => {
    function handleOpenEvent() {
      setOpen(true);
    }
    window.addEventListener(OPEN_CHAT_EVENT, handleOpenEvent);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handleOpenEvent);
  }, []);

  React.useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Hello! Welcome to the AMA Migrant Desk. I am here to help you.\n\nBonjour! Bienvenue au Bureau des migrants de l\'AMA.\n\n¡Hola! Bienvenido al Escritorio de Migrantes de la AMA.\n\nمرحباً! أهلاً بك في مكتب المهاجرين.\n\nHow can I help you today?',
        timestamp: new Date(),
      }]);
    }
  }, [open]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setShowQuickReplies(false);

    // Check if user wants callback
    if (text.toLowerCase().includes('call me back') ||
        text.toLowerCase().includes('callback') ||
        text.toLowerCase().includes('call back')) {
      setShowCallbackForm(true);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          sessionId,
          conversationId,
        }),
      });

      const data = await response.json();

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || 'I apologise, something went wrong. Please try again.',
        timestamp: new Date(),
      }]);

    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I am having trouble connecting. Please try again in a moment.',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const submitCallback = async () => {
    if (!callbackContact) return;

    try {
      await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          clientName: callbackName,
          contactNumber: callbackContact,
          notes: 'Callback requested via chatbot',
        }),
      });

      setCallbackSubmitted(true);
      setShowCallbackForm(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `✅ Your callback request has been registered!\n\nAn agent will call you at ${callbackContact} within 2 working days.\n\nIs there anything else I can help you with?`,
        timestamp: new Date(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I could not register your callback. Please try calling the desk directly.',
        timestamp: new Date(),
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const formatTime = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000, fontFamily: 'var(--font-body)' }}>
      {open && (
        <div style={{
          width: 380,
          height: 560,
          background: '#ffffff',
          borderRadius: 16,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 12,
          border: '1px solid #e8e0d0',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0d2818, #1a6b3a)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 13 }}>AMA Migrant Desk Assistant</div>
                <div style={{ color: '#a8d5b5', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }}/>
                  Online · Responds instantly
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a8d5b5', padding: 4 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            background: '#f9fafb',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? '#1a6b3a' : '#ffffff',
                  color: msg.role === 'user' ? '#ffffff' : '#0d1f14',
                  fontSize: 13,
                  lineHeight: 1.6,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  border: msg.role === 'assistant' ? '1px solid #e8e0d0' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
                <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 3, paddingLeft: 4, paddingRight: 4 }}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: '#ffffff',
                  border: '1px solid #e8e0d0',
                  display: 'flex',
                  gap: 4,
                  alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#1a6b3a',
                      animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite`,
                    }}/>
                  ))}
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuickReplies && messages.length === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                <div style={{ fontSize: 11, color: '#4a6b55', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Quick options:
                </div>
                {QUICK_REPLIES_INITIAL.map((qr, i) => (
                  <button
                    key={i}
                    onClick={() => void sendMessage(qr.value)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e8e0d0',
                      borderRadius: 10,
                      padding: '8px 14px',
                      cursor: 'pointer',
                      fontSize: 12,
                      color: '#1a6b3a',
                      textAlign: 'left',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            )}

            {/* Callback form */}
            {showCallbackForm && !callbackSubmitted && (
              <div style={{
                background: '#ffffff',
                border: '1px solid #e8e0d0',
                borderRadius: 12,
                padding: 16,
                marginTop: 8,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a6b3a', marginBottom: 12 }}>
                  📞 Request a Callback
                </div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={callbackName}
                  onChange={e => setCallbackName(e.target.value)}
                  style={{
                    width: '100%',
                    border: '1px solid #e8e0d0',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 13,
                    marginBottom: 8,
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <input
                  type="tel"
                  placeholder="Your contact number *"
                  value={callbackContact}
                  onChange={e => setCallbackContact(e.target.value)}
                  style={{
                    width: '100%',
                    border: '1px solid #e8e0d0',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 13,
                    marginBottom: 12,
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => void submitCallback()}
                    disabled={!callbackContact}
                    style={{
                      flex: 1,
                      background: callbackContact ? '#1a6b3a' : '#e8e0d0',
                      color: callbackContact ? '#ffffff' : '#9ca3af',
                      border: 'none',
                      borderRadius: 8,
                      padding: '10px',
                      cursor: callbackContact ? 'pointer' : 'not-allowed',
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Submit Request
                  </button>
                  <button
                    onClick={() => setShowCallbackForm(false)}
                    style={{
                      background: '#f4f8f5',
                      color: '#4a6b55',
                      border: '1px solid #e8e0d0',
                      borderRadius: 8,
                      padding: '10px',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid #e8e0d0',
            background: '#ffffff',
            display: 'flex',
            gap: 8,
            alignItems: 'flex-end',
            flexShrink: 0,
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              style={{
                flex: 1,
                border: '1px solid #e8e0d0',
                borderRadius: 10,
                padding: '10px 14px',
                fontSize: 13,
                fontFamily: 'var(--font-body)',
                resize: 'none',
                outline: 'none',
                color: '#0d1f14',
                lineHeight: 1.5,
                maxHeight: 80,
              }}
            />
            <button
              onClick={() => void sendMessage()}
              disabled={!input.trim() || loading}
              style={{
                background: input.trim() && !loading ? '#1a6b3a' : '#e8e0d0',
                border: 'none',
                borderRadius: 10,
                width: 40,
                height: 40,
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? '#ffffff' : '#9ca3af'} strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: open ? '#145530' : '#1a6b3a',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(26,107,58,0.4)',
          transition: 'all 0.2s',
          position: 'relative',
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <div style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#4ade80',
              border: '2px solid #ffffff',
            }}/>
          </>
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ChatbotWidget;
