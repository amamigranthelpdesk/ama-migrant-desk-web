'use client';

import { useCallback, useEffect, useState } from 'react';

export type Language = 'en' | 'fr' | 'es' | 'ar';

export const LANGUAGES: { code: Language; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'ar', label: 'العربية', short: 'AR' },
];

export const LANGUAGE_STORAGE_KEY = 'ama-migrant-desk-language';

export interface Translation {
  nav: {
    home: string;
    submit: string;
    status: string;
    translate: string;
    resources: string;
    portal: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    cardSubmitTitle: string;
    cardSubmitDesc: string;
    cardStatusTitle: string;
    cardStatusDesc: string;
    cardTranslateTitle: string;
    cardTranslateDesc: string;
    cardChatTitle: string;
    cardChatDesc: string;
    getStarted: string;
    heroImage1Alt: string;
    heroImage2Alt: string;
    heroImage3Alt: string;
    statAvailabilityValue: string;
    statAvailabilityLabel: string;
    statLanguagesValue: string;
    statLanguagesLabel: string;
    statResponseValue: string;
    statResponseLabel: string;
    servicesTitle: string;
    servicesSubtitle: string;
    serviceProtectionTitle: string;
    serviceProtectionDesc: string;
    serviceLegalTitle: string;
    serviceLegalDesc: string;
    serviceMedicalTitle: string;
    serviceMedicalDesc: string;
    serviceCounsellingTitle: string;
    serviceCounsellingDesc: string;
    serviceReintegrationTitle: string;
    serviceReintegrationDesc: string;
    serviceDocumentationTitle: string;
    serviceDocumentationDesc: string;
    aboutTitle: string;
    aboutBody: string;
    contactTitle: string;
    contactCallCentre: string;
    contactCallCentreValue: string;
    contactAddress: string;
    contactAddressValue: string;
    contactHours: string;
    contactHoursValue: string;
  };
  submit: {
    title: string;
    intro: string;
    languagesNote: string;
    afterNote: string;
    qrHeading: string;
    qrInstruction: string;
    orDirect: string;
    openFormButton: string;
    nextStepsBody: string;
  };
  form: {
    tabSubmitOnline: string;
    tabQrCode: string;
    tabDirectLink: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    contactNumberLabel: string;
    contactNumberPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    locationLabel: string;
    locationPlaceholder: string;
    modeLabel: string;
    modeTelephone: string;
    modeWalkIn: string;
    modeWebsite: string;
    modeSocialMedia: string;
    genderLabel: string;
    genderFemale: string;
    genderMale: string;
    genderPreferNotToSay: string;
    genderOther: string;
    genderOtherPlaceholder: string;
    nationalityLabel: string;
    migrationStatusLabel: string;
    migrationStatusReturnee: string;
    migrationStatusReturneeDesc: string;
    migrationStatusInTransit: string;
    migrationStatusInTransitDesc: string;
    migrationStatusAsylumSeeker: string;
    migrationStatusAsylumSeekerDesc: string;
    migrationStatusRefugee: string;
    migrationStatusRefugeeDesc: string;
    migrationStatusOther: string;
    migrationStatusOtherPlaceholder: string;
    supportTypeLabel: string;
    supportProtection: string;
    supportMedical: string;
    supportLegal: string;
    supportFinancial: string;
    supportCounselling: string;
    supportDocumentation: string;
    supportReintegration: string;
    supportOther: string;
    supportOtherPlaceholder: string;
    situationLabel: string;
    situationPlaceholder: string;
    otherInfoLabel: string;
    consentLabel: string;
    requiredError: string;
    consentError: string;
    submitCaseButton: string;
    submitting: string;
    successHeading: string;
    successKeepSafe: string;
    successAgentContact: string;
    submitAnotherButton: string;
    errorBanner: string;
    directLinkExplain: string;
    openMsFormButton: string;
  };
  status: {
    title: string;
    intro: string;
    caseIdLabel: string;
    caseIdPlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    submitButton: string;
    loading: string;
    notFound: string;
    resultCaseId: string;
    resultStatus: string;
    resultReferral: string;
    resultNextSteps: string;
    statusMeaningNew: string;
    statusMeaningInReview: string;
    statusMeaningReferred: string;
    statusMeaningEscalated: string;
    statusMeaningResolved: string;
    statusMeaningClosed: string;
  };
  translatePage: {
    title: string;
    intro: string;
    sourceLabel: string;
    targetLabel: string;
    inputPlaceholder: string;
    outputPlaceholder: string;
    translateButton: string;
    copyButton: string;
    copied: string;
    swapButton: string;
    autoDetect: string;
    autoDetectInfo: string;
    voiceTitle: string;
    voiceExplain: string;
    agentLabel: string;
    clientLabel: string;
    speakButton: string;
    listening: string;
    notSupported: string;
  };
  resources: {
    title: string;
    intro: string;
    tabGbv: string;
    tabRights: string;
    tabReferral: string;
    tabFaq: string;
    printButton: string;
    gbvWhatTitle: string;
    gbvWhatBody: string;
    gbvTypesTitle: string;
    gbvTypesBody: string;
    gbvHelpTitle: string;
    gbvHelpBody: string;
    rightsTitle: string;
    rightsBody: string;
    rightsDeskTitle: string;
    rightsDeskBody: string;
    faqTitle: string;
  };
  portal: {
    title: string;
    body: string;
    button: string;
    note: string;
  };
  chatbot: {
    headerTitle: string;
    welcome: string;
    placeholder: string;
    send: string;
    typing: string;
  };
  common: {
    languageLabel: string;
  };
}

const en: Translation = {
  nav: {
    home: 'Home',
    submit: 'Submit a Case',
    status: 'Check Status',
    translate: 'Translate',
    resources: 'Resources',
    portal: 'Agent Portal',
  },
  home: {
    heroTitle: 'Help is here',
    heroSubtitle:
      'The AMA Migrant Desk connects vulnerable migrants in Accra to protection, legal support, medical assistance, and counselling — free, confidential, and in your language.',
    cardSubmitTitle: 'Submit a Case',
    cardSubmitDesc: 'Report your situation securely. An agent will contact you within 2 working days.',
    cardStatusTitle: 'Check My Case',
    cardStatusDesc: 'Track the progress of your submitted case using your reference number.',
    cardTranslateTitle: 'Translation Tool',
    cardTranslateDesc: 'Communicate in English, French, Spanish, Arabic, Twi, Ewe and more.',
    cardChatTitle: 'Get Help Now',
    cardChatDesc: 'Chat with our AI assistant for immediate guidance and information.',
    getStarted: 'Get started',
    heroImage1Alt: 'People receiving assistance',
    heroImage2Alt: 'Community support',
    heroImage3Alt: 'Professional consultation',
    statAvailabilityValue: '24/7',
    statAvailabilityLabel: 'Online form available',
    statLanguagesValue: '4',
    statLanguagesLabel: 'Languages supported',
    statResponseValue: '2 days',
    statResponseLabel: 'Agent response time',
    servicesTitle: 'Our Services',
    servicesSubtitle: 'The AMA Migrant Desk offers free support across six areas.',
    serviceProtectionTitle: 'Protection',
    serviceProtectionDesc: 'Safety from abuse, exploitation, and violence.',
    serviceLegalTitle: 'Legal Support',
    serviceLegalDesc: 'Guidance and referrals for legal issues and documentation.',
    serviceMedicalTitle: 'Medical Assistance',
    serviceMedicalDesc: 'Referrals to health facilities and emergency care.',
    serviceCounsellingTitle: 'Counselling',
    serviceCounsellingDesc: 'Confidential emotional and psychosocial support.',
    serviceReintegrationTitle: 'Reintegration',
    serviceReintegrationDesc: 'Support returning to community life and livelihoods.',
    serviceDocumentationTitle: 'Documentation',
    serviceDocumentationDesc: 'Help obtaining identity and travel documents.',
    aboutTitle: 'About the AMA Migrant Desk',
    aboutBody:
      'The AMA Migrant Desk is operated by the Accra Metropolitan Assembly (AMA) in partnership with IOM Ghana, supporting vulnerable migrants in Accra with case management and referrals. This initiative is implemented by IOM with funding from the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH.',
    contactTitle: 'Contact Us',
    contactCallCentre: 'MTN Call Centre',
    contactCallCentreValue: 'Coming soon',
    contactAddress: 'Desk Address',
    contactAddressValue: 'Accra Metropolitan Assembly, Accra, Ghana',
    contactHours: 'Operating Hours',
    contactHoursValue: 'Monday – Friday, 8:00am – 5:00pm',
  },
  submit: {
    title: 'Submit a Case',
    intro:
      'Use the form below to tell us about your situation. All information is kept confidential and only used to help you.',
    languagesNote: 'This form is available in English, French, Spanish, and Arabic.',
    afterNote: 'After submitting you will receive a case reference number. Keep it safe.',
    qrHeading: 'Scan to Submit Your Case',
    qrInstruction: 'Scan this QR code with your phone camera to open the form in your language.',
    orDirect: 'Or open the form directly:',
    openFormButton: 'Open Form',
    nextStepsBody:
      'After submitting you will receive a case reference number by email if you provided one. An agent will contact you within 2 working days.',
  },
  form: {
    tabSubmitOnline: 'Submit Online',
    tabQrCode: 'QR Code',
    tabDirectLink: 'Direct Link',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'Your full name',
    contactNumberLabel: 'Contact Number',
    contactNumberPlaceholder: 'e.g. 0244 562 693',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your@email.com',
    locationLabel: 'Location / Area of Residence',
    locationPlaceholder: 'e.g. Nima, Accra',
    modeLabel: 'Preferred Mode of Contact',
    modeTelephone: 'Telephone',
    modeWalkIn: 'Walk-in',
    modeWebsite: 'Website',
    modeSocialMedia: 'Social Media',
    genderLabel: 'Gender',
    genderFemale: 'Female',
    genderMale: 'Male',
    genderPreferNotToSay: 'Prefer not to say',
    genderOther: 'Other',
    genderOtherPlaceholder: 'Please specify',
    nationalityLabel: 'Nationality',
    migrationStatusLabel: 'Migration Status',
    migrationStatusReturnee: 'Returnee',
    migrationStatusReturneeDesc: 'I returned to Ghana from another country',
    migrationStatusInTransit: 'In-Transit',
    migrationStatusInTransitDesc: 'I am passing through Ghana',
    migrationStatusAsylumSeeker: 'Asylum Seeker',
    migrationStatusAsylumSeekerDesc: 'I am seeking protection',
    migrationStatusRefugee: 'Refugee',
    migrationStatusRefugeeDesc: 'I have been officially recognised as a refugee',
    migrationStatusOther: 'Other',
    migrationStatusOtherPlaceholder: 'Please describe your migration status',
    supportTypeLabel: 'What type of support do you need?',
    supportProtection: 'Protection from abuse or violence',
    supportMedical: 'Medical assistance',
    supportLegal: 'Legal support',
    supportFinancial: 'Financial assistance',
    supportCounselling: 'Counselling',
    supportDocumentation: 'Documentation help',
    supportReintegration: 'Reintegration support',
    supportOther: 'Other',
    supportOtherPlaceholder: 'Please describe the support you need',
    situationLabel: 'Please describe your situation',
    situationPlaceholder: 'Date/time of incident, location, what happened...',
    otherInfoLabel: 'Any other information',
    consentLabel:
      'I consent to the AMA Migrant Desk collecting and processing my personal information for the purpose of providing migrant assistance services, in accordance with the Ghana Data Protection Act 2012.',
    requiredError: 'Required field',
    consentError: 'You must consent before submitting',
    submitCaseButton: 'Submit Case →',
    submitting: 'Submitting...',
    successHeading: 'Case Submitted Successfully',
    successKeepSafe: 'Please keep this reference number safe.',
    successAgentContact: 'An agent will contact you within 2 working days.',
    submitAnotherButton: 'Submit Another Case',
    errorBanner: 'Failed to submit case. Please try again or use the QR code to submit via the form.',
    directLinkExplain: 'Prefer to fill out the Microsoft Form directly? Use the button below — it opens in a new tab.',
    openMsFormButton: 'Open Microsoft Form →',
  },
  status: {
    title: 'Check Case Status',
    intro: 'Enter your case reference number to check its status.',
    caseIdLabel: 'Case Reference Number',
    caseIdPlaceholder: 'e.g. AMA-MIG-0023 or AMA-AG-001',
    contactLabel: 'Contact Number',
    contactPlaceholder: 'e.g. 0244 562 693',
    submitButton: 'Check My Case Status',
    loading: 'Checking your case…',
    notFound: 'No case found with this reference number. Please check and try again.',
    resultCaseId: 'Case ID',
    resultStatus: 'Status',
    resultReferral: 'Referred to',
    resultNextSteps: 'Next Steps',
    statusMeaningNew: 'Your case has been received and is waiting to be reviewed by our team.',
    statusMeaningInReview: 'Our team is currently reviewing your case.',
    statusMeaningReferred: 'Your case has been referred to a partner organisation for support.',
    statusMeaningEscalated: 'Your case has been escalated for urgent attention.',
    statusMeaningResolved: 'Your case has been resolved.',
    statusMeaningClosed: 'Your case has been closed.',
  },
  translatePage: {
    title: 'Translation Tool',
    intro: 'Translate text between languages, or use real-time voice translation during a visit.',
    sourceLabel: 'From',
    targetLabel: 'To',
    inputPlaceholder: 'Type or paste text here...',
    outputPlaceholder: 'Translation will appear here',
    translateButton: 'Translate',
    copyButton: 'Copy',
    copied: 'Copied!',
    swapButton: 'Swap languages',
    autoDetect: 'Auto-detect (uses browser language)',
    autoDetectInfo:
      'Auto-detect uses your browser language setting as a hint. For best results select your language manually.',
    voiceTitle: 'Real-time Voice Conversation',
    voiceExplain:
      'Use this during walk-in client visits. Speak in your language — the client hears it in theirs.',
    agentLabel: 'Agent',
    clientLabel: 'Client',
    speakButton: 'Speak',
    listening: 'Listening…',
    notSupported: 'Voice translation is not supported in this browser.',
  },
  resources: {
    title: 'Information Resources',
    intro: 'Learn about your rights, gender-based violence support, and referral organisations.',
    tabGbv: 'GBV Information',
    tabRights: 'Your Rights',
    tabReferral: 'Referral Organisations',
    tabFaq: 'FAQ',
    printButton: 'Print',
    gbvWhatTitle: 'What is GBV?',
    gbvWhatBody:
      'Gender-based violence (GBV) is any harmful act directed against a person because of their gender. It includes physical, sexual, emotional, and economic harm, as well as threats and coercion.',
    gbvTypesTitle: 'Types of GBV',
    gbvTypesBody:
      'Common types include domestic violence, sexual assault, human trafficking, forced marriage, denial of resources, and psychological abuse.',
    gbvHelpTitle: 'Where to get help',
    gbvHelpBody:
      'You can contact the AMA Migrant Desk or visit the Resources tab for referral organisations. In an emergency, contact the police or the desk directly.',
    rightsTitle: 'Migrant Rights in Ghana',
    rightsBody:
      'All migrants in Ghana, regardless of status, have the right to safety, dignity, healthcare in emergencies, and protection from exploitation and abuse under Ghanaian and international law.',
    rightsDeskTitle: 'What the desk can do for you',
    rightsDeskBody:
      'The AMA Migrant Desk can help you access protection, legal advice, medical referrals, counselling, reintegration support, and documentation assistance — free of charge.',
    faqTitle: 'Frequently Asked Questions',
  },
  portal: {
    title: 'Authorised Personnel Only',
    body: 'This portal is for AMA Migrant Desk agents and case workers to access the Operations Centre.',
    button: 'Open Operations Centre',
    note: 'Sign in with your provided AMA Migrant Desk account.',
  },
  chatbot: {
    headerTitle: 'AMA Migrant Desk Assistant',
    welcome: "Hello! I'm the AMA Migrant Desk assistant. How can I help you today?",
    placeholder: 'Type your message...',
    send: 'Send',
    typing: 'Typing…',
  },
  common: {
    languageLabel: 'Language',
  },
};

const fr: Translation = {
  nav: {
    home: 'Accueil',
    submit: 'Soumettre un cas',
    status: 'Vérifier le statut',
    translate: 'Traduire',
    resources: 'Ressources',
    portal: 'Portail agent',
  },
  home: {
    heroTitle: "L'aide est là",
    heroSubtitle:
      "Le Bureau des migrants de l'AMA met en relation les migrants vulnérables d'Accra avec la protection, l'aide juridique, l'assistance médicale et le counselling — gratuit, confidentiel, et dans votre langue.",
    cardSubmitTitle: 'Soumettre un cas',
    cardSubmitDesc: "Signalez votre situation en toute sécurité. Un agent vous contactera dans les 2 jours ouvrables.",
    cardStatusTitle: 'Vérifier mon cas',
    cardStatusDesc: 'Suivez l’avancement de votre cas soumis à l’aide de votre numéro de référence.',
    cardTranslateTitle: 'Outil de traduction',
    cardTranslateDesc: 'Communiquez en anglais, français, espagnol, arabe, twi, éwé et plus.',
    cardChatTitle: "Obtenir de l'aide maintenant",
    cardChatDesc: 'Discutez avec notre assistant IA pour des conseils et informations immédiats.',
    getStarted: 'Commencer',
    heroImage1Alt: "Des personnes recevant de l'aide",
    heroImage2Alt: 'Soutien communautaire',
    heroImage3Alt: 'Consultation professionnelle',
    statAvailabilityValue: '24/7',
    statAvailabilityLabel: 'Formulaire en ligne disponible',
    statLanguagesValue: '4',
    statLanguagesLabel: 'Langues prises en charge',
    statResponseValue: '2 jours',
    statResponseLabel: "Délai de réponse d'un agent",
    servicesTitle: 'Nos services',
    servicesSubtitle: "Le Bureau des migrants de l'AMA offre un soutien gratuit dans six domaines.",
    serviceProtectionTitle: 'Protection',
    serviceProtectionDesc: "Sécurité contre les abus, l'exploitation et la violence.",
    serviceLegalTitle: 'Aide juridique',
    serviceLegalDesc: 'Conseils et orientations pour les questions juridiques et les documents.',
    serviceMedicalTitle: 'Assistance médicale',
    serviceMedicalDesc: 'Orientation vers des établissements de santé et soins d’urgence.',
    serviceCounsellingTitle: 'Counselling',
    serviceCounsellingDesc: 'Soutien émotionnel et psychosocial confidentiel.',
    serviceReintegrationTitle: 'Réintégration',
    serviceReintegrationDesc: 'Soutien au retour à la vie communautaire et aux moyens de subsistance.',
    serviceDocumentationTitle: 'Documentation',
    serviceDocumentationDesc: "Aide à l'obtention de documents d'identité et de voyage.",
    aboutTitle: "À propos du Bureau des migrants de l'AMA",
    aboutBody:
      "Le Bureau des migrants de l'AMA est géré par l'Accra Metropolitan Assembly (AMA) en partenariat avec l'OIM Ghana, soutenant les migrants vulnérables d'Accra avec la gestion de cas et les orientations. Cette initiative est mise en œuvre par l'OIM avec le financement de la Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH.",
    contactTitle: 'Contactez-nous',
    contactCallCentre: "Centre d'appels MTN",
    contactCallCentreValue: 'Bientôt disponible',
    contactAddress: 'Adresse du bureau',
    contactAddressValue: 'Accra Metropolitan Assembly, Accra, Ghana',
    contactHours: "Heures d'ouverture",
    contactHoursValue: 'Lundi – Vendredi, 8h00 – 17h00',
  },
  submit: {
    title: 'Soumettre un cas',
    intro:
      'Utilisez le formulaire ci-dessous pour nous parler de votre situation. Toutes les informations restent confidentielles et servent uniquement à vous aider.',
    languagesNote: 'Ce formulaire est disponible en anglais, français, espagnol et arabe.',
    afterNote: 'Après la soumission, vous recevrez un numéro de référence de cas. Conservez-le en lieu sûr.',
    qrHeading: 'Scannez pour soumettre votre cas',
    qrInstruction: 'Scannez ce code avec votre téléphone pour ouvrir le formulaire dans votre langue.',
    orDirect: 'Ou ouvrez le formulaire directement:',
    openFormButton: 'Ouvrir le formulaire',
    nextStepsBody:
      'Après avoir soumis, vous recevrez un numéro de référence par e-mail si vous en avez fourni un. Un agent vous contactera dans les 2 jours ouvrables.',
  },
  form: {
    tabSubmitOnline: 'Soumettre en ligne',
    tabQrCode: 'Code QR',
    tabDirectLink: 'Lien direct',
    fullNameLabel: 'Nom complet',
    fullNamePlaceholder: 'Votre nom complet',
    contactNumberLabel: 'Numéro de contact',
    contactNumberPlaceholder: 'p. ex. 0244 562 693',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'votre@email.com',
    locationLabel: 'Lieu / Zone de résidence',
    locationPlaceholder: 'p. ex. Nima, Accra',
    modeLabel: 'Mode de contact préféré',
    modeTelephone: 'Téléphone',
    modeWalkIn: 'Visite sur place',
    modeWebsite: 'Site web',
    modeSocialMedia: 'Réseaux sociaux',
    genderLabel: 'Genre',
    genderFemale: 'Femme',
    genderMale: 'Homme',
    genderPreferNotToSay: 'Préfère ne pas dire',
    genderOther: 'Autre',
    genderOtherPlaceholder: 'Veuillez préciser',
    nationalityLabel: 'Nationalité',
    migrationStatusLabel: 'Statut migratoire',
    migrationStatusReturnee: 'Rapatrié(e)',
    migrationStatusReturneeDesc: 'Je suis revenu(e) au Ghana depuis un autre pays',
    migrationStatusInTransit: 'En transit',
    migrationStatusInTransitDesc: 'Je suis de passage au Ghana',
    migrationStatusAsylumSeeker: "Demandeur d'asile",
    migrationStatusAsylumSeekerDesc: 'Je recherche une protection',
    migrationStatusRefugee: 'Réfugié(e)',
    migrationStatusRefugeeDesc: 'J’ai été officiellement reconnu(e) comme réfugié(e)',
    migrationStatusOther: 'Autre',
    migrationStatusOtherPlaceholder: 'Veuillez décrire votre statut migratoire',
    supportTypeLabel: "Quel type de soutien vous faut-il ?",
    supportProtection: "Protection contre les abus ou la violence",
    supportMedical: 'Assistance médicale',
    supportLegal: 'Soutien juridique',
    supportFinancial: 'Aide financière',
    supportCounselling: 'Counselling',
    supportDocumentation: 'Aide à la documentation',
    supportReintegration: 'Soutien à la réintégration',
    supportOther: 'Autre',
    supportOtherPlaceholder: 'Veuillez décrire le soutien dont vous avez besoin',
    situationLabel: 'Veuillez décrire votre situation',
    situationPlaceholder: "Date/heure de l'incident, lieu, ce qui s'est passé...",
    otherInfoLabel: 'Toute autre information',
    consentLabel:
      "Je consens à ce que le Bureau des migrants de l'AMA collecte et traite mes informations personnelles dans le but de fournir des services d'assistance aux migrants, conformément à la loi ghanéenne sur la protection des données de 2012.",
    requiredError: 'Champ requis',
    consentError: 'Vous devez donner votre consentement avant de soumettre',
    submitCaseButton: 'Soumettre le cas →',
    submitting: 'Envoi en cours...',
    successHeading: 'Cas soumis avec succès',
    successKeepSafe: 'Veuillez conserver ce numéro de référence en lieu sûr.',
    successAgentContact: 'Un agent vous contactera dans les 2 jours ouvrables.',
    submitAnotherButton: 'Soumettre un autre cas',
    errorBanner:
      "Échec de la soumission du cas. Veuillez réessayer ou utiliser le code QR pour soumettre via le formulaire.",
    directLinkExplain:
      'Vous préférez remplir le formulaire Microsoft directement ? Utilisez le bouton ci-dessous — il s’ouvre dans un nouvel onglet.',
    openMsFormButton: 'Ouvrir le formulaire Microsoft →',
  },
  status: {
    title: 'Vérifier le statut du cas',
    intro: 'Saisissez votre numéro de référence de cas pour vérifier son statut.',
    caseIdLabel: 'Numéro de référence du cas',
    caseIdPlaceholder: 'p. ex. AMA-MIG-0023 ou AMA-AG-001',
    contactLabel: 'Numéro de contact',
    contactPlaceholder: 'p. ex. 0244 562 693',
    submitButton: 'Vérifier le statut de mon cas',
    loading: 'Vérification de votre cas…',
    notFound: 'Aucun cas trouvé avec ce numéro de référence. Veuillez vérifier et réessayer.',
    resultCaseId: 'ID du cas',
    resultStatus: 'Statut',
    resultReferral: 'Référé à',
    resultNextSteps: 'Prochaines étapes',
    statusMeaningNew: 'Votre cas a été reçu et attend d’être examiné par notre équipe.',
    statusMeaningInReview: 'Notre équipe examine actuellement votre cas.',
    statusMeaningReferred: 'Votre cas a été référé à une organisation partenaire pour un soutien.',
    statusMeaningEscalated: 'Votre cas a été escaladé pour une attention urgente.',
    statusMeaningResolved: 'Votre cas a été résolu.',
    statusMeaningClosed: 'Votre cas a été clôturé.',
  },
  translatePage: {
    title: 'Outil de traduction',
    intro: 'Traduisez un texte entre les langues, ou utilisez la traduction vocale en temps réel lors d’une visite.',
    sourceLabel: 'De',
    targetLabel: 'Vers',
    inputPlaceholder: 'Tapez ou collez du texte ici...',
    outputPlaceholder: 'La traduction apparaîtra ici',
    translateButton: 'Traduire',
    copyButton: 'Copier',
    copied: 'Copié !',
    swapButton: 'Inverser les langues',
    autoDetect: 'Détection automatique (langue du navigateur)',
    autoDetectInfo:
      'La détection automatique utilise la langue de votre navigateur comme indice. Pour de meilleurs résultats, sélectionnez votre langue manuellement.',
    voiceTitle: 'Conversation vocale en temps réel',
    voiceExplain:
      'Utilisez ceci lors des visites de clients. Parlez dans votre langue — le client l’entend dans la sienne.',
    agentLabel: 'Agent',
    clientLabel: 'Client',
    speakButton: 'Parler',
    listening: 'Écoute…',
    notSupported: 'La traduction vocale n’est pas prise en charge par ce navigateur.',
  },
  resources: {
    title: "Ressources d'information",
    intro: 'Découvrez vos droits, le soutien en matière de VBG et les organisations de référence.',
    tabGbv: 'Information sur la VBG',
    tabRights: 'Vos droits',
    tabReferral: 'Organisations de référence',
    tabFaq: 'FAQ',
    printButton: 'Imprimer',
    gbvWhatTitle: "Qu'est-ce que la VBG ?",
    gbvWhatBody:
      "La violence basée sur le genre (VBG) est tout acte nuisible dirigé contre une personne en raison de son genre. Elle inclut les préjudices physiques, sexuels, émotionnels et économiques, ainsi que les menaces et la coercition.",
    gbvTypesTitle: 'Types de VBG',
    gbvTypesBody:
      'Les types courants incluent la violence domestique, l’agression sexuelle, la traite des êtres humains, le mariage forcé, le déni de ressources et les abus psychologiques.',
    gbvHelpTitle: 'Où obtenir de l’aide',
    gbvHelpBody:
      "Vous pouvez contacter le Bureau des migrants de l'AMA ou consulter l'onglet Ressources pour les organisations de référence. En cas d'urgence, contactez la police ou le bureau directement.",
    rightsTitle: 'Droits des migrants au Ghana',
    rightsBody:
      "Tous les migrants au Ghana, quel que soit leur statut, ont droit à la sécurité, à la dignité, aux soins de santé d'urgence et à la protection contre l'exploitation et les abus en vertu du droit ghanéen et international.",
    rightsDeskTitle: 'Ce que le bureau peut faire pour vous',
    rightsDeskBody:
      "Le Bureau des migrants de l'AMA peut vous aider à accéder à la protection, aux conseils juridiques, aux orientations médicales, au counselling, au soutien à la réintégration et à l'aide à la documentation — gratuitement.",
    faqTitle: 'Questions fréquemment posées',
  },
  portal: {
    title: 'Personnel autorisé uniquement',
    body: "Ce portail est destiné aux agents et gestionnaires de cas du Bureau des migrants de l'AMA pour accéder au centre d'opérations.",
    button: "Ouvrir le centre d'opérations",
    note: "Connectez-vous avec le compte du Bureau des migrants de l'AMA qui vous a été fourni.",
  },
  chatbot: {
    headerTitle: "Assistant du Bureau des migrants de l'AMA",
    welcome: "Bonjour! Je suis l'assistant du Bureau des migrants de l'AMA. Comment puis-je vous aider?",
    placeholder: 'Tapez votre message...',
    send: 'Envoyer',
    typing: 'En train d’écrire…',
  },
  common: {
    languageLabel: 'Langue',
  },
};

const es: Translation = {
  nav: {
    home: 'Inicio',
    submit: 'Enviar un caso',
    status: 'Consultar estado',
    translate: 'Traducir',
    resources: 'Recursos',
    portal: 'Portal del agente',
  },
  home: {
    heroTitle: 'La ayuda está aquí',
    heroSubtitle:
      'La Oficina de Migrantes de la AMA conecta a los migrantes vulnerables de Accra con protección, apoyo legal, asistencia médica y asesoramiento — gratuito, confidencial y en su idioma.',
    cardSubmitTitle: 'Enviar un caso',
    cardSubmitDesc: 'Reporte su situación de forma segura. Un agente le contactará en 2 días hábiles.',
    cardStatusTitle: 'Consultar mi caso',
    cardStatusDesc: 'Siga el progreso de su caso enviado usando su número de referencia.',
    cardTranslateTitle: 'Herramienta de traducción',
    cardTranslateDesc: 'Comuníquese en inglés, francés, español, árabe, twi, ewé y más.',
    cardChatTitle: 'Obtener ayuda ahora',
    cardChatDesc: 'Chatee con nuestro asistente de IA para obtener orientación e información inmediatas.',
    getStarted: 'Comenzar',
    heroImage1Alt: 'Personas recibiendo asistencia',
    heroImage2Alt: 'Apoyo comunitario',
    heroImage3Alt: 'Consulta profesional',
    statAvailabilityValue: '24/7',
    statAvailabilityLabel: 'Formulario en línea disponible',
    statLanguagesValue: '4',
    statLanguagesLabel: 'Idiomas admitidos',
    statResponseValue: '2 días',
    statResponseLabel: 'Tiempo de respuesta del agente',
    servicesTitle: 'Nuestros servicios',
    servicesSubtitle: 'La Oficina de Migrantes de la AMA ofrece apoyo gratuito en seis áreas.',
    serviceProtectionTitle: 'Protección',
    serviceProtectionDesc: 'Seguridad frente al abuso, la explotación y la violencia.',
    serviceLegalTitle: 'Apoyo legal',
    serviceLegalDesc: 'Orientación y remisiones para asuntos legales y documentación.',
    serviceMedicalTitle: 'Asistencia médica',
    serviceMedicalDesc: 'Remisiones a centros de salud y atención de emergencia.',
    serviceCounsellingTitle: 'Asesoramiento',
    serviceCounsellingDesc: 'Apoyo emocional y psicosocial confidencial.',
    serviceReintegrationTitle: 'Reintegración',
    serviceReintegrationDesc: 'Apoyo para volver a la vida comunitaria y los medios de subsistencia.',
    serviceDocumentationTitle: 'Documentación',
    serviceDocumentationDesc: 'Ayuda para obtener documentos de identidad y viaje.',
    aboutTitle: 'Sobre la Oficina de Migrantes de la AMA',
    aboutBody:
      'La Oficina de Migrantes de la AMA es operada por la Accra Metropolitan Assembly (AMA) en asociación con la OIM Ghana, apoyando a los migrantes vulnerables de Accra con gestión de casos y remisiones. Esta iniciativa es implementada por la OIM con financiamiento de la Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH.',
    contactTitle: 'Contáctenos',
    contactCallCentre: 'Centro de llamadas MTN',
    contactCallCentreValue: 'Próximamente',
    contactAddress: 'Dirección de la oficina',
    contactAddressValue: 'Accra Metropolitan Assembly, Accra, Ghana',
    contactHours: 'Horario de atención',
    contactHoursValue: 'Lunes – Viernes, 8:00am – 5:00pm',
  },
  submit: {
    title: 'Enviar un caso',
    intro:
      'Use el formulario a continuación para contarnos su situación. Toda la información se mantiene confidencial y solo se usa para ayudarle.',
    languagesNote: 'Este formulario está disponible en inglés, francés, español y árabe.',
    afterNote: 'Después de enviarlo, recibirá un número de referencia de caso. Guárdelo en un lugar seguro.',
    qrHeading: 'Escanee para enviar su caso',
    qrInstruction: 'Escanee este código con su teléfono para abrir el formulario en su idioma.',
    orDirect: 'O abra el formulario directamente:',
    openFormButton: 'Abrir formulario',
    nextStepsBody:
      'Después de enviar recibirá un número de referencia por correo electrónico si proporcionó uno. Un agente le contactará en 2 días hábiles.',
  },
  form: {
    tabSubmitOnline: 'Enviar en línea',
    tabQrCode: 'Código QR',
    tabDirectLink: 'Enlace directo',
    fullNameLabel: 'Nombre completo',
    fullNamePlaceholder: 'Su nombre completo',
    contactNumberLabel: 'Número de contacto',
    contactNumberPlaceholder: 'p. ej. 0244 562 693',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'su@email.com',
    locationLabel: 'Ubicación / Área de residencia',
    locationPlaceholder: 'p. ej. Nima, Accra',
    modeLabel: 'Modo de contacto preferido',
    modeTelephone: 'Teléfono',
    modeWalkIn: 'Visita presencial',
    modeWebsite: 'Sitio web',
    modeSocialMedia: 'Redes sociales',
    genderLabel: 'Género',
    genderFemale: 'Mujer',
    genderMale: 'Hombre',
    genderPreferNotToSay: 'Prefiere no decir',
    genderOther: 'Otro',
    genderOtherPlaceholder: 'Por favor especifique',
    nationalityLabel: 'Nacionalidad',
    migrationStatusLabel: 'Estatus migratorio',
    migrationStatusReturnee: 'Retornado/a',
    migrationStatusReturneeDesc: 'Regresé a Ghana desde otro país',
    migrationStatusInTransit: 'En tránsito',
    migrationStatusInTransitDesc: 'Estoy de paso por Ghana',
    migrationStatusAsylumSeeker: 'Solicitante de asilo',
    migrationStatusAsylumSeekerDesc: 'Estoy buscando protección',
    migrationStatusRefugee: 'Refugiado/a',
    migrationStatusRefugeeDesc: 'He sido reconocido/a oficialmente como refugiado/a',
    migrationStatusOther: 'Otro',
    migrationStatusOtherPlaceholder: 'Por favor describa su estatus migratorio',
    supportTypeLabel: '¿Qué tipo de apoyo necesita?',
    supportProtection: 'Protección contra abuso o violencia',
    supportMedical: 'Asistencia médica',
    supportLegal: 'Apoyo legal',
    supportFinancial: 'Asistencia financiera',
    supportCounselling: 'Asesoramiento',
    supportDocumentation: 'Ayuda con documentación',
    supportReintegration: 'Apoyo de reintegración',
    supportOther: 'Otro',
    supportOtherPlaceholder: 'Por favor describa el apoyo que necesita',
    situationLabel: 'Describa su situación',
    situationPlaceholder: 'Fecha/hora del incidente, lugar, qué sucedió...',
    otherInfoLabel: 'Cualquier otra información',
    consentLabel:
      'Doy mi consentimiento para que la Oficina de Migrantes de la AMA recopile y procese mi información personal con el fin de brindar servicios de asistencia a migrantes, de conformidad con la Ley de Protección de Datos de Ghana de 2012.',
    requiredError: 'Campo obligatorio',
    consentError: 'Debe dar su consentimiento antes de enviar',
    submitCaseButton: 'Enviar caso →',
    submitting: 'Enviando...',
    successHeading: 'Caso enviado con éxito',
    successKeepSafe: 'Guarde este número de referencia en un lugar seguro.',
    successAgentContact: 'Un agente le contactará en 2 días hábiles.',
    submitAnotherButton: 'Enviar otro caso',
    errorBanner: 'No se pudo enviar el caso. Intente de nuevo o use el código QR para enviarlo a través del formulario.',
    directLinkExplain:
      '¿Prefiere completar el formulario de Microsoft directamente? Use el botón de abajo — se abre en una nueva pestaña.',
    openMsFormButton: 'Abrir formulario de Microsoft →',
  },
  status: {
    title: 'Consultar estado del caso',
    intro: 'Introduzca su número de referencia de caso para consultar su estado.',
    caseIdLabel: 'Número de referencia del caso',
    caseIdPlaceholder: 'p. ej. AMA-MIG-0023 o AMA-AG-001',
    contactLabel: 'Número de contacto',
    contactPlaceholder: 'p. ej. 0244 562 693',
    submitButton: 'Consultar el estado de mi caso',
    loading: 'Consultando su caso…',
    notFound: 'No se encontró ningún caso con este número de referencia. Verifique e intente de nuevo.',
    resultCaseId: 'ID del caso',
    resultStatus: 'Estado',
    resultReferral: 'Remitido a',
    resultNextSteps: 'Próximos pasos',
    statusMeaningNew: 'Su caso ha sido recibido y espera ser revisado por nuestro equipo.',
    statusMeaningInReview: 'Nuestro equipo está revisando su caso actualmente.',
    statusMeaningReferred: 'Su caso ha sido remitido a una organización asociada para recibir apoyo.',
    statusMeaningEscalated: 'Su caso ha sido escalado para atención urgente.',
    statusMeaningResolved: 'Su caso ha sido resuelto.',
    statusMeaningClosed: 'Su caso ha sido cerrado.',
  },
  translatePage: {
    title: 'Herramienta de traducción',
    intro: 'Traduzca texto entre idiomas, o use la traducción de voz en tiempo real durante una visita.',
    sourceLabel: 'De',
    targetLabel: 'A',
    inputPlaceholder: 'Escriba o pegue el texto aquí...',
    outputPlaceholder: 'La traducción aparecerá aquí',
    translateButton: 'Traducir',
    copyButton: 'Copiar',
    copied: '¡Copiado!',
    swapButton: 'Intercambiar idiomas',
    autoDetect: 'Detección automática (usa el idioma del navegador)',
    autoDetectInfo:
      'La detección automática usa el idioma de su navegador como referencia. Para mejores resultados, seleccione su idioma manualmente.',
    voiceTitle: 'Conversación de voz en tiempo real',
    voiceExplain:
      'Use esto durante las visitas presenciales de clientes. Hable en su idioma — el cliente lo escucha en el suyo.',
    agentLabel: 'Agente',
    clientLabel: 'Cliente',
    speakButton: 'Hablar',
    listening: 'Escuchando…',
    notSupported: 'La traducción de voz no es compatible con este navegador.',
  },
  resources: {
    title: 'Recursos de información',
    intro: 'Conozca sus derechos, el apoyo en violencia de género y las organizaciones de remisión.',
    tabGbv: 'Información sobre VBG',
    tabRights: 'Sus derechos',
    tabReferral: 'Organizaciones de remisión',
    tabFaq: 'Preguntas frecuentes',
    printButton: 'Imprimir',
    gbvWhatTitle: '¿Qué es la VBG?',
    gbvWhatBody:
      'La violencia basada en género (VBG) es cualquier acto dañino dirigido contra una persona debido a su género. Incluye daño físico, sexual, emocional y económico, así como amenazas y coerción.',
    gbvTypesTitle: 'Tipos de VBG',
    gbvTypesBody:
      'Los tipos comunes incluyen violencia doméstica, agresión sexual, trata de personas, matrimonio forzado, negación de recursos y abuso psicológico.',
    gbvHelpTitle: 'Dónde obtener ayuda',
    gbvHelpBody:
      'Puede contactar a la Oficina de Migrantes de la AMA o visitar la pestaña de Recursos para organizaciones de remisión. En una emergencia, contacte a la policía o a la oficina directamente.',
    rightsTitle: 'Derechos de los migrantes en Ghana',
    rightsBody:
      'Todos los migrantes en Ghana, independientemente de su estatus, tienen derecho a la seguridad, la dignidad, la atención médica de emergencia y la protección contra la explotación y el abuso bajo la ley ghanesa e internacional.',
    rightsDeskTitle: 'Qué puede hacer la oficina por usted',
    rightsDeskBody:
      'La Oficina de Migrantes de la AMA puede ayudarle a acceder a protección, asesoría legal, remisiones médicas, asesoramiento, apoyo de reintegración y ayuda con documentación — de forma gratuita.',
    faqTitle: 'Preguntas frecuentes',
  },
  portal: {
    title: 'Solo personal autorizado',
    body: 'Este portal es para que los agentes y trabajadores de casos de la Oficina de Migrantes de la AMA accedan al Centro de Operaciones.',
    button: 'Abrir Centro de Operaciones',
    note: 'Inicie sesión con la cuenta de la Oficina de Migrantes de la AMA que se le proporcionó.',
  },
  chatbot: {
    headerTitle: 'Asistente de la Oficina de Migrantes de la AMA',
    welcome: '¡Hola! Soy el asistente de la Oficina de Migrantes de la AMA. ¿Cómo puedo ayudarte?',
    placeholder: 'Escriba su mensaje...',
    send: 'Enviar',
    typing: 'Escribiendo…',
  },
  common: {
    languageLabel: 'Idioma',
  },
};

const ar: Translation = {
  nav: {
    home: 'الرئيسية',
    submit: 'تقديم حالة',
    status: 'التحقق من الحالة',
    translate: 'ترجمة',
    resources: 'موارد',
    portal: 'بوابة الوكيل',
  },
  home: {
    heroTitle: 'المساعدة هنا',
    heroSubtitle:
      'يربط مكتب المهاجرين التابع لـ AMA المهاجرين الضعفاء في أكرا بالحماية والدعم القانوني والمساعدة الطبية والإرشاد النفسي — مجاناً وسرياً وبلغتك.',
    cardSubmitTitle: 'تقديم حالة',
    cardSubmitDesc: 'أبلغ عن حالتك بأمان. سيتصل بك أحد الموظفين خلال يومي عمل.',
    cardStatusTitle: 'التحقق من حالتي',
    cardStatusDesc: 'تابع تقدم حالتك المقدمة باستخدام الرقم المرجعي الخاص بك.',
    cardTranslateTitle: 'أداة الترجمة',
    cardTranslateDesc: 'تواصل بالإنجليزية والفرنسية والإسبانية والعربية والتوي والإيوي والمزيد.',
    cardChatTitle: 'احصل على المساعدة الآن',
    cardChatDesc: 'تحدث مع مساعدنا الذكي للحصول على إرشادات ومعلومات فورية.',
    getStarted: 'ابدأ الآن',
    heroImage1Alt: 'أشخاص يتلقون المساعدة',
    heroImage2Alt: 'الدعم المجتمعي',
    heroImage3Alt: 'استشارة مهنية',
    statAvailabilityValue: '24/7',
    statAvailabilityLabel: 'النموذج متاح عبر الإنترنت',
    statLanguagesValue: '4',
    statLanguagesLabel: 'لغات مدعومة',
    statResponseValue: 'يومان',
    statResponseLabel: 'وقت استجابة الموظف',
    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'يقدم مكتب المهاجرين التابع لـ AMA دعماً مجانياً في ستة مجالات.',
    serviceProtectionTitle: 'الحماية',
    serviceProtectionDesc: 'الأمان من الإساءة والاستغلال والعنف.',
    serviceLegalTitle: 'الدعم القانوني',
    serviceLegalDesc: 'إرشادات وإحالات للمسائل القانونية والوثائق.',
    serviceMedicalTitle: 'المساعدة الطبية',
    serviceMedicalDesc: 'الإحالة إلى المرافق الصحية والرعاية الطارئة.',
    serviceCounsellingTitle: 'الإرشاد النفسي',
    serviceCounsellingDesc: 'دعم عاطفي ونفسي اجتماعي سري.',
    serviceReintegrationTitle: 'إعادة الإدماج',
    serviceReintegrationDesc: 'دعم العودة إلى الحياة المجتمعية وسبل العيش.',
    serviceDocumentationTitle: 'التوثيق',
    serviceDocumentationDesc: 'المساعدة في الحصول على وثائق الهوية والسفر.',
    aboutTitle: 'عن مكتب المهاجرين التابع لـ AMA',
    aboutBody:
      'يديره مجلس أكرا الحضري (AMA) بالشراكة مع المنظمة الدولية للهجرة في غانا، حيث يدعم المهاجرين الضعفاء في أكرا من خلال إدارة الحالات والإحالات. يتم تنفيذ هذه المبادرة من قبل المنظمة الدولية للهجرة بتمويل من الوكالة الألمانية للتعاون الدولي (GIZ) GmbH.',
    contactTitle: 'اتصل بنا',
    contactCallCentre: 'مركز اتصال MTN',
    contactCallCentreValue: 'قريباً',
    contactAddress: 'عنوان المكتب',
    contactAddressValue: 'مجلس أكرا الحضري، أكرا، غانا',
    contactHours: 'ساعات العمل',
    contactHoursValue: 'الإثنين – الجمعة، 8:00 صباحاً – 5:00 مساءً',
  },
  submit: {
    title: 'تقديم حالة',
    intro: 'استخدم النموذج أدناه لإخبارنا عن وضعك. تُحفظ جميع المعلومات بسرية وتُستخدم فقط لمساعدتك.',
    languagesNote: 'هذا النموذج متاح باللغات الإنجليزية والفرنسية والإسبانية والعربية.',
    afterNote: 'بعد التقديم ستحصل على رقم مرجعي للحالة. احتفظ به في مكان آمن.',
    qrHeading: 'امسح للإبلاغ عن حالتك',
    qrInstruction: 'امسح هذا الرمز بكاميرا هاتفك لفتح النموذج بلغتك.',
    orDirect: 'أو افتح النموذج مباشرة:',
    openFormButton: 'فتح النموذج',
    nextStepsBody:
      'بعد الإرسال ستتلقى رقم مرجعي عبر البريد الإلكتروني إذا قدمته. سيتصل بك أحد الموظفين خلال يومي عمل.',
  },
  form: {
    tabSubmitOnline: 'التقديم عبر الإنترنت',
    tabQrCode: 'رمز QR',
    tabDirectLink: 'رابط مباشر',
    fullNameLabel: 'الاسم الكامل',
    fullNamePlaceholder: 'اسمك الكامل',
    contactNumberLabel: 'رقم الاتصال',
    contactNumberPlaceholder: 'مثال: 0244 562 693',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'your@email.com',
    locationLabel: 'الموقع / منطقة الإقامة',
    locationPlaceholder: 'مثال: نيما، أكرا',
    modeLabel: 'طريقة الاتصال المفضلة',
    modeTelephone: 'الهاتف',
    modeWalkIn: 'زيارة حضورية',
    modeWebsite: 'الموقع الإلكتروني',
    modeSocialMedia: 'وسائل التواصل الاجتماعي',
    genderLabel: 'الجنس',
    genderFemale: 'أنثى',
    genderMale: 'ذكر',
    genderPreferNotToSay: 'أفضل عدم الذكر',
    genderOther: 'آخر',
    genderOtherPlaceholder: 'يرجى التحديد',
    nationalityLabel: 'الجنسية',
    migrationStatusLabel: 'الوضع المتعلق بالهجرة',
    migrationStatusReturnee: 'عائد',
    migrationStatusReturneeDesc: 'عدت إلى غانا من بلد آخر',
    migrationStatusInTransit: 'عابر',
    migrationStatusInTransitDesc: 'أنا مار عبر غانا',
    migrationStatusAsylumSeeker: 'طالب لجوء',
    migrationStatusAsylumSeekerDesc: 'أنا أبحث عن الحماية',
    migrationStatusRefugee: 'لاجئ',
    migrationStatusRefugeeDesc: 'تم الاعتراف بي رسمياً كلاجئ',
    migrationStatusOther: 'آخر',
    migrationStatusOtherPlaceholder: 'يرجى وصف وضعك المتعلق بالهجرة',
    supportTypeLabel: 'ما نوع الدعم الذي تحتاجه؟',
    supportProtection: 'الحماية من الإساءة أو العنف',
    supportMedical: 'المساعدة الطبية',
    supportLegal: 'الدعم القانوني',
    supportFinancial: 'المساعدة المالية',
    supportCounselling: 'الإرشاد النفسي',
    supportDocumentation: 'المساعدة في التوثيق',
    supportReintegration: 'دعم إعادة الإدماج',
    supportOther: 'آخر',
    supportOtherPlaceholder: 'يرجى وصف الدعم الذي تحتاجه',
    situationLabel: 'يرجى وصف وضعك',
    situationPlaceholder: 'تاريخ/وقت الحادثة، الموقع، ما الذي حدث...',
    otherInfoLabel: 'أي معلومات أخرى',
    consentLabel:
      'أوافق على قيام مكتب المهاجرين التابع لـ AMA بجمع ومعالجة معلوماتي الشخصية لغرض تقديم خدمات مساعدة المهاجرين، وفقاً لقانون حماية البيانات الغاني لعام 2012.',
    requiredError: 'حقل مطلوب',
    consentError: 'يجب الموافقة قبل الإرسال',
    submitCaseButton: 'إرسال الحالة ←',
    submitting: 'جارٍ الإرسال...',
    successHeading: 'تم إرسال الحالة بنجاح',
    successKeepSafe: 'يرجى الاحتفاظ بهذا الرقم المرجعي في مكان آمن.',
    successAgentContact: 'سيتصل بك أحد الموظفين خلال يومي عمل.',
    submitAnotherButton: 'إرسال حالة أخرى',
    errorBanner: 'فشل إرسال الحالة. يرجى المحاولة مرة أخرى أو استخدام رمز QR للإرسال عبر النموذج.',
    directLinkExplain: 'هل تفضل تعبئة نموذج مايكروسوفت مباشرة؟ استخدم الزر أدناه — يفتح في علامة تبويب جديدة.',
    openMsFormButton: 'فتح نموذج مايكروسوفت ←',
  },
  status: {
    title: 'التحقق من حالة القضية',
    intro: 'أدخل الرقم المرجعي لحالتك للتحقق من حالتها.',
    caseIdLabel: 'الرقم المرجعي للحالة',
    caseIdPlaceholder: 'مثال: AMA-MIG-0023 أو AMA-AG-001',
    contactLabel: 'رقم الاتصال',
    contactPlaceholder: 'مثال: 0244 562 693',
    submitButton: 'التحقق من حالة قضيتي',
    loading: 'جارٍ التحقق من حالتك…',
    notFound: 'لم يتم العثور على حالة بهذا الرقم المرجعي. يرجى التحقق والمحاولة مرة أخرى.',
    resultCaseId: 'معرّف الحالة',
    resultStatus: 'الحالة',
    resultReferral: 'أُحيلت إلى',
    resultNextSteps: 'الخطوات التالية',
    statusMeaningNew: 'تم استلام حالتك وهي في انتظار المراجعة من قبل فريقنا.',
    statusMeaningInReview: 'يقوم فريقنا حالياً بمراجعة حالتك.',
    statusMeaningReferred: 'تمت إحالة حالتك إلى منظمة شريكة للحصول على الدعم.',
    statusMeaningEscalated: 'تم تصعيد حالتك للحصول على اهتمام عاجل.',
    statusMeaningResolved: 'تم حل حالتك.',
    statusMeaningClosed: 'تم إغلاق حالتك.',
  },
  translatePage: {
    title: 'أداة الترجمة',
    intro: 'ترجم النصوص بين اللغات، أو استخدم الترجمة الصوتية الفورية أثناء الزيارة.',
    sourceLabel: 'من',
    targetLabel: 'إلى',
    inputPlaceholder: 'اكتب أو الصق النص هنا...',
    outputPlaceholder: 'ستظهر الترجمة هنا',
    translateButton: 'ترجم',
    copyButton: 'نسخ',
    copied: 'تم النسخ!',
    swapButton: 'تبديل اللغات',
    autoDetect: 'اكتشاف تلقائي (يستخدم لغة المتصفح)',
    autoDetectInfo: 'يستخدم الاكتشاف التلقائي إعداد لغة متصفحك كمؤشر. للحصول على أفضل النتائج، اختر لغتك يدوياً.',
    voiceTitle: 'محادثة صوتية فورية',
    voiceExplain: 'استخدم هذا أثناء زيارات العملاء الحضورية. تحدث بلغتك — يسمعها العميل بلغته.',
    agentLabel: 'الوكيل',
    clientLabel: 'العميل',
    speakButton: 'تحدث',
    listening: 'يستمع…',
    notSupported: 'الترجمة الصوتية غير مدعومة في هذا المتصفح.',
  },
  resources: {
    title: 'موارد المعلومات',
    intro: 'تعرّف على حقوقك، والدعم المتعلق بالعنف القائم على النوع الاجتماعي، ومنظمات الإحالة.',
    tabGbv: 'معلومات عن العنف القائم على النوع الاجتماعي',
    tabRights: 'حقوقك',
    tabReferral: 'منظمات الإحالة',
    tabFaq: 'الأسئلة الشائعة',
    printButton: 'طباعة',
    gbvWhatTitle: 'ما هو العنف القائم على النوع الاجتماعي؟',
    gbvWhatBody:
      'العنف القائم على النوع الاجتماعي هو أي فعل ضار موجه ضد شخص بسبب نوعه الاجتماعي. يشمل الضرر الجسدي والجنسي والعاطفي والاقتصادي، بالإضافة إلى التهديدات والإكراه.',
    gbvTypesTitle: 'أنواع العنف القائم على النوع الاجتماعي',
    gbvTypesBody:
      'تشمل الأنواع الشائعة العنف المنزلي، والاعتداء الجنسي، والاتجار بالبشر، والزواج القسري، والحرمان من الموارد، والإساءة النفسية.',
    gbvHelpTitle: 'أين تحصل على المساعدة',
    gbvHelpBody:
      'يمكنك الاتصال بمكتب المهاجرين التابع لـ AMA، أو زيارة علامة تبويب الموارد لمنظمات الإحالة. في حالات الطوارئ، اتصل بالشرطة أو بالمكتب مباشرة.',
    rightsTitle: 'حقوق المهاجرين في غانا',
    rightsBody:
      'لجميع المهاجرين في غانا، بغض النظر عن وضعهم، الحق في السلامة والكرامة والرعاية الصحية الطارئة والحماية من الاستغلال والإساءة بموجب القانون الغاني والدولي.',
    rightsDeskTitle: 'ما يمكن أن يفعله المكتب من أجلك',
    rightsDeskBody:
      'يمكن لمكتب المهاجرين التابع لـ AMA مساعدتك في الحصول على الحماية والمشورة القانونية والإحالات الطبية والإرشاد النفسي ودعم إعادة الإدماج والمساعدة في التوثيق — مجاناً.',
    faqTitle: 'الأسئلة الشائعة',
  },
  portal: {
    title: 'للموظفين المصرح لهم فقط',
    body: 'هذه البوابة مخصصة لوكلاء ومسؤولي الحالات في مكتب المهاجرين التابع لـ AMA للوصول إلى مركز العمليات.',
    button: 'فتح مركز العمليات',
    note: 'سجّل الدخول باستخدام الحساب الذي تم توفيره لك من مكتب المهاجرين التابع لـ AMA.',
  },
  chatbot: {
    headerTitle: 'مساعد مكتب المهاجرين التابع لـ AMA',
    welcome: 'مرحباً! أنا مساعد مكتب المهاجرين. كيف يمكنني مساعدتك؟',
    placeholder: 'اكتب رسالتك...',
    send: 'إرسال',
    typing: 'يكتب…',
  },
  common: {
    languageLabel: 'اللغة',
  },
};

export const translations: Record<Language, Translation> = { en, fr, es, ar };

export function getTranslation(lang: Language): Translation {
  return translations[lang] ?? translations.en;
}

export function isRtl(lang: Language): boolean {
  return lang === 'ar';
}

export function useLanguage(): [Language, (lang: Language) => void] {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (stored && translations[stored]) {
      setLanguageState(stored);
    }

    function handleChange(event: Event) {
      const custom = event as CustomEvent<Language>;
      if (custom.detail) {
        setLanguageState(custom.detail);
      }
    }
    window.addEventListener('ama-language-change', handleChange as EventListener);
    return () => window.removeEventListener('ama-language-change', handleChange as EventListener);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    window.dispatchEvent(new CustomEvent<Language>('ama-language-change', { detail: lang }));
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl(lang) ? 'rtl' : 'ltr';
  }, []);

  return [language, setLanguage];
}

export function useTranslation(): { t: Translation; language: Language; setLanguage: (lang: Language) => void } {
  const [language, setLanguage] = useLanguage();
  return { t: getTranslation(language), language, setLanguage };
}
