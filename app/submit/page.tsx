'use client';

import { FormEvent, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Translation, useTranslation } from '@/lib/translations';

const FORM_URL = 'https://forms.cloud.microsoft/r/AWKgFLFCQ5';

type TabKey = 'form' | 'qr' | 'link';

type FormKey = keyof Translation['form'];

const MODE_OPTIONS: { value: string; labelKey: FormKey }[] = [
  { value: 'Telephone', labelKey: 'modeTelephone' },
  { value: 'Walk-in', labelKey: 'modeWalkIn' },
  { value: 'Website', labelKey: 'modeWebsite' },
  { value: 'Social Media', labelKey: 'modeSocialMedia' },
];

const GENDER_OPTIONS: { value: string; labelKey: FormKey }[] = [
  { value: 'Female', labelKey: 'genderFemale' },
  { value: 'Male', labelKey: 'genderMale' },
  { value: 'Prefer not to say', labelKey: 'genderPreferNotToSay' },
  { value: 'Other', labelKey: 'genderOther' },
];

const MIGRATION_OPTIONS: { value: string; labelKey: FormKey; descKey: FormKey }[] = [
  { value: 'Returnee', labelKey: 'migrationStatusReturnee', descKey: 'migrationStatusReturneeDesc' },
  { value: 'In-Transit', labelKey: 'migrationStatusInTransit', descKey: 'migrationStatusInTransitDesc' },
  { value: 'Asylum Seeker', labelKey: 'migrationStatusAsylumSeeker', descKey: 'migrationStatusAsylumSeekerDesc' },
  { value: 'Refugee', labelKey: 'migrationStatusRefugee', descKey: 'migrationStatusRefugeeDesc' },
  { value: 'Other', labelKey: 'migrationStatusOther', descKey: 'migrationStatusOther' },
];

const SUPPORT_OPTIONS: { value: string; labelKey: FormKey }[] = [
  { value: 'Protection from abuse or violence', labelKey: 'supportProtection' },
  { value: 'Medical assistance', labelKey: 'supportMedical' },
  { value: 'Legal support', labelKey: 'supportLegal' },
  { value: 'Financial assistance', labelKey: 'supportFinancial' },
  { value: 'Counselling', labelKey: 'supportCounselling' },
  { value: 'Documentation help', labelKey: 'supportDocumentation' },
  { value: 'Reintegration support', labelKey: 'supportReintegration' },
  { value: 'Other', labelKey: 'supportOther' },
];

interface FormState {
  fullName: string;
  contactNumber: string;
  email: string;
  location: string;
  mode: string;
  gender: string;
  nationality: string;
  migrationStatus: string;
  supportType: string[];
  situation: string;
  otherInfo: string;
  consent: boolean;
}

const INITIAL_FORM: FormState = {
  fullName: '',
  contactNumber: '',
  email: '',
  location: '',
  mode: MODE_OPTIONS[0].value,
  gender: GENDER_OPTIONS[0].value,
  nationality: 'Ghanaian',
  migrationStatus: MIGRATION_OPTIONS[0].value,
  supportType: [],
  situation: '',
  otherInfo: '',
  consent: false,
};

type FormErrors = Partial<Record<'fullName' | 'contactNumber' | 'situation' | 'consent', string>>;

export default function SubmitPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('form');
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [successCaseId, setSuccessCaseId] = useState<string | null>(null);
  const [genderOther, setGenderOther] = useState('');
  const [migrationStatusOther, setMigrationStatusOther] = useState('');
  const [supportTypeOther, setSupportTypeOther] = useState('');

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function toggleSupport(value: string) {
    setForm((prev) => {
      const has = prev.supportType.includes(value);
      return {
        ...prev,
        supportType: has ? prev.supportType.filter((v) => v !== value) : [...prev.supportType, value],
      };
    });
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = t.form.requiredError;
    if (!form.contactNumber.trim()) newErrors.contactNumber = t.form.requiredError;
    if (!form.situation.trim()) newErrors.situation = t.form.requiredError;
    if (!form.consent) newErrors.consent = t.form.consentError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!form.consent) {
      setErrors((prev) => ({ ...prev, consent: t.form.consentError }));
      return;
    }

    if (!validate() || submitting) return;

    setSubmitting(true);
    setSubmitError(false);

    try {
      const submitData = {
        fullName: form.fullName.trim(),
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim(),
        location: form.location.trim(),
        mode: form.mode,
        gender: form.gender === 'Other' ? genderOther || 'Other' : form.gender,
        nationality: form.nationality.trim(),
        migrationStatus: form.migrationStatus === 'Other' ? migrationStatusOther || 'Other' : form.migrationStatus,
        supportType: form.supportType
          .map((s) => (s === 'Other' ? `Other: ${supportTypeOther}` : s))
          .join(', '),
        situation: form.situation.trim(),
        otherInfo: form.otherInfo.trim(),
        consent: form.consent,
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setSubmitError(true);
      } else {
        setSuccessCaseId(data.caseId);
      }
    } catch (error) {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setForm(INITIAL_FORM);
    setErrors({});
    setSuccessCaseId(null);
    setSubmitError(false);
    setGenderOther('');
    setMigrationStatusOther('');
    setSupportTypeOther('');
  }

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'form', label: t.form.tabSubmitOnline },
    { key: 'qr', label: t.form.tabQrCode },
    { key: 'link', label: t.form.tabDirectLink },
  ];

  return (
    <div className="mx-auto max-w-[600px] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ama-green sm:text-4xl">{t.submit.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-ink-mid">{t.submit.intro}</p>

      <div className="mt-8 flex gap-2 border-b border-parchment-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-t-lg px-4 py-2 text-sm font-bold transition-colors ${
              activeTab === tab.key
                ? 'border-b-2 border-ama-green text-ama-green'
                : 'text-ink-light hover:text-ama-green'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1 — Custom form */}
      {activeTab === 'form' && (
        <div className="mt-8">
          {successCaseId ? (
            <div className="rounded-2xl bg-white p-6 text-center shadow-md sm:p-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a6b3a" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h2 className="mt-4 text-xl font-bold text-ama-green sm:text-2xl">{t.form.successHeading}</h2>

              <div
                className="mx-auto mt-6 max-w-xs rounded-xl bg-white p-4"
                style={{ border: '3px solid #1a6b3a' }}
              >
                <p className="text-lg font-bold tracking-wide text-ama-green">{successCaseId}</p>
              </div>

              <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-ink-mid">
                {t.form.successKeepSafe} {t.form.successAgentContact}
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="mt-8 rounded-lg bg-ama-green px-8 py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                {t.form.submitAnotherButton}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl bg-white p-6 shadow-md sm:p-8"
            >
              {submitError && (
                <div className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-800 ring-1 ring-red-200">
                  {t.form.errorBanner}
                </div>
              )}

              <div>
                <label htmlFor="fullName" className="block text-sm font-bold text-ama-green">
                  {t.form.fullNameLabel} <span className="text-red-600">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder={t.form.fullNamePlaceholder}
                  className="mt-2 w-full rounded-lg border border-parchment-border px-4 py-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                />
                {errors.fullName && <p className="mt-1 text-xs font-medium text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-bold text-ama-green">
                  {t.form.contactNumberLabel} <span className="text-red-600">*</span>
                </label>
                <input
                  id="contactNumber"
                  type="text"
                  value={form.contactNumber}
                  onChange={(e) => updateField('contactNumber', e.target.value)}
                  placeholder={t.form.contactNumberPlaceholder}
                  className="mt-2 w-full rounded-lg border border-parchment-border px-4 py-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-xs font-medium text-red-600">{errors.contactNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-ama-green">
                  {t.form.emailLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder={t.form.emailPlaceholder}
                  className="mt-2 w-full rounded-lg border border-parchment-border px-4 py-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-bold text-ama-green">
                  {t.form.locationLabel}
                </label>
                <input
                  id="location"
                  type="text"
                  value={form.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder={t.form.locationPlaceholder}
                  className="mt-2 w-full rounded-lg border border-parchment-border px-4 py-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                />
              </div>

              <div>
                <label htmlFor="mode" className="block text-sm font-bold text-ama-green">
                  {t.form.modeLabel}
                </label>
                <select
                  id="mode"
                  value={form.mode}
                  onChange={(e) => updateField('mode', e.target.value)}
                  className="mt-2 w-full rounded-lg border border-parchment-border px-4 py-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                >
                  {MODE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t.form[option.labelKey]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-bold text-ama-green">
                  {t.form.genderLabel}
                </label>
                <select
                  id="gender"
                  value={form.gender}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="mt-2 w-full rounded-lg border border-parchment-border px-4 py-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                >
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t.form[option.labelKey]}
                    </option>
                  ))}
                </select>
                {form.gender === 'Other' && (
                  <input
                    type="text"
                    value={genderOther}
                    onChange={(e) => setGenderOther(e.target.value)}
                    placeholder={t.form.genderOtherPlaceholder}
                    className="mt-2 w-full rounded-lg border border-parchment-border px-4 py-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                  />
                )}
              </div>

              <div>
                <label htmlFor="nationality" className="block text-sm font-bold text-ama-green">
                  {t.form.nationalityLabel}
                </label>
                <input
                  id="nationality"
                  type="text"
                  value={form.nationality}
                  onChange={(e) => updateField('nationality', e.target.value)}
                  className="mt-2 w-full rounded-lg border border-parchment-border px-4 py-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                />
              </div>

              <div>
                <span className="block text-sm font-bold text-ama-green">{t.form.migrationStatusLabel}</span>
                <div className="mt-2 space-y-2">
                  {MIGRATION_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors ${
                        form.migrationStatus === option.value
                          ? 'border-ama-green bg-ama-green-light'
                          : 'border-parchment-border'
                      }`}
                    >
                      <input
                        type="radio"
                        name="migrationStatus"
                        value={option.value}
                        checked={form.migrationStatus === option.value}
                        onChange={(e) => updateField('migrationStatus', e.target.value)}
                        className="mt-1 accent-ama-green"
                      />
                      <span>
                        <span className="font-semibold text-ink">{t.form[option.labelKey]}</span>
                        {option.value !== 'Other' && (
                          <span className="block text-xs text-ink-light">{t.form[option.descKey]}</span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
                {form.migrationStatus === 'Other' && (
                  <input
                    type="text"
                    value={migrationStatusOther}
                    onChange={(e) => setMigrationStatusOther(e.target.value)}
                    placeholder={t.form.migrationStatusOtherPlaceholder}
                    className="mt-2 w-full rounded-lg border border-parchment-border px-4 py-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                  />
                )}
              </div>

              <div>
                <span className="block text-sm font-bold text-ama-green">{t.form.supportTypeLabel}</span>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {SUPPORT_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-colors ${
                        form.supportType.includes(option.value)
                          ? 'border-ama-green bg-ama-green-light'
                          : 'border-parchment-border'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.supportType.includes(option.value)}
                        onChange={() => toggleSupport(option.value)}
                        className="accent-ama-green"
                      />
                      <span className="text-ink">{t.form[option.labelKey]}</span>
                    </label>
                  ))}
                </div>
                {form.supportType.includes('Other') && (
                  <input
                    type="text"
                    value={supportTypeOther}
                    onChange={(e) => setSupportTypeOther(e.target.value)}
                    placeholder={t.form.supportOtherPlaceholder}
                    className="mt-2 w-full rounded-lg border border-parchment-border px-4 py-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                  />
                )}
              </div>

              <div>
                <label htmlFor="situation" className="block text-sm font-bold text-ama-green">
                  {t.form.situationLabel} <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="situation"
                  rows={4}
                  value={form.situation}
                  onChange={(e) => updateField('situation', e.target.value)}
                  placeholder={t.form.situationPlaceholder}
                  className="mt-2 w-full resize-none rounded-lg border border-parchment-border p-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                />
                {errors.situation && <p className="mt-1 text-xs font-medium text-red-600">{errors.situation}</p>}
              </div>

              <div>
                <label htmlFor="otherInfo" className="block text-sm font-bold text-ama-green">
                  {t.form.otherInfoLabel}
                </label>
                <textarea
                  id="otherInfo"
                  rows={3}
                  value={form.otherInfo}
                  onChange={(e) => updateField('otherInfo', e.target.value)}
                  className="mt-2 w-full resize-none rounded-lg border border-parchment-border p-3 text-sm focus:border-ama-green focus:outline-none focus:ring-2 focus:ring-ama-green/30"
                />
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-ama-green-light p-3 text-sm">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => updateField('consent', e.target.checked)}
                    className="mt-1 accent-ama-green"
                  />
                  <span className="text-ink-mid">
                    {t.form.consentLabel} <span className="text-red-600">*</span>
                  </span>
                </label>
                {errors.consent && <p className="mt-1 text-xs font-medium text-red-600">{errors.consent}</p>}
              </div>

              <button
                type="submit"
                disabled={!form.consent || submitting}
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white transition-all duration-200 ${
                  !form.consent || submitting
                    ? 'cursor-not-allowed bg-gray-400 opacity-60'
                    : 'cursor-pointer bg-ama-green hover:opacity-90'
                }`}
              >
                {submitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    {t.form.submitting}
                  </>
                ) : (
                  t.form.submitCaseButton
                )}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 2 — QR code */}
      {activeTab === 'qr' && (
        <div className="mt-8">
          <div className="rounded-2xl bg-ama-green-light p-4 text-sm font-medium text-ama-green">
            {t.submit.languagesNote}
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-md sm:p-8">
            <h2 className="text-xl font-bold text-ama-green sm:text-2xl">{t.submit.qrHeading}</h2>

            <div className="mt-6 flex justify-center">
              <div className="inline-block rounded-xl bg-white p-4" style={{ border: '3px solid #1a6b3a' }}>
                <QRCodeSVG
                  value={FORM_URL}
                  size={280}
                  className="h-[220px] w-[220px] sm:h-[280px] sm:w-[280px]"
                  level="M"
                />
              </div>
            </div>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-ink-mid">
              {t.submit.qrInstruction}
            </p>

            <div className="mt-8 border-t border-parchment-border pt-6">
              <p className="text-sm font-medium text-ink-mid">{t.submit.orDirect}</p>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-lg bg-ama-green px-8 py-4 text-base font-bold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                {t.submit.openFormButton}
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-xl border-l-4 border-ama-green bg-ama-green-light p-4 text-sm leading-relaxed text-ink-mid">
            {t.submit.nextStepsBody}
          </div>
        </div>
      )}

      {/* Tab 3 — Direct link */}
      {activeTab === 'link' && (
        <div className="mt-8 rounded-2xl bg-white p-6 text-center shadow-md sm:p-8">
          <p className="text-sm leading-relaxed text-ink-mid">{t.form.directLinkExplain}</p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-ama-green px-8 py-4 text-base font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            {t.form.openMsFormButton}
          </a>
        </div>
      )}
    </div>
  );
}
