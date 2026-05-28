export interface Dictionary {
  global: GlobalDict
  home: HomeDict
  services: ServicesDict
  languageAssurance: LanguageAssuranceDict
  experienceRepair: ExperienceRepairDict
  culturalIntelligence: CulturalIntelligenceDict
  about: AboutDict
  contact: ContactDict
}

export interface GlobalDict {
  header: {
    nav: { services: string; blog: string; about: string; contact: string }
    cta: string
    servicesDropdown: {
      allTitle: string
      allDesc: string
      items: { num: string; label: string; desc: string; href: string }[]
    }
  }
  footer: {
    tagline: string
    description: string
    servicesTitle: string
    serviceLinks: { label: string; href: string }[]
    companyTitle: string
    companyLinks: { label: string; href: string }[]
    startTitle: string
    startLink: string
    contactTitle: string
    email: string
    copyright: string
  }
  fab: string
}

export interface HomeDict {
  seo: { title: string; description: string }
  hero: {
    eyebrow: string
    h1: string
    sub: string
    primaryCta: string
    secondaryCta: string
  }
  proofBar: { label: string; text: string }[]
  whyXpandia: {
    eyebrow: string
    headline: string
    body: string
    callout: string
  }
  servicesOverview: {
    eyebrow: string
    headline: string
    intro: string
    cards: {
      num: string
      title: string
      tagline: string
      description: string
      bestFor: string
      coreServices: string
      whatYouGet: string
      cta: string
      href: string
    }[]
  }
  whatYouGet: {
    eyebrow: string
    headline: string
    intro: string
    cards: { title: string; description: string }[]
  }
  method: {
    eyebrow: string
    headline: string
    intro: string
    steps: { num: string; title: string; body: string }[]
  }
  whoWeWorkWith: {
    eyebrow: string
    headline: string
    teams: { title: string; description: string }[]
  }
  aiModels: {
    eyebrow: string
    headline: string
    intro: string
    logos: string[]
  }
  finalCta: {
    eyebrow: string
    headline: string
    body: string
    primaryCta: string
  }
}

export interface ServicesDict {
  seo: { title: string; description: string }
  hero: {
    eyebrow: string
    h1: string
    sub: string
    primaryCta: string
    secondaryCta: string
    supporting: string
  }
  choosePath: {
    eyebrow: string
    headline: string
    intro: string
    cards: {
      title: string
      selection: string
      description: string
      bestWhen: string[]
      cta: string
      href: string
    }[]
  }
  coreServices: {
    eyebrow: string
    headline: string
    intro: string
    services: {
      title: string
      bestFor: string
      outcome: string
      deliverables: string
      startsAt: string
      cta: string
    }[]
  }
  howToChoose: {
    eyebrow: string
    headline: string
    rows: { need: string; choose: string; outcome: string }[]
    supporting: string
  }
  engagementModel: {
    eyebrow: string
    headline: string
    steps: { num: string; title: string; body: string }[]
  }
  finalCta: {
    eyebrow: string
    headline: string
    body: string
    primaryCta: string
  }
}

export interface LanguageAssuranceDict {
  seo: { title: string; description: string }
  hero: {
    eyebrow: string
    h1: string
    sub: string
    supporting: string
    primaryCta: string
    secondaryCta: string
    proofPoints: string[]
  }
  why: {
    eyebrow: string
    headline: string
    body: string
    callout: string
  }
  whatWeEvaluate: {
    eyebrow: string
    headline: string
    intro: string
    cards: { title: string; description: string }[]
  }
  whenToUse: {
    eyebrow: string
    headline: string
    items: string[]
  }
  coreServices: {
    eyebrow: string
    headline: string
    services: { title: string; cta: string }[]
  }
  modules: {
    eyebrow: string
    headline: string
    body: string
    list: string[]
  }
  methodology: {
    eyebrow: string
    headline: string
    steps: { num: string; title: string; body: string }[]
  }
  finalCta: {
    eyebrow: string
    headline: string
    body: string
    primaryCta: string
  }
}

export interface ExperienceRepairDict {
  seo: { title: string; description: string }
  hero: {
    eyebrow: string
    h1: string
    sub: string
    supporting: string
    primaryCta: string
    secondaryCta: string
    proofPoints: { title: string; description: string }[]
  }
  positioning: {
    eyebrow: string
    headline: string
    body: string
    callout: string
  }
  whatWeAdapt: {
    eyebrow: string
    headline: string
    intro: string
    cards: { title: string; description: string }[]
  }
  whenToUse: {
    eyebrow: string
    headline: string
    items: string[]
  }
  coreServices: {
    eyebrow: string
    headline: string
    services: { title: string; cta: string }[]
  }
  methodology: {
    eyebrow: string
    headline: string
    steps: { num: string; title: string; body: string }[]
  }
  finalCta: {
    eyebrow: string
    headline: string
    body: string
    primaryCta: string
  }
}

export interface CulturalIntelligenceDict {
  seo: { title: string; description: string }
  hero: {
    eyebrow: string
    h1: string
    sub: string
    supporting: string
    primaryCta: string
    secondaryCta: string
  }
  why: {
    eyebrow: string
    headline: string
    body: string
    callout: string
  }
  whatWeHelp: {
    eyebrow: string
    headline: string
    items: { title: string; description: string }[]
  }
  whenToUse: {
    eyebrow: string
    headline: string
    items: string[]
  }
  coreServices: {
    eyebrow: string
    headline: string
    services: { title: string; cta: string }[]
  }
  methodology: {
    eyebrow: string
    headline: string
    steps: { num: string; title: string; body: string }[]
  }
  finalCta: {
    eyebrow: string
    headline: string
    body: string
    primaryCta: string
  }
}

export interface AboutDict {
  seo: { title: string; description: string }
  hero: {
    eyebrow: string
    h1: string
    sub: string
    supporting: string
    primaryCta: string
  }
  whoWeAre: {
    eyebrow: string
    headline: string
    body: string
  }
  whyXpandia: {
    eyebrow: string
    headline: string
    intro: string
    values: { title: string; description: string }[]
  }
  founder: {
    eyebrow: string
    headline: string
    body: string
    name: string
    role: string
    bio: string
  }
  howWeWork: {
    eyebrow: string
    headline: string
    steps: { num: string; title: string; body: string }[]
  }
  startingPoints: {
    eyebrow: string
    headline: string
    items: { title: string; price: string; description: string }[]
  }
  trustSignals: {
    eyebrow: string
    items: { label: string; text: string }[]
  }
  finalCta: {
    eyebrow: string
    headline: string
    body: string
    primaryCta: string
  }
}

export interface ContactDict {
  seo: { title: string; description: string }
  hero: {
    eyebrow: string
    h1: string
    sub: string
    email: string
  }
  form: {
    eyebrow: string
    headline: string
    intro: string
    fields: {
      name: string
      workEmail: string
      company: string
      role: string
      website: string
      helpWith: string
      helpOptions: string[]
      audience: string
      audienceOptions: string[]
      timeline: string
      timelineOptions: string[]
      scope: string
      scopeOptions: string[]
      message: string
      messagePlaceholder: string
    }
    submit: string
    microcopy: string
  }
  sidebar: {
    eyebrow: string
    email: string
    quickLinks: { label: string }[]
  }
  nextSteps: {
    eyebrow: string
    headline: string
    steps: { num: string; title: string; body: string }[]
  }
  finalCta: {
    eyebrow: string
    headline: string
    body: string
    primaryCta: string
  }
}
