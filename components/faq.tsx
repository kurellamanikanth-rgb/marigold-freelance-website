import { Plus } from 'lucide-react'
import { faqs } from '@/lib/site-config'

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Questions, answered.</h2>
          <p className="mt-4 text-muted-foreground">
            Can&apos;t find yours? Ask the receptionist in the bottom corner.
          </p>
        </div>
        <div className="divide-y divide-border rounded-3xl border border-border bg-card lg:col-span-2">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q}
                <Plus className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45" aria-hidden />
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
