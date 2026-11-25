'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#estimate', label: 'Pricing' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span aria-hidden className="size-7 rounded-full bg-primary ring-4 ring-primary/25" />
          {siteConfig.brand}
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden h-10 items-center rounded-full bg-ink px-5 text-sm font-medium text-ink-foreground transition-colors hover:bg-ink/85 md:inline-flex"
        >
          Start a project
        </a>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn('border-t border-border/60 px-4 pb-4 md:hidden', open ? 'block' : 'hidden')}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="block py-3 text-base font-medium"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
