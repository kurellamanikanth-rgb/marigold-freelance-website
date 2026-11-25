'use client'

import { useState } from 'react'
import { formatPrice, siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const projectTypes = [
  { id: 'portfolio', label: 'Portfolio / Personal', base: 7999, perPage: 1500 },
  { id: 'business', label: 'Business website', base: 14999, perPage: 2000 },
  { id: 'store', label: 'Online store', base: 39999, perPage: 2500 },
  { id: 'webapp', label: 'Custom web app', base: 59999, perPage: 4000 },
]

const addOns = [
  { id: 'seo', label: 'Advanced SEO setup', price: 4999 },
  { id: 'content', label: 'Copywriting for pages', price: 5999 },
  { id: 'logo', label: 'Logo & brand kit', price: 3999 },
  { id: 'booking', label: 'Booking / appointments', price: 6999 },
  { id: 'multilang', label: 'Multi-language', price: 7999 },
  { id: 'care', label: '3 months maintenance', price: 5999 },
]

export function PriceEstimator() {
  const [typeId, setTypeId] = useState(projectTypes[1].id)
  const [pages, setPages] = useState(5)
  const [selected, setSelected] = useState<string[]>(['seo'])
  const [rush, setRush] = useState(false)

  const type = projectTypes.find((t) => t.id === typeId)!
  const addOnTotal = addOns.filter((a) => selected.includes(a.id)).reduce((sum, a) => sum + a.price, 0)
  const subtotal = type.base + Math.max(0, pages - 1) * type.perPage + addOnTotal
  const total = Math.round(rush ? subtotal * 1.25 : subtotal)

  const summary = `Hi! I'd like a quote for: ${type.label}, ${pages} pages${
    selected.length ? `, add-ons: ${addOns.filter((a) => selected.includes(a.id)).map((a) => a.label).join(', ')}` : ''
  }${rush ? ', rush delivery' : ''}. Estimate: ${formatPrice(total)}.`

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <section id="estimate" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Instant estimate</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Build your quote in 30 seconds.</h2>
          <p className="mt-4 text-muted-foreground">
            Pick what you need and see a ballpark price instantly. Send it to me and I&apos;ll reply with a
            final quote.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <fieldset>
              <legend className="font-display text-lg font-semibold">1. What are we building?</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {projectTypes.map((t) => (
                  <label
                    key={t.id}
                    className={cn(
                      'flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                      typeId === t.id ? 'border-primary bg-accent' : 'border-border bg-card hover:border-primary/50',
                    )}
                  >
                    <span className="font-medium">{t.label}</span>
                    <span className="text-sm text-muted-foreground">from {formatPrice(t.base)}</span>
                    <input
                      type="radio"
                      name="project-type"
                      value={t.id}
                      checked={typeId === t.id}
                      onChange={() => setTypeId(t.id)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="pages" className="font-display text-lg font-semibold">
                  2. How many pages?
                </label>
                <span className="font-display text-2xl font-bold text-primary">{pages}</span>
              </div>
              <input
                id="pages"
                type="range"
                min={1}
                max={25}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="mt-4 w-full accent-[var(--primary)]"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>25</span>
              </div>
            </div>

            <fieldset>
              <legend className="font-display text-lg font-semibold">3. Any extras?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {addOns.map((a) => {
                  const on = selected.includes(a.id)
                  return (
                    <button
                      key={a.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(a.id)}
                      className={cn(
                        'rounded-full border px-4 py-2 text-sm transition-colors',
                        on
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-card hover:border-primary/50',
                      )}
                    >
                      {a.label} <span className="opacity-70">+{formatPrice(a.price)}</span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={rush}
                onChange={(e) => setRush(e.target.checked)}
                className="size-5 accent-[var(--primary)]"
              />
              <span>
                <span className="font-medium">Rush delivery</span>{' '}
                <span className="text-sm text-muted-foreground">(half the timeline, +25%)</span>
              </span>
            </label>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-ink p-6 text-ink-foreground md:p-8">
              <p className="text-sm text-ink-foreground/60">Estimated total</p>
              <p className="mt-2 font-display text-5xl font-bold text-primary" aria-live="polite">
                {formatPrice(total)}
              </p>
              <dl className="mt-6 space-y-2 border-t border-ink-foreground/15 pt-6 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-foreground/60">{type.label}</dt>
                  <dd>{formatPrice(type.base)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-foreground/60">Extra pages ({Math.max(0, pages - 1)})</dt>
                  <dd>{formatPrice(Math.max(0, pages - 1) * type.perPage)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-foreground/60">Add-ons ({selected.length})</dt>
                  <dd>{formatPrice(addOnTotal)}</dd>
                </div>
                {rush && (
                  <div className="flex justify-between">
                    <dt className="text-ink-foreground/60">Rush (+25%)</dt>
                    <dd>{formatPrice(total - subtotal)}</dd>
                  </div>
                )}
              </dl>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(summary)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Send this quote on WhatsApp
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent('Quote request')}&body=${encodeURIComponent(summary)}`}
                className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full border border-ink-foreground/20 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                Or send by email
              </a>
              <p className="mt-4 text-xs text-ink-foreground/50">
                Ballpark estimate. Final price is confirmed after a short call.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
