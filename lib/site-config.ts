export const siteConfig = {
  brand: 'Marigold Works',
  owner: 'Your Name',
  tagline: 'Websites designed, maintained, repaired — and any software you need.',
  currency: '£',
  contact: {
    email: 'hello@marigoldworks.co.uk',
    phone: '+44 7700 900123',
    whatsapp: '447700900123',
    hours: 'Mon – Fri, 9:00 AM – 6:00 PM (UK time)',
    location: 'London, United Kingdom',
  },
}

export type ServicePlan = {
  name: string
  price: number
  unit?: string
  features: string[]
}

export type Service = {
  id: string
  title: string
  short: string
  description: string
  deliverables: string[]
  timeline: string
  plans: ServicePlan[]
}

export const services: Service[] = [
  {
    id: 'design',
    title: 'Website Designing',
    short: 'Custom, fast, mobile-first websites built from scratch.',
    description:
      'From a one-page portfolio to a full business website or online store. I handle the design, development, content structure and launch so you get a site that looks sharp and converts visitors into customers.',
    deliverables: [
      'Custom UI design tailored to your brand',
      'Fully responsive on mobile, tablet and desktop',
      'On-page SEO setup and fast load times',
      'Contact forms, WhatsApp and social integration',
      'Domain, hosting and SSL setup',
      'Training video so you can update content',
    ],
    timeline: '1 – 4 weeks depending on scope',
    plans: [
      {
        name: 'Starter',
        price: 495,
        features: ['1–3 pages', 'Mobile responsive', 'Contact form', '1 revision round'],
      },
      {
        name: 'Business',
        price: 1495,
        features: ['Up to 8 pages', 'Basic SEO', 'Blog / CMS', '3 revision rounds'],
      },
      {
        name: 'E-commerce',
        price: 2995,
        features: ['Online store', 'Payment gateway', 'Product management', 'Order emails'],
      },
    ],
  },
  {
    id: 'maintenance',
    title: 'Website Maintenance',
    short: 'Keep your site updated, secure, backed up and fast.',
    description:
      'Monthly care plans so you never worry about your website. I take care of updates, backups, security monitoring, uptime checks and small content changes every month.',
    deliverables: [
      'Plugin, theme and framework updates',
      'Weekly or daily backups',
      'Security scans and malware monitoring',
      'Uptime monitoring with alerts',
      'Monthly content edits included',
      'Monthly performance report',
    ],
    timeline: 'Ongoing — cancel anytime',
    plans: [
      {
        name: 'Basic Care',
        price: 49,
        unit: '/month',
        features: ['Monthly updates', 'Weekly backups', '1 hr content edits'],
      },
      {
        name: 'Pro Care',
        price: 99,
        unit: '/month',
        features: ['Weekly updates', 'Daily backups', '3 hrs content edits', 'Speed tuning'],
      },
      {
        name: 'Business Care',
        price: 199,
        unit: '/month',
        features: ['Priority support', 'Real-time backups', '6 hrs edits', 'Security hardening'],
      },
    ],
  },
  {
    id: 'repair',
    title: 'Website Repair',
    short: 'Broken site, errors, hacked or slow? I fix it fast.',
    description:
      'If your website is down, showing errors, hacked, loading slowly or broken on mobile, I diagnose the root cause and fix it. Most common issues are resolved within 24–48 hours.',
    deliverables: [
      'Error and crash fixing (white screen, 500 errors)',
      'Malware removal and hacked site recovery',
      'Speed optimisation and Core Web Vitals',
      'Mobile layout and browser compatibility fixes',
      'Broken forms, links, payments and emails',
      'Migration to new hosting or domain',
    ],
    timeline: 'Usually 24 – 72 hours',
    plans: [
      {
        name: 'Quick Fix',
        price: 75,
        features: ['Single issue', 'Diagnosis included', 'Fixed in 24–48 hrs'],
      },
      {
        name: 'Full Repair',
        price: 195,
        features: ['Multiple issues', 'Speed optimisation', 'Full site check'],
      },
      {
        name: 'Hacked Site Recovery',
        price: 295,
        features: ['Malware cleanup', 'Security hardening', 'Blacklist removal'],
      },
    ],
  },
  {
    id: 'software',
    title: 'Custom Software',
    short: 'Web apps, dashboards, automations and integrations.',
    description:
      'Any software work you need: custom web applications, admin dashboards, billing or inventory systems, API integrations, automation scripts and bug fixes on existing software projects.',
    deliverables: [
      'Custom web apps and admin dashboards',
      'CRM, billing, booking and inventory systems',
      'API and third-party integrations',
      'Automation scripts and data workflows',
      'Bug fixing on existing codebases',
      'Documentation and handover',
    ],
    timeline: 'Scoped per project',
    plans: [
      {
        name: 'Hourly',
        price: 45,
        unit: '/hour',
        features: ['Bug fixes', 'Small features', 'Consultation'],
      },
      {
        name: 'Small Project',
        price: 995,
        unit: '+',
        features: ['Scripts & automations', 'Simple tools', 'Integrations'],
      },
      {
        name: 'Custom App',
        price: 4995,
        unit: '+',
        features: ['Full web application', 'Database & auth', 'Admin dashboard'],
      },
    ],
  },
]

export const faqs = [
  {
    q: 'How do payments work?',
    a: 'For projects, I take 50% upfront and 50% on completion. Maintenance plans are billed monthly. I accept UK bank transfer, debit/credit card and PayPal. All prices are in GBP.',
  },
  {
    q: 'Do you work with existing websites?',
    a: 'Yes. I regularly maintain and repair sites built on WordPress, Shopify, Wix, React, Next.js, PHP and more.',
  },
  {
    q: 'Will my website work on mobile?',
    a: 'Every site I build is mobile-first and tested on phones, tablets and desktops before launch.',
  },
  {
    q: 'What if I need changes after launch?',
    a: 'Each plan includes revision rounds and 30 days of free bug fixes after launch. After that you can choose a maintenance plan or pay hourly.',
  },
  {
    q: 'Do you provide hosting and domain?',
    a: 'I can set up domain, hosting and SSL for you, or work with your existing provider. Hosting costs are billed separately at actual cost.',
  },
]

export function formatPrice(value: number) {
  return `${siteConfig.currency}${value.toLocaleString('en-GB')}`
}
