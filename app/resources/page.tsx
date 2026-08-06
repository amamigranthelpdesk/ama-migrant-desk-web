'use client';

import { useState } from 'react';
import { useTranslation, Language } from '@/lib/translations';

type TabKey = 'gbv' | 'rights' | 'referral' | 'faq';

interface ReferralOrg {
  name: string;
  what: Record<Language, string>;
  cases: Record<Language, string>;
}

const REFERRAL_ORGS: ReferralOrg[] = [
  {
    name: 'Ministry of Gender, Children and Social Protection',
    what: {
      en: 'Government ministry overseeing gender equality and social protection programmes.',
      fr: "Ministère chargé de l'égalité des genres et des programmes de protection sociale.",
      es: 'Ministerio que supervisa la igualdad de género y los programas de protección social.',
      ar: 'وزارة حكومية تشرف على المساواة بين الجنسين وبرامج الحماية الاجتماعية.',
    },
    cases: {
      en: 'Gender-based violence, child protection, social welfare support.',
      fr: 'Violence basée sur le genre, protection de l’enfance, soutien social.',
      es: 'Violencia de género, protección infantil, apoyo de bienestar social.',
      ar: 'العنف القائم على النوع الاجتماعي، حماية الطفل، الدعم الاجتماعي.',
    },
  },
  {
    name: 'AMA Social Welfare',
    what: {
      en: 'Accra Metropolitan Assembly department for social welfare services.',
      fr: 'Département des services sociaux de l’Accra Metropolitan Assembly.',
      es: 'Departamento de servicios de bienestar social de la Accra Metropolitan Assembly.',
      ar: 'إدارة الرعاية الاجتماعية التابعة لمجلس أكرا الحضري.',
    },
    cases: {
      en: 'Family support, welfare assessments, community-level social services.',
      fr: 'Soutien familial, évaluations sociales, services sociaux communautaires.',
      es: 'Apoyo familiar, evaluaciones de bienestar, servicios sociales comunitarios.',
      ar: 'دعم الأسرة، تقييمات الرعاية، الخدمات الاجتماعية المجتمعية.',
    },
  },
  {
    name: 'Ghana European Centre for Jobs, Migration and Reintegration',
    what: {
      en: 'Provides information and support on jobs, safe migration, and reintegration.',
      fr: "Fournit des informations et un soutien sur l'emploi, la migration sûre et la réintégration.",
      es: 'Brinda información y apoyo sobre empleo, migración segura y reintegración.',
      ar: 'يقدم معلومات ودعماً بشأن الوظائف والهجرة الآمنة وإعادة الإدماج.',
    },
    cases: {
      en: 'Employment opportunities, migration counselling, reintegration planning.',
      fr: "Opportunités d'emploi, conseils en migration, planification de la réintégration.",
      es: 'Oportunidades de empleo, asesoría migratoria, planificación de reintegración.',
      ar: 'فرص العمل، الاستشارات المتعلقة بالهجرة، تخطيط إعادة الإدماج.',
    },
  },
  {
    name: 'AMA Legal Department',
    what: {
      en: "The Accra Metropolitan Assembly's in-house legal department.",
      fr: "Le service juridique interne de l'Accra Metropolitan Assembly.",
      es: 'El departamento legal interno de la Accra Metropolitan Assembly.',
      ar: 'الإدارة القانونية الداخلية لمجلس أكرا الحضري.',
    },
    cases: {
      en: 'Legal matters involving AMA services and municipal bylaws.',
      fr: "Questions juridiques liées aux services de l'AMA et aux règlements municipaux.",
      es: 'Asuntos legales relacionados con los servicios de la AMA y las ordenanzas municipales.',
      ar: 'المسائل القانونية المتعلقة بخدمات AMA واللوائح البلدية.',
    },
  },
];

const FAQ_ITEMS: Record<Language, { q: string; a: string }[]> = {
  en: [
    {
      q: 'Is the AMA Migrant Desk service free?',
      a: 'Yes. All services provided by the AMA Migrant Desk are completely free of charge.',
    },
    {
      q: 'Will my information be kept confidential?',
      a: 'Yes. Your case details are kept confidential and only shared with relevant partner organisations when necessary to help you.',
    },
    {
      q: 'How long does it take to get a response after submitting a case?',
      a: 'Response times vary by case type, but our team reviews every submission as quickly as possible. Use the Check Status page to follow up.',
    },
    {
      q: 'Can I get help in my own language?',
      a: 'Yes. The submission form and translation tool support English, French, Spanish, and Arabic, and our chat assistant responds in the language you write in.',
    },
  ],
  fr: [
    {
      q: "Le service du Bureau des migrants de l'AMA est-il gratuit ?",
      a: "Oui. Tous les services fournis par le Bureau des migrants de l'AMA sont entièrement gratuits.",
    },
    {
      q: 'Mes informations resteront-elles confidentielles ?',
      a: 'Oui. Les détails de votre cas restent confidentiels et ne sont partagés avec des organisations partenaires que si nécessaire pour vous aider.',
    },
    {
      q: 'Combien de temps faut-il pour obtenir une réponse après avoir soumis un cas ?',
      a: "Les délais varient selon le type de cas, mais notre équipe examine chaque soumission aussi rapidement que possible. Utilisez la page Vérifier le statut pour suivre.",
    },
    {
      q: 'Puis-je obtenir de l’aide dans ma propre langue ?',
      a: "Oui. Le formulaire de soumission et l'outil de traduction prennent en charge l'anglais, le français, l'espagnol et l'arabe, et notre assistant de chat répond dans la langue que vous utilisez.",
    },
  ],
  es: [
    {
      q: '¿El servicio de la Oficina de Migrantes de la AMA es gratuito?',
      a: 'Sí. Todos los servicios que ofrece la Oficina de Migrantes de la AMA son completamente gratuitos.',
    },
    {
      q: '¿Mi información se mantendrá confidencial?',
      a: 'Sí. Los detalles de su caso se mantienen confidenciales y solo se comparten con organizaciones asociadas relevantes cuando es necesario para ayudarle.',
    },
    {
      q: '¿Cuánto tiempo tarda en recibir una respuesta después de enviar un caso?',
      a: 'Los tiempos de respuesta varían según el tipo de caso, pero nuestro equipo revisa cada envío lo más rápido posible. Use la página de Consultar Estado para dar seguimiento.',
    },
    {
      q: '¿Puedo obtener ayuda en mi propio idioma?',
      a: 'Sí. El formulario de envío y la herramienta de traducción admiten inglés, francés, español y árabe, y nuestro asistente de chat responde en el idioma en que escriba.',
    },
  ],
  ar: [
    {
      q: 'هل خدمة مكتب المهاجرين التابع لـ AMA مجانية؟',
      a: 'نعم. جميع الخدمات التي يقدمها مكتب المهاجرين التابع لـ AMA مجانية تماماً.',
    },
    {
      q: 'هل ستبقى معلوماتي سرية؟',
      a: 'نعم. تُحفظ تفاصيل حالتك بسرية ولا تُشارك إلا مع المنظمات الشريكة ذات الصلة عند الضرورة لمساعدتك.',
    },
    {
      q: 'كم من الوقت يستغرق الحصول على رد بعد تقديم حالة؟',
      a: 'تختلف أوقات الاستجابة حسب نوع الحالة، لكن فريقنا يراجع كل طلب في أسرع وقت ممكن. استخدم صفحة التحقق من الحالة للمتابعة.',
    },
    {
      q: 'هل يمكنني الحصول على المساعدة بلغتي الخاصة؟',
      a: 'نعم. يدعم نموذج التقديم وأداة الترجمة اللغات الإنجليزية والفرنسية والإسبانية والعربية، ويرد مساعد الدردشة باللغة التي تكتب بها.',
    },
  ],
};

const TABS: TabKey[] = ['gbv', 'rights', 'referral', 'faq'];

export default function ResourcesPage() {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('gbv');

  const tabLabels: Record<TabKey, string> = {
    gbv: t.resources.tabGbv,
    rights: t.resources.tabRights,
    referral: t.resources.tabReferral,
    faq: t.resources.tabFaq,
  };

  function handlePrint() {
    window.print();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ama-green sm:text-4xl">{t.resources.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-ink-mid">{t.resources.intro}</p>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-parchment-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-t-lg px-4 py-2 text-sm font-bold transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-ama-green text-ama-green'
                : 'text-ink-light hover:text-ama-green'
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-md border border-parchment-border px-3 py-1 text-xs font-semibold text-ink-mid"
          >
            {t.resources.printButton}
          </button>
        </div>

        {activeTab === 'gbv' && (
          <div className="mt-4 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-ama-green">{t.resources.gbvWhatTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-mid">{t.resources.gbvWhatBody}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-ama-green">{t.resources.gbvTypesTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-mid">{t.resources.gbvTypesBody}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-ama-green">{t.resources.gbvHelpTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-mid">{t.resources.gbvHelpBody}</p>
            </section>
          </div>
        )}

        {activeTab === 'rights' && (
          <div className="mt-4 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-ama-green">{t.resources.rightsTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-mid">{t.resources.rightsBody}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-ama-green">{t.resources.rightsDeskTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-mid">{t.resources.rightsDeskBody}</p>
            </section>
          </div>
        )}

        {activeTab === 'referral' && (
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {REFERRAL_ORGS.map((org) => (
              <div key={org.name} className="rounded-xl border border-parchment-border p-5">
                <h3 className="text-base font-bold text-ama-green">{org.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-mid">{org.what[language]}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ama-gold">
                  {org.cases[language]}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="mt-4 space-y-4">
            <h2 className="text-xl font-bold text-ama-green">{t.resources.faqTitle}</h2>
            {FAQ_ITEMS[language].map((item) => (
              <div key={item.q} className="rounded-xl bg-ama-green-light p-4">
                <p className="text-sm font-bold text-ink">{item.q}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-mid">{item.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
