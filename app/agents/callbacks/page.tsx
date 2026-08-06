'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { supabase, CallbackRequest } from '@/lib/supabase';

export default function CallbacksPage() {
  const [callbacks, setCallbacks] = useState<CallbackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  const fetchCallbacks = useCallback(async () => {
    let query = supabase
      .from('callback_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    setCallbacks(data || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    void fetchCallbacks();

    const channel = supabase
      .channel('callbacks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'callback_requests' }, () => {
        void fetchCallbacks();
      })
      .subscribe();

    return () => { void supabase.removeChannel(channel); };
  }, [fetchCallbacks]);

  const updateStatus = async (id: string, status: string, notes?: string) => {
    await supabase
      .from('callback_requests')
      .update({ status, agent_notes: notes || null })
      .eq('id', id);
    void fetchCallbacks();
  };

  const formatTime = (dateStr: string) => new Date(dateStr).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  const statusColors: Record<string, string> = {
    pending: '#c62828',
    called: '#c8880a',
    resolved: '#1a6b3a',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f8f5', fontFamily: 'Arial, sans-serif', padding: 24 }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1a6b3a' }}>Callback Requests</div>
          <div style={{ fontSize: 13, color: '#4a6b55', marginTop: 4 }}>
            Clients who have requested a call back from an agent
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['all', 'pending', 'called', 'resolved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 16px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: filter === f ? '#1a6b3a' : '#e0e8e3',
                background: filter === f ? '#1a6b3a' : '#ffffff',
                color: filter === f ? '#ffffff' : '#4a6b55',
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: 'Arial, sans-serif',
                textTransform: 'capitalize',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {loading && <div style={{ color: '#4a6b55', fontSize: 13 }}>Loading...</div>}

        {!loading && callbacks.length === 0 && (
          <div style={{ background: '#ffffff', borderRadius: 12, padding: 40, textAlign: 'center', color: '#9ca3af', border: '1px solid #e0e8e3' }}>
            No callback requests found
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {callbacks.map(cb => (
            <div key={cb.id} style={{
              background: '#ffffff',
              borderRadius: 12,
              padding: 20,
              border: '1px solid #e0e8e3',
              borderLeft: `4px solid ${statusColors[cb.status] || '#546e7a'}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0d1f14' }}>
                    {cb.client_name || 'Unknown Client'}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1a6b3a', marginTop: 4, display: 'flex', alignItems: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, verticalAlign: 'middle' }}>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
                    </svg>
                    {cb.contact_number}
                  </div>
                  {cb.notes && (
                    <div style={{ fontSize: 13, color: '#4a6b55', marginTop: 8, background: '#f4f8f5', padding: '8px 12px', borderRadius: 8 }}>
                      {cb.notes}
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>
                    Requested: {formatTime(cb.created_at)}
                  </div>
                </div>
                <div style={{
                  fontSize: 11,
                  background: statusColors[cb.status] || '#546e7a',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: 20,
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}>
                  {cb.status}
                </div>
              </div>

              {cb.agent_notes && (
                <div style={{ fontSize: 12, color: '#4a6b55', background: '#f4f8f5', padding: '8px 12px', borderRadius: 8, marginBottom: 12 }}>
                  Agent notes: {cb.agent_notes}
                </div>
              )}

              {cb.status === 'pending' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => void updateStatus(cb.id, 'called')}
                    style={{
                      background: '#c8880a',
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
                    Mark as Called
                  </button>
                  <button
                    onClick={() => void updateStatus(cb.id, 'resolved', 'Resolved via callback')}
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
                </div>
              )}

              {cb.status === 'called' && (
                <button
                  onClick={() => void updateStatus(cb.id, 'resolved', 'Resolved after callback')}
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
          ))}
        </div>
      </div>
    </div>
  );
}
