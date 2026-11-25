import Image from 'next/image'
import { ArrowRight, MessageCircle, Star } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const stats = [
  { value: '120+', label: 'Websites delivered' },
  { value: '24h', label: 'Avg. repair time' },
  { value: '4.9', label: 'Client rating' },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-accent px-3 py-1 text-xs font-medium">
            <span className="size-2 rounded-full bg-primary" aria-hidden />
            Available for new projects
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Your website, <span className="text-primary">built right</span> and kept running.
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            {siteConfig.tagline} One freelancer, clear prices, and a receptionist that answers your
            questions any time of day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#estimate"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Get an instant estimate
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#chat"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 font-medium transition-colors hover:bg-muted"
            >
              <MessageCircle className="size-4" />
              Ask the receptionist
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold">{s.value}</dd>
                <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -right-10 -top-10 size-72 rounded-full bg-primary/30 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-xl">
            <Image
              src="/images/hero-workspace.png"
              alt="A freelance developer's desk with a laptop showing a website layout and marigold flowers"
              width={1024}
              height={1024}
              priority
              className="aspect-[4/5] w-full object-cover md:aspect-square"
            />
          </div>
          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg md:-left-8">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-primary text-primary" aria-hidden />
              ))}
            </div>
            <p className="text-sm">
              <span className="font-semibold">{'"Fixed our site in a day."'}</span>
              <span className="block text-xs text-muted-foreground">Retail client, Hyderabad</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
