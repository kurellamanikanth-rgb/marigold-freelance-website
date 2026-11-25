import { Clock, Mail, MessageCircle, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export function Contact() {
  const { email, phone, whatsapp, hours } = siteConfig.contact
  const items = [
    { icon: MessageCircle, label: 'WhatsApp', value: phone, href: `https://wa.me/${whatsapp}` },
    { icon: Phone, label: 'Call', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
  ]

  return (
    <section id="contact" className="px-4 pb-20 md:px-6 md:pb-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground md:p-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-5xl">{"Let's build something great together."}</h2>
            <p className="mt-4 max-w-md text-primary-foreground/80">
              New website, a broken one, or a software idea — reach out directly and I&apos;ll reply within a few
              hours.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
              <Clock className="size-4" aria-hidden />
              {hours}
            </p>
          </div>
          <ul className="grid gap-3">
            {items.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 rounded-2xl bg-ink p-5 text-ink-foreground transition-transform hover:-translate-y-0.5"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs text-ink-foreground/60">{label}</span>
                    <span className="block font-medium">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
