'use client';

import { FormEvent, useState } from 'react';
import { useTranslation } from '@/lib/translations';
import StatusBadge from '@/components/StatusBadge';
import { CaseStatusResult } from '@/lib/graph';

type FetchState = 'idle' | 'loading' | 'found' | 'not-found' | 'error';

const STATUS_MEANING_KEY: Record<string, keyof ReturnType<typeof useTranslation>['t']['status']> = {
  New: 'statusMeaningNew',
  'In Review': 'statusMeaningInReview',
  Referred: 'statusMeaningReferred',
  Escalated: 'statusMeaningEscalated',
  Resolved: 'statusMeaningResolved',
  Closed: 'statusMeaningClosed',
};

export default function StatusPage() {
  const { t } = useTranslation();
  const [caseId, setCaseId] = useState('');
  const [state, setState] = useState<FetchState>('idle');
  const [result, setResult] = useState<CaseStatusResult | null>(null);
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!caseId.trim()) return;

    setState('loading');
    setResult(null);

    try {
      const response = await fetch('/api/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: caseId.trim() }),
      });
      const data = await response.json();

      if (data.found) {
        setResult(data.case);
        setState('found');
      } else {
        setMessage(data.message ?? '');
        setState('not-found');
      }
    } catch (error) {
      setState('error');
    }
  }

  const meaningKey = result ? STATUS_MEANING_KEY[result.status] : undefined;
  const statusMeaning = meaningKey ? t.status[meaningKey] : '';

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ama-green sm:text-4xl">{t.status.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-ink-mid">{t.status.intro}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl bg-ama-green-light p-6">
        <div>
          <label htmlFor="caseId" className="block text-sm font-bold text-ama-green">
            {t.status.caseIdLabel}
          </label>
          <input
            id="caseId"
            type="text"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            placeholder={t.status.caseIdPlaceholder}
            required
            className="mt-2 w-full rounded-lg border border-parchment-border px-4 py-3 text-sm focus:border-ama-green focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full rounded-lg bg-ama-green px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {state === 'loading' ? t.status.loading : t.status.submitButton}
        </button>
      </form>

      {state === 'found' && result && (
        <div className="mt-8 rounded-2xl border border-parchment-border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-light">{t.status.resultCaseId}</p>
              <p className="mt-1 text-lg font-bold text-ink">{result.caseId}</p>
            </div>
            <StatusBadge status={result.status} />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-mid">{statusMeaning}</p>

          {result.referredTo && (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-light">{t.status.resultReferral}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{result.referredTo}</p>
            </div>
          )}

          <div className="mt-4 rounded-lg bg-ama-green-light p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-ama-green">{t.status.resultNextSteps}</p>
            <p className="mt-1 text-sm text-ink-mid">{statusMeaning}</p>
          </div>
        </div>
      )}

      {(state === 'not-found' || state === 'error') && (
        <div className="mt-8 rounded-2xl bg-red-50 p-6 text-sm font-medium text-red-800 ring-1 ring-red-200">
          {t.status.notFound}
          {message && state === 'not-found' && (
            <p className="mt-2 text-xs text-red-600/80">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}
