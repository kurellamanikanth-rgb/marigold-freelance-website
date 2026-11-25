const steps = [
  { title: 'Chat & discover', text: 'Tell the receptionist or me what you need. We agree on goals, scope and budget.' },
  { title: 'Quote & plan', text: 'You get a fixed quote, timeline and milestones. 50% advance to begin.' },
  { title: 'Design & build', text: 'I design, build and share progress links so you can review at every step.' },
  { title: 'Launch & care', text: 'We go live, you get training, plus 30 days of free fixes and optional care plans.' },
]

export function Process() {
  return (
    <section id="process" className="border-y border-border bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">How it works</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-5xl">Simple process. No surprises.</h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
