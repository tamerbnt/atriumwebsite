export type Language = 'en' | 'fr' | 'ar';

export interface LandingContent {
  nav: {
    problem: string;
    shift: string;
    howItWorks: string;
    verticals: string;
    whyAtrium: string;
    pricing: string;
    bookDemo: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaButton: string;
    scrollHint: string;
  };
  problem: {
    tag: string;
    headline: string;
    subline: string;
    points: Array<{
      title: string;
      desc: string;
    }>;
  };
  shift: {
    tag: string;
    headline: string;
    subline: string;
    points: Array<{
      title: string;
      desc: string;
    }>;
  };
  howItWorks: {
    tag: string;
    headline: string;
    subline: string;
    steps: Array<{
      stepNumber: string;
      title: string;
      caption: string;
      mockType: 'setup' | 'config' | 'operations' | 'branches';
    }>;
  };
  verticals: {
    tag: string;
    headline: string;
    subline: string;
    items: Array<{
      id: string;
      name: string;
      featureLine: string;
      metricPreview: string;
      kpis: Array<{ label: string; value: string }>;
    }>;
  };
  differentiation: {
    tag: string;
    headline: string;
    subline: string;
    pillars: Array<{
      number: string;
      title: string;
      explanation: string;
      proofDetail: string;
    }>;
  };
  dashboard: {
    tag: string;
    headline: string;
    subline: string;
    caption: string;
  };
  pricing: {
    tag: string;
    headline: string;
    subline: string;
    riskReversal: string;
    billingNote: string;
    tiers: Array<{
      name: string;
      price: string;
      period: string;
      desc: string;
      features: string[];
      highlighted?: boolean;
      ctaText: string;
    }>;
  };
  socialProof: {
    tag: string;
    headline: string;
    founderNote: string;
    location: string;
  };
  finalCta: {
    headline: string;
    subline: string;
    ctaButton: string;
  };
  footer: {
    tagline: string;
    byline: string;
    linksHeading: string;
    legalHeading: string;
    contactHeading: string;
    copyright: string;
    contactEmail: string;
    phone: string;
  };
}

export const CONTENT: Record<Language, LandingContent> = {
  en: {
    nav: {
      problem: 'The Reality',
      shift: 'The Shift',
      howItWorks: 'How It Works',
      verticals: 'Built For You',
      whyAtrium: 'Why Atrium',
      pricing: 'Pricing',
      bookDemo: 'Book a Demo',
    },
    hero: {
      badge: 'STOA STUDIO • ALGERIA & MENA',
      headline: 'Run your business like a regional powerhouse — even with a single front desk.',
      subheadline:
        'Built for gym, salon, and restaurant owners who are done chasing staff on WhatsApp, reconciling messy Excel sheets, and guessing their daily revenue.',
      ctaButton: 'Book a 15-Minute Demo',
      scrollHint: 'Scroll to see the shift from scattered chaos to unified control',
    },
    problem: {
      tag: 'SECTION 02 — THE REALITY BEFORE ATRIUM',
      headline: 'Managing day-to-day operations feels like putting out fires on three fronts.',
      subline: 'When tools are fragmented, you spend more time fixing clerical mistakes than growing revenue.',
      points: [
        {
          title: 'Scattered Communications',
          desc: 'Your vital records are trapped in WhatsApp voice notes, loose paper dockets, and corrupted spreadsheets that nobody updates.',
        },
        {
          title: 'Blind Spot Revenue',
          desc: 'Finding out today’s actual cash take requires waiting for manager calls at midnight or driving down to count the register yourself.',
        },
        {
          title: 'Payroll & Till Disputes',
          desc: 'Staff commissions, overtime hours, and cash drawer shortages calculated by hand cause employee friction and cash leaks every month.',
        },
        {
          title: 'The Multi-Branch Trap',
          desc: 'Opening a second or third location feels impossible because your entire operation collapses if you are not physically standing in the room.',
        },
      ],
    },
    shift: {
      tag: 'SECTION 03 — THE UNIFIED SHIFT',
      headline: 'One single system replaces the notebooks, the chat groups, and the panic.',
      subline: 'Every daily operation resolves into a single source of truth across your locations.',
      points: [
        {
          title: 'Everything in One Place',
          desc: 'Client appointments, table orders, stock depletion, and staff shifts live together in one clean, synchronized workspace.',
        },
        {
          title: 'Live Numbers Everywhere',
          desc: 'Open your phone or laptop anywhere and see exact net revenue, active clients, and cash in register update in real time.',
        },
        {
          title: 'Automated Payroll & Receipts',
          desc: 'Staff hours, service tips, and stylist or trainer commissions calculate automatically with one tap, free of disputes.',
        },
        {
          title: 'Multi-Branch Clarity',
          desc: 'Oversee two, five, or ten locations from a single screen with zero guesswork and no need to be in two cities at once.',
        },
      ],
    },
    howItWorks: {
      tag: 'SECTION 04 — FAST SETUP',
      headline: 'Up and running on your current hardware before tomorrow’s morning rush.',
      subline: 'No complicated installations, no expensive proprietary terminals, no technician fees.',
      steps: [
        {
          stepNumber: '01',
          title: 'Tell us your business type during setup.',
          caption: 'Select gym, salon, restaurant, or retail in under sixty seconds.',
          mockType: 'setup',
        },
        {
          stepNumber: '02',
          title: 'The system configures itself — only the tools you need appear.',
          caption: 'No irrelevant menus or clutter. The layout molds to your specific industry workflow.',
          mockType: 'config',
        },
        {
          stepNumber: '03',
          title: 'Run daily operations from one dashboard.',
          caption: 'Checkouts, member check-ins, kitchen dockets, and staff schedules handled in taps.',
          mockType: 'operations',
        },
        {
          stepNumber: '04',
          title: 'Watch real-time numbers, across every branch.',
          caption: 'Instant alerts, cash reconciliations, and inventory warnings piped straight to you.',
          mockType: 'branches',
        },
      ],
    },
    verticals: {
      tag: 'SECTION 05 — VERTICAL PROOF',
      headline: 'Tailored to the exact rhythm of your trade.',
      subline: 'Not generic point-of-sale software stretched thin, but purpose-built workflows for your floor.',
      items: [
        {
          id: 'gym',
          name: 'Gym & Fitness',
          featureLine: 'Automated turnstile check-ins, subscription renewal alerts, and trainer session tracking without front-desk bottlenecks.',
          metricPreview: '98.4% Member Renewal Rate',
          kpis: [
            { label: 'Active Members', value: '418' },
            { label: 'Expiring This Week', value: '23' },
            { label: 'Floor Occupancy', value: '72%' },
          ],
        },
        {
          id: 'salon',
          name: 'Salon & Spa',
          featureLine: 'Chair-by-chair schedule management, stylist commission splits, and automated SMS appointment reminders.',
          metricPreview: 'Zero Double-Bookings',
          kpis: [
            { label: 'Chairs Occupied', value: '6 / 8' },
            { label: 'Stylist Splits', value: 'Automated' },
            { label: 'No-Show Drop', value: '-65%' },
          ],
        },
        {
          id: 'restaurant',
          name: 'Restaurant & Café',
          featureLine: 'Table turnover monitoring, kitchen ticket flow, and raw ingredient stock depletion.',
          metricPreview: '18m Avg Table Turn',
          kpis: [
            { label: 'Open Tables', value: '14 / 18' },
            { label: 'Kitchen Wait Time', value: '11 min' },
            { label: 'Stock Warning', value: 'Coffee Beans (3kg)' },
          ],
        },
        {
          id: 'retail',
          name: 'Retail & Specialty Store',
          featureLine: 'High-speed barcode checkout, minimum stock re-order triggers, and supplier debt balance tracking.',
          metricPreview: 'Real-time Gross Margins',
          kpis: [
            { label: 'Daily SKU Volume', value: '342 items' },
            { label: 'Low Stock Flags', value: '4 items' },
            { label: 'Till Discrepancy', value: '0.00 DZD' },
          ],
        },
      ],
    },
    differentiation: {
      tag: 'SECTION 06 — DIFFERENTIATION',
      headline: 'Built specifically for the realities of local retail and service commerce.',
      subline: 'Why Algerian and regional business owners switch away from generic tools and offline notebooks.',
      pillars: [
        {
          number: '01',
          title: 'Works offline without stalling',
          explanation: 'Your checkout and customer logs continue without internet during connection dropouts, syncing automatically the second you are back online.',
          proofDetail: 'Stores transactions in local SQLite storage; zero lost sales during Algerian telecom or fiber outages.',
        },
        {
          number: '02',
          title: 'One system, every branch',
          explanation: 'Real-time visibility across multiple locations from day one without purchasing separate software licenses or stitching tools together.',
          proofDetail: 'Centralized cloud synchronization lets you switch between Algiers, Oran, or Blida locations with one click.',
        },
        {
          number: '03',
          title: 'Grows with you without breaking',
          explanation: 'Start with one business type and counter, add more terminals, employee permissions, or branch locations later without switching platforms.',
          proofDetail: 'Scales from a single barber chair or café till to a 50-person health club franchise effortlessly.',
        },
      ],
    },
    dashboard: {
      tag: 'SECTION 07 — EXECUTIVE VISIBILITY',
      headline: 'See what matters to you — build your own dashboard from the metrics that matter to your business.',
      subline: 'No cluttered charts you never check. Just clean, live business vitals updated with every customer transaction.',
      caption: 'Drag, reorder, and isolate the exact numbers you need to make decisions before lunch.',
    },
    pricing: {
      tag: 'SECTION 08 — TRANSPARENT TIERS',
      headline: 'Predictable pricing without hidden percentage cuts on your hard-earned revenue.',
      subline: 'Choose the scale that matches your footprint today. Upgrade only when you open your next branch.',
      riskReversal: '14-day free trial on your existing hardware. No long-term contract. Cancel anytime.',
      billingNote: 'Billed in Algerian Dinars (DZD) or regional currency. Cash invoice and bank transfer supported.',
      tiers: [
        {
          name: 'Starter',
          price: '8,500 DZD',
          period: 'per month',
          desc: 'For independent single-location owners wanting complete control of day-to-day operations.',
          features: [
            '1 physical location',
            'Up to 3 staff logins with custom role permissions',
            'Full offline-first POS & record keeping',
            'Real-time daily cash drawer reconciliation',
            'Automated SMS & WhatsApp client notifications',
            'Priority WhatsApp technical support',
          ],
          ctaText: 'Start 14-Day Free Trial',
        },
        {
          name: 'Pro',
          price: '16,000 DZD',
          period: 'per month',
          desc: 'For growing businesses expanding into multiple branches or higher daily transaction volume.',
          features: [
            'Up to 3 branch locations included',
            'Unlimited staff accounts & shift managers',
            'Multi-branch consolidated profit & loss dashboard',
            'Automated payroll, commissions, and tips tally',
            'Raw inventory batch tracking & supplier balances',
            'Direct phone line & remote setup assistance',
          ],
          highlighted: true,
          ctaText: 'Start 14-Day Free Trial',
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: 'tailored setup',
          desc: 'For established regional chains, franchise operators, and large multi-brand hospitality groups.',
          features: [
            'Unlimited branch locations',
            'On-site hardware deployment and staff training',
            'Dedicated database instance with automated offsite backups',
            'Custom hardware integrations (turnstiles, scales, kitchen displays)',
            'Direct SLA with dedicated Stoa Studio engineer',
          ],
          ctaText: 'Contact for Custom Setup',
        },
      ],
    },
    socialProof: {
      tag: 'SECTION 09 — PROVEN ON THE GROUND',
      headline: 'Built side-by-side with real gym, salon, and restaurant owners in Algeria.',
      founderNote:
        '“We spent months sitting at front desks in Algiers, Kouba, and Oran watching real counter bottlenecks. We watched internet connections cut out during peak hours and saw staff argue over paper tip slips. Atrium was engineered directly from those battle-tested lessons by Stoa Studio.”',
      location: 'Engineered in Algiers by Stoa Studio • Tested across active retail floors',
    },
    finalCta: {
      headline: 'Stop running your business out of a WhatsApp thread.',
      subline: 'See Atrium configured for your exact gym, salon, or restaurant in a concise 15-minute screen walkthrough.',
      ctaButton: 'Book a 15-Minute Demo',
    },
    footer: {
      tagline: 'The desktop + cloud operating system for modern service businesses.',
      byline: 'Crafted with precision by Stoa Studio. Algiers, Algeria.',
      linksHeading: 'Platform',
      legalHeading: 'Legal & Trust',
      contactHeading: 'Direct Contact',
      copyright: '© 2026 Atrium / Stoa Studio. All rights reserved.',
      contactEmail: 'contact@stoastudio.dz',
      phone: '+213 (0) 550 92 14 08',
    },
  },

  fr: {
    nav: {
      problem: 'Le Constat',
      shift: 'La Solution',
      howItWorks: 'Fonctionnement',
      verticals: 'Votre Métier',
      whyAtrium: 'Différence',
      pricing: 'Tarifs',
      bookDemo: 'Réserver une Démo',
    },
    hero: {
      badge: 'STOA STUDIO • ALGÉRIE & MENA',
      headline: 'Gérez votre établissement comme une enseigne nationale — même avec une seule caisse.',
      subheadline:
        'Conçu pour les gérants de salles de sport, salons et restaurants qui refusent de dépendre de groupes WhatsApp, de fichiers Excel éparpillés et de reçus papier.',
      ctaButton: 'Réserver une Démo de 15 Min',
      scrollHint: 'Faites défiler pour voir la transition du désordre au contrôle unifié',
    },
    problem: {
      tag: 'SECTION 02 — LA RÉALITÉ AVANT ATRIUM',
      headline: 'Gérer le quotidien ressemble à éteindre des incendies sur trois fronts.',
      subline: 'Quand vos outils sont dispersés, vous perdez votre temps à corriger des erreurs au lieu de développer votre chiffre d’affaires.',
      points: [
        {
          title: 'Données Éparpillées',
          desc: 'Vos informations vitales sont coincées dans des mémos vocaux WhatsApp, des carnets volants et des tableurs jamais à jour.',
        },
        {
          title: 'Visibilité Nulle en Direct',
          desc: 'Connaître les recettes réelles du jour exige d’attendre les appels tardifs du responsable ou de vous déplacer pour compter la caisse.',
        },
        {
          title: 'Litiges de Salaires et de Caisse',
          desc: 'Calculer à la main les commissions et les heures des employés crée des tensions et des pertes financières chaque fin de mois.',
        },
        {
          title: 'Le Piège du Second Local',
          desc: 'Ouvrir une deuxième succursale semble impossible car tout votre établissement dépend de votre présence physique sur place.',
        },
      ],
    },
    shift: {
      tag: 'SECTION 03 — LA TRANSFORMATION UNIFIÉE',
      headline: 'Un seul système remplace les carnets, les groupes de discussion et le stress.',
      subline: 'Toutes vos opérations quotidiennes se rassemblent dans une source de vérité unique.',
      points: [
        {
          title: 'Tout Réuni au Même Endroit',
          desc: 'Rendez-vous clients, commandes en cuisine, état des stocks et planning du personnel synchronisés dans un espace clair.',
        },
        {
          title: 'Chiffres en Direct Partout',
          desc: 'Consultez votre téléphone ou ordinateur où que vous soyez et suivez vos revenus nets et votre caisse en temps réel.',
        },
        {
          title: 'Paie & Reçus Automatisés',
          desc: 'Heures prestées, pourboires et commissions des coiffeurs ou coachs calculés sans aucune erreur de saisie.',
        },
        {
          title: 'Clarté Multi-Succursales',
          desc: 'Supervisez deux, cinq ou dix adresses depuis un seul écran sans avoir besoin de courir entre deux villes.',
        },
      ],
    },
    howItWorks: {
      tag: 'SECTION 04 — MISE EN PLACE RAPIDE',
      headline: 'Opérationnel sur votre matériel actuel avant le coup de feu de demain matin.',
      subline: 'Aucune installation fastidieuse, aucun terminal propriétaire hors de prix, aucun frais de technicien.',
      steps: [
        {
          stepNumber: '01',
          title: 'Indiquez votre secteur d’activité à la configuration.',
          caption: 'Sélectionnez salle de sport, salon, restaurant ou commerce en moins d’une minute.',
          mockType: 'setup',
        },
        {
          stepNumber: '02',
          title: 'Le système s’adapte automatiquement — seuls vos outils utiles apparaissent.',
          caption: 'Zéro menu superflu. L’interface épouse exactement les gestes de votre métier.',
          mockType: 'config',
        },
        {
          stepNumber: '03',
          title: 'Pilotez vos opérations depuis un tableau de bord épuré.',
          caption: 'Encaissements, abonnements, bons de commande et présences gérés en quelques clics.',
          mockType: 'operations',
        },
        {
          stepNumber: '04',
          title: 'Suivez vos indicateurs en direct sur chaque établissement.',
          caption: 'Alertes de caisse, ruptures de stock et bilans envoyés directement sur votre écran.',
          mockType: 'branches',
        },
      ],
    },
    verticals: {
      tag: 'SECTION 05 — SPÉCIFIQUEMENT DÉDIÉ',
      headline: 'Pensé pour le rythme précis de votre activité.',
      subline: 'Pas un logiciel de caisse générique, mais des parcours de travail créés pour votre quotidien.',
      items: [
        {
          id: 'gym',
          name: 'Salles de Sport & Fitness',
          featureLine: 'Accès automatisé aux tourniquets, alertes de renouvellement et suivi des coachs sans file d’attente à l’accueil.',
          metricPreview: '98,4% de Taux de Renouvellement',
          kpis: [
            { label: 'Membres Actifs', value: '418' },
            { label: 'Expirations cette semaine', value: '23' },
            { label: 'Affluence Salle', value: '72%' },
          ],
        },
        {
          id: 'salon',
          name: 'Salons de Coiffure & Spas',
          featureLine: 'Planning par fauteuil, répartition automatique des commissions et rappels de rendez-vous par SMS.',
          metricPreview: 'Zéro Conflit d’Agenda',
          kpis: [
            { label: 'Fauteuils Occupés', value: '6 / 8' },
            { label: 'Commissions', value: 'Automatisées' },
            { label: 'Baisse des lapins', value: '-65%' },
          ],
        },
        {
          id: 'restaurant',
          name: 'Restaurants & Cafés',
          featureLine: 'Rotation des tables en temps réel, bons cuisine immédiats et déduction automatique des ingrédients du stock.',
          metricPreview: '18 min Rotation Moyenne',
          kpis: [
            { label: 'Tables Ouvertes', value: '14 / 18' },
            { label: 'Attente Cuisine', value: '11 min' },
            { label: 'Alerte Ingrédient', value: 'Café Grains (3kg)' },
          ],
        },
        {
          id: 'retail',
          name: 'Commerces & Boutiques',
          featureLine: 'Encaissement ultra-rapide par code-barres, seuils de réapprovisionnement et suivi des dettes fournisseurs.',
          metricPreview: 'Marge Nette en Direct',
          kpis: [
            { label: 'Articles / Jour', value: '342 ventes' },
            { label: 'Stocks Faibles', value: '4 ref.' },
            { label: 'Écart de Caisse', value: '0,00 DZD' },
          ],
        },
      ],
    },
    differentiation: {
      tag: 'SECTION 06 — DIFFÉRENCIATION RÉELLE',
      headline: 'Conçu pour faire face aux contraintes du commerce local.',
      subline: 'Pourquoi les chefs d’entreprise en Algérie abandonnent les logiciels importés et les carnets manuscrits.',
      pillars: [
        {
          number: '01',
          title: 'Fonctionne hors-ligne sans interruption',
          explanation: 'Vos encaissements et registres continuent sans internet en cas de coupure de réseau, puis se synchronisent dès le retour de la connexion.',
          proofDetail: 'Moteur local SQLite ultra-robuste : zéro vente perdue lors des coupures de fibre ou de réseau mobile.',
        },
        {
          number: '02',
          title: 'Un seul système pour tous vos points de vente',
          explanation: 'Visibilité consolidée sur plusieurs adresses dès le premier jour sans acheter des licences multiples ni bricoler des passerelles.',
          proofDetail: 'Basculez instantanément entre vos succursales d’Alger, d’Oran ou de Constantine depuis une interface unique.',
        },
        {
          number: '03',
          title: 'Grandit avec votre entreprise sans changer d’outil',
          explanation: 'Démarrez avec une seule caisse, ajoutez des postes employés, des rayons ou de nouvelles adresses en quelques clics.',
          proofDetail: 'Accompagne sans heurt la croissance d’un barber shop individuel jusqu’à une chaîne de cinq clubs de sport.',
        },
      ],
    },
    dashboard: {
      tag: 'SECTION 07 — VISIBILITÉ STRATÉGIQUE',
      headline: 'Visualisez ce qui compte pour vous — composez votre écran de contrôle selon vos vraies priorités.',
      subline: 'Fini les graphiques inutiles que personne ne lit. Uniquement les constantes vitales de votre entreprise.',
      caption: 'Organisez vos indicateurs préférés pour décider vite avant même la fin du service.',
    },
    pricing: {
      tag: 'SECTION 08 — TARIFS TRANSPARENTS',
      headline: 'Un abonnement fixe et clair sans pourcentage prélevé sur votre chiffre d’affaires.',
      subline: 'Choisissez le niveau qui correspond à votre étape actuelle. Évoluez uniquement lorsque vous ouvrez votre prochaine adresse.',
      riskReversal: 'Essai gratuit de 14 jours sur votre matériel existant. Sans engagement de durée. Résiliation libre.',
      billingNote: 'Facturation en Dinars Algériens (DZD). Facture officielle et virement bancaire disponibles.',
      tiers: [
        {
          name: 'Starter',
          price: '8 500 DZD',
          period: 'par mois',
          desc: 'Pour les gérants d’un établissement unique souhaitant reprendre le contrôle absolu de leurs journées.',
          features: [
            '1 établissement physique',
            'Jusqu’à 3 accès employés avec permissions modulables',
            'Caisse et gestion de fiches 100% hors-ligne',
            'Clôture et réconciliation de caisse quotidienne',
            'Notifications automatiques clients par SMS / WhatsApp',
            'Assistance technique directe via WhatsApp',
          ],
          ctaText: 'Démarrer l’Essai de 14 Jours',
        },
        {
          name: 'Pro',
          price: '16 000 DZD',
          period: 'par mois',
          desc: 'Pour les structures dynamiques ouvrant de nouveaux points de vente avec un volume de clients soutenu.',
          features: [
            'Jusqu’à 3 succursales incluses',
            'Comptes employés et responsables illimités',
            'Tableau de bord consolidé multi-adresses en direct',
            'Calcul automatisé des salaires, pourboires et commissions',
            'Gestion fine des stocks matières premières & fournisseurs',
            'Ligne téléphonique dédiée et assistance au paramétrage',
          ],
          highlighted: true,
          ctaText: 'Démarrer l’Essai de 14 Jours',
        },
        {
          name: 'Enterprise',
          price: 'Sur Mesure',
          period: 'configuration dédiée',
          desc: 'Pour les enseignes régionales, franchises et réseaux d’hôtellerie-restauration à grande échelle.',
          features: [
            'Succursales illimitées',
            'Déploiement sur site et formation complète des équipes',
            'Serveur de base de données dédié avec sauvegardes cryptées',
            'Intégration matériel sur mesure (tourniquets, balances, écrans cuisine)',
            'Contrat de service prioritaire avec un ingénieur Stoa Studio',
          ],
          ctaText: 'Contacter pour Étude Personnalisée',
        },
      ],
    },
    socialProof: {
      tag: 'SECTION 09 — TESTÉ SUR LE TERRAIN',
      headline: 'Développé au contact direct de gérants indépendants à Alger et à Oran.',
      founderNote:
        '« Nous avons passé des semaines derrière les comptoirs à Alger, Kouba et Oran pour observer les vrais blocages. Nous avons vu les connexions couper en plein rush et les employés perdre du temps sur des fiches papier. Atrium a été forgé directement à partir de cette réalité par Stoa Studio. »',
      location: 'Conçu à Alger par Stoa Studio • Éprouvé sur de véritables comptoirs en activité',
    },
    finalCta: {
      headline: 'Cessez de piloter votre entreprise au fil d’une discussion WhatsApp.',
      subline: 'Découvrez Atrium configuré pour votre salle de sport, salon ou restaurant lors d’une démonstration claire de 15 minutes.',
      ctaButton: 'Réserver une Démo de 15 Min',
    },
    footer: {
      tagline: 'Le système d’exploitation moderne pour les entreprises de service.',
      byline: 'Conçu avec rigueur par Stoa Studio. Alger, Algérie.',
      linksHeading: 'Plateforme',
      legalHeading: 'Mentions & Confiance',
      contactHeading: 'Contact Direct',
      copyright: '© 2026 Atrium / Stoa Studio. Tous droits réservés.',
      contactEmail: 'contact@stoastudio.dz',
      phone: '+213 (0) 550 92 14 08',
    },
  },

  ar: {
    nav: {
      problem: 'الواقع الحالي',
      shift: 'الحل الشامل',
      howItWorks: 'طريقة العمل',
      verticals: 'حسب نشاطك',
      whyAtrium: 'لماذا أتريوم',
      pricing: 'الأسعار',
      bookDemo: 'حجز عرض توضيحي',
    },
    hero: {
      badge: 'ستوا ستوديو • الجزائر والشرق الأوسط وشمال أفريقيا',
      headline: 'أدر أعمالك بقوة وسلاسة الشركات الكبرى — حتى لو كنت تدير فرعاً واحداً.',
      subheadline:
        'موجّه لأصحاب القاعات الرياضية، صالونات الحلاقة والتجميل، والمطاعم الذين سئموا تشتت العمل بين مجموعات واتساب، جداول إكسل المعقدة، والفواتير الورقية الضائعة.',
      ctaButton: 'احجز عرضاً توضيحياً (15 دقيقة)',
      scrollHint: 'مرر للأسفل لاكتشاف الانتقال من الفوضى إلى التحكم الشامل',
    },
    problem: {
      tag: 'المحور 02 — الواقع قبل أتريوم',
      headline: 'إدارة العمل اليومي تستهلك طاقتك في حل مشاكل كان يمكن تفاديها.',
      subline: 'عندما تكون أدواتك مشتتة، يضيع وقتك الثمين في تصحيح أخطاء الحسابات بدل زيادة الأرباح.',
      points: [
        {
          title: 'بيانات مشتتة وفوضوية',
          desc: 'سجلاتك المهمة حبيسة رسائل واتساب الصوتية، دفاتر الفواتير الورقية، وجداول إكسل التي لا يحدّثها أحد.',
        },
        {
          title: 'انعدام الرؤية اللحظية',
          desc: 'معرفة المداخيل الحقيقية اليوم تتطلب الانتظار حتى منتصف الليل للاتصال بالمدير أو النزول شخصياً لجرد الصندوق.',
        },
        {
          title: 'خلافات الرواتب والصندوق',
          desc: 'حساب ساعات الموظفين، العمولات ونواقص الصندوق يدوياً يتسبب في نزاعات متكررة وهدر مالي مستمر كل شهر.',
        },
        {
          title: 'فخ التوسع وفتح فروع جديدة',
          desc: 'افتتاح فرع ثانٍ يبدو مخاطرة مرعبة لأن مشروعك بأكمله يتوقف تماماً إذا لم تكن واقفاً بنفسك داخل المحل.',
        },
      ],
    },
    shift: {
      tag: 'المحور 03 — التحول الشامل مع أتريوم',
      headline: 'نظام واحد متكامل ينهي فوضى الدفاتر الورقية، مجموعات الدردشة، والقلق الدائم.',
      subline: 'تتحد كل عملياتك اليومية في لوحة تحكم واحدة موثوقة في جميع فروعك.',
      points: [
        {
          title: 'كل شيء في مكان موحد',
          desc: 'حجوزات الزبائن، طلبات المطعم، جرد السلع ومناوبات العمال تتزامن في بيئة عمل واحدة منظمة وسريعة.',
        },
        {
          title: 'أرقام حية في أي لحظة',
          desc: 'افتح هاتفك أو حاسوبك من أي مكان وشاهد صافي الأرباح، عدد العملاء المتواجدين ورصيد الصندوق لحظة بلحظة.',
        },
        {
          title: 'رواتب وفواتير مؤتمتة',
          desc: 'ساعات العمل، نسب الحلاقين أو المدربين تُحسب تلقائياً بنقرة زر واحدة دون أدنى خطأ أو نقاش.',
        },
        {
          title: 'وضوح تام عبر الفروع',
          desc: 'أشرف على فرعين، خمسة أو عشرة فروع من شاشة واحدة دون الحاجة للتنقل المضني بين المدن.',
        },
      ],
    },
    howItWorks: {
      tag: 'المحور 04 — تشغيل فوري وبسيط',
      headline: 'يعمل على أجهزتك الحالية قبل بدء دوام الغد دون تعقيد.',
      subline: 'لا يتطلب أجهزة باهظة الثمن، لا برامج تثبيت معقدة، ولا رسوم فنيين.',
      steps: [
        {
          stepNumber: '01',
          title: 'اختر نوع نشاطك التجاري أثناء الإعداد الأول.',
          caption: 'حدد قاعة رياضة، صالون، مطعم، أو متجر تجزئة في أقل من دقيقة.',
          mockType: 'setup',
        },
        {
          stepNumber: '02',
          title: 'النظام يجهّز نفسه تلقائياً — تظهر فقط الأدوات التي تحتاجها فعلاً.',
          caption: 'دون قوائم إضافية مشتتة. الواجهة تتكيف فوراً مع طبيعة مهنتك.',
          mockType: 'config',
        },
        {
          stepNumber: '03',
          title: 'أدر معاملاتك اليومية من لوحة واحدة سلسة.',
          caption: 'دخول المشتركين، طلبيات المطبخ، الحجوزات والفواتير تتم بلمسات سريعة.',
          mockType: 'operations',
        },
        {
          stepNumber: '04',
          title: 'شاهد أرقامك الحية ومخزونك في جميع الفروع.',
          caption: 'تنبيهات فورية بنواقص السلع وحركة الصناديق تصل إلى هاتفك مباشرة.',
          mockType: 'branches',
        },
      ],
    },
    verticals: {
      tag: 'المحور 05 — مصمم خصيصاً لمجالك',
      headline: 'مبني ليلائم تماماً وتيرة العمل في قطاعك.',
      subline: 'ليس برنامج كاشير عام، بل حلول دقيقة تراعي أدق تفاصيل نشاطك اليومي.',
      items: [
        {
          id: 'gym',
          name: 'القاعات الرياضية واللياقة',
          featureLine: 'تسجيل دخول تلقائي عبر البوابات، تنبيهات بانتهاء الاشتراكات، ومتابعة حصص المدربين دون طوابير عند الاستقبال.',
          metricPreview: '98.4% نسبة تجديد الاشتراكات',
          kpis: [
            { label: 'الأعضاء النشطين', value: '418' },
            { label: 'تنتهي اشتراكاتهم هذا الأسبوع', value: '23' },
            { label: 'نسبة إشغال القاعة', value: '72%' },
          ],
        },
        {
          id: 'salon',
          name: 'صالونات الحلاقة والتجميل',
          featureLine: 'تنظيم المواعيد حسب كل كرسي، تقسيم نسب وأجور المصففين تلقائياً، ورسائل تذكير للزبائن.',
          metricPreview: 'صفر تداخل في المواعيد',
          kpis: [
            { label: 'الكراسي المشغولة', value: '6 / 8' },
            { label: 'حساب العمولات', value: 'آلي بالكامل' },
            { label: 'انخفاض التغيب', value: '-65%' },
          ],
        },
        {
          id: 'restaurant',
          name: 'المطاعم والمقاهي',
          featureLine: 'متابعة سرعة دوران الطاولات، تمرير الطلبات فوراً للمطبخ، وخصم المكونات بدقة من المخزن.',
          metricPreview: '18 دقيقة متوسط إشغال الطاولة',
          kpis: [
            { label: 'الطاولات النشطة', value: '14 / 18' },
            { label: 'وقت تجهيز الوجبة', value: '11 دقيقة' },
            { label: 'تنبيه مخزون', value: 'حبوب القهوة (3 كغ)' },
          ],
        },
        {
          id: 'retail',
          name: 'المتاجر ونقاط البيع',
          featureLine: 'كاشير سريع عبر الباركود، إشعارات تلقائية بإعادة الطلب عند نقص السلع، ومتابعة ديون الموردين.',
          metricPreview: 'هامش الربح الصافي المباشر',
          kpis: [
            { label: 'مبيعات اليوم', value: '342 صنف' },
            { label: 'سلع قاربت على النفاد', value: '4 أصناف' },
            { label: 'فارق الصندوق', value: '0.00 دج' },
          ],
        },
      ],
    },
    differentiation: {
      tag: 'المحور 06 — الفرق الجوهري',
      headline: 'صُمم خصيصاً لمواكبة التحديات الواقعية للأنشطة التجارية المحلية.',
      subline: 'لماذا يستبدل أصحاب المشاريع في الجزائر البرامج العامة والورق بمنصة أتريوم.',
      pillars: [
        {
          number: '01',
          title: 'يعمل دون إنترنت دون أي توقف',
          explanation: 'تستمر عمليات البيع والفوترة عند انقطاع شبكة الإنترنت أو الاتصال، وتتزامن البيانات تلقائياً وفور عودة الشبكة.',
          proofDetail: 'قاعدة بيانات محلية فائقة الأمان؛ لا مبيعات ضائعة أثناء انقطاعات الألياف البصرية أو شبكة الهاتف.',
        },
        {
          number: '02',
          title: 'نظام واحد لكل فروعك دون عناء',
          explanation: 'رؤية مركزية متكاملة لجميع مواقعك وفروعك من اليوم الأول دون الحاجة لشراء برامج منفصلة أو دمج يدوي.',
          proofDetail: 'تنقل بين بيانات فروع الجزائر، وهران، أو قسنطينة بنقرة واحدة من شاشة واحدة متصلة.',
        },
        {
          number: '03',
          title: 'ينمو معك بسهولة دون تبديل النظام',
          explanation: 'ابدأ بنقطة بيع واحدة، وأضف فروعاً، صلاحيات للموظفين، وأقساماً جديدة مع توسعك دون تغيير برمجيتك.',
          proofDetail: 'يتكيف بسلاسة مع نمو صالون فردي صغير ليواكب سلسلة قاعات رياضية تضم 50 موظفاً.',
        },
      ],
    },
    dashboard: {
      tag: 'المحور 07 — رؤية إدارية واضحة',
      headline: 'شاهد ما يهمك فقط — خصص لوحة معلوماتك وفق المؤشرات المؤثرة في تجارتك.',
      subline: 'وداعاً للرسوم البيانية المحشوة التي لا يقرأها أحد. أرقام حية وواضحة ترشدك للقرار الصائب دائماً.',
      caption: 'رتب عناصر ومؤشرات عملك المفضلة لاتخاذ قرارات سريعة ومربحة كل صباح.',
    },
    pricing: {
      tag: 'المحور 08 — أسعار واضحة ومباشرة',
      headline: 'اشتراك ثابت وشفاف دون أي اقتطاع لنسبة مئوية من أرباحك وعرق جبينك.',
      subline: 'اختر الباقة المناسبة لحجم نشاطك اليوم، وقم بالترقية فقط عندما تفتتح فرعك القادم.',
      riskReversal: 'تجربة مجانية لمدة 14 يوماً على أجهزتك الحالية. لا التزام طويل الأمد. يمكنك الإلغاء في أي وقت.',
      billingNote: 'الدفع بالدينار الجزائري (دج) مع توفير فواتير رسمية ودعم التحويل البنكي أو الدفع نقداً.',
      tiers: [
        {
          name: 'ستارتر (Starter)',
          price: '8,500 دج',
          period: 'شهرياً',
          desc: 'للأنشطة المستقلة في فرع واحد الراغبة في تنظيم محكم لعملياتها اليومية.',
          features: [
            'فرع وموقع تجاري واحد',
            'حتى 3 حسابات للموظفين مع صلاحيات محددة',
            'نظام كاشير وسجلات يعمل 100% بدون إنترنت',
            'جرد وتصفية يومية دقيقة لحسابات الصندوق',
            'تنبيهات تلقائية للزبائن عبر رسائل SMS وواتساب',
            'دعم فني مباشر وسريع عبر واتساب',
          ],
          ctaText: 'ابدأ تجربة مجانية (14 يوماً)',
        },
        {
          name: 'برو (Pro)',
          price: '16,000 دج',
          period: 'شهرياً',
          desc: 'للأنشطة المتنامية التي تدير فروعاً متعددة أو حجماً كبيراً من المعاملات اليومية.',
          features: [
            'يشمل حتى 3 فروع تجارية',
            'حسابات موظفين ومدراء غير محدودة',
            'لوحة موحدة للأرباح والخسائر عبر الفروع لحظياً',
            'حساب آلي للأجور، الإكراميات، وعمولات الحصص',
            'إدارة متقدمة للمخزون ودفعات حسابات الموردين',
            'خط هاتف مباشر ومساعدة في التجهيز الميداني',
          ],
          highlighted: true,
          ctaText: 'ابدأ تجربة مجانية (14 يوماً)',
        },
        {
          name: 'إنتربرايز (Enterprise)',
          price: 'مخصص',
          period: 'حسب المتطلبات',
          desc: 'للشبكات التجارية الكبرى، وسلاسل المطاعم وخدمات الضيافة الممتدة.',
          features: [
            'عدد فروع تجارية غير محدود',
            'تثبيت ميداني وتدريب كامل لطاقم العمل على الأرض',
            'قاعدة بيانات مخصصة مع نسخ احتياطي سحابي مشفر',
            'ربط مخصص مع بوابات الدخول، الموازين وشاشات المطابخ',
            'اتفاقية دعم فني ممتازة مع مهندس مخصص من ستوا ستوديو',
          ],
          ctaText: 'تواصل معنا لعرض مخصص',
        },
      ],
    },
    socialProof: {
      tag: 'المحور 09 — واقع مثبت على الأرض',
      headline: 'تم تطويره بالتعاون الوثيق مع أصحاب قاعات وصالونات ومطاعم في الجزائر.',
      founderNote:
        '«قضينا أشهراً خلف طاولات الاستقبال في الجزائر العاصمة، القبة ووهران لمراقبة الاختناقات اليومية الحقيقية. شاهدنا انقطاع الإنترنت في ساعات الذروة، ونزاعات العمال حول قصاصات الورق. أتريوم صُمم في ستوا ستوديو ليعالج هذه المشكلات بالتحديد.»',
      location: 'صنع في الجزائر من طرف ستوا ستوديو • مجرب على طاولات استقبال حقيقية',
    },
    finalCta: {
      headline: 'توقف عن إدارة عملك وتجارتك عبر رسائل واتساب المشتتة.',
      subline: 'شاهد أتريوم مهيأً تماماً لنشاطك في قاعة رياضة، صالون، أو مطعم خلال عرض توضيحي موجز لمدة 15 دقيقة.',
      ctaButton: 'احجز عرضاً توضيحياً (15 دقيقة)',
    },
    footer: {
      tagline: 'النظام الشامل لإدارة الأنشطة التجارية والخدمية العصرية.',
      byline: 'صنع بإتقان من طرف ستوا ستوديو. الجزائر العاصمة، الجزائر.',
      linksHeading: 'المنصة',
      legalHeading: 'الثقة والقانون',
      contactHeading: 'تواصل مباشر',
      copyright: '© 2026 أتريوم / ستوا ستوديو. جميع الحقوق محفوظة.',
      contactEmail: 'contact@stoastudio.dz',
      phone: '+213 (0) 550 92 14 08',
    },
  },
};
