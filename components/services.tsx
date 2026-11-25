'use client'

import { useState } from 'react'
import { Check, Clock, Code2, Palette, ShieldCheck, Wrench, type LucideIcon } from 'lucide-react'
import { formatPrice, services } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
  design: Palette,
  maintenance: ShieldCheck,
  repair: Wrench,
  software: Code2,
}

export function Services() {
  const [activeId, setActiveId] = useState(services[0].id)
  const active = services.find((s) => s.id === activeId) ?? services[0]

  return (
    <section id="services" className="bg-ink py-20 text-ink-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Services</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Everything your website needs, under one roof.</h2>
        </div>

        <div role="tablist" aria-label="Services" className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = icons[s.id]
            const selected = s.id === activeId
            return (
              <button
                key={s.id}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`panel-${s.id}`}
                onClick={() => setActiveId(s.id)}
                className={cn(
                  'group rounded-2xl border p-5 text-left transition-all',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-ink-foreground/15 hover:border-primary/60 hover:bg-ink-foreground/5',
                )}
              >
                <Icon className={cn('size-6', selected ? 'text-primary-foreground' : 'text-primary')} aria-hidden />
                <span className="mt-4 block font-display text-lg font-semibold">{s.title}</span>
                <span
                  className={cn(
                    'mt-1 block text-sm leading-relaxed',
                    selected ? 'text-primary-foreground/80' : 'text-ink-foreground/60',
                  )}
                >
                  {s.short}
                </span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          key={active.id}
          className="mt-8 grid gap-8 rounded-3xl border border-ink-foreground/15 p-6 animate-in fade-in slide-in-from-bottom-2 duration-300 md:p-10 lg:grid-cols-5"
        >
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold">{active.title}</h3>
            <p className="mt-4 leading-relaxed text-ink-foreground/70">{active.description}</p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
              <Clock className="size-4" aria-hidden />
              {active.timeline}
            </p>
            <ul className="mt-6 space-y-3">
              {active.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-3">
            {active.plans.map((p, i) => (
              <div
                key={p.name}
                className={cn(
                  'flex flex-col rounded-2xl p-5',
                  i === 1 ? 'bg-primary text-primary-foreground' : 'bg-ink-foreground/5',
                )}
              >
                <p className="text-sm font-medium">{p.name}</p>
                <p className="mt-3 font-display text-3xl font-bold">
                  {formatPrice(p.price)}
                  <span className="text-sm font-normal opacity-70">{p.unit}</span>
                </p>
                <p className="text-xs opacity-60">starting price</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={cn(
                    'mt-6 inline-flex h-10 items-center justify-center rounded-full text-sm font-medium transition-colors',
                    i === 1
                      ? 'bg-ink text-ink-foreground hover:bg-ink/85'
                      : 'border border-ink-foreground/20 hover:border-primary hover:text-primary',
                  )}
                >
                  Choose {p.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
