import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
  type UIMessage,
} from 'ai'
import { faqs, formatPrice, services, siteConfig } from '@/lib/site-config'

export const maxDuration = 30

const catalog = services
  .map(
    (s) =>
      `## ${s.title}\n${s.description}\nTimeline: ${s.timeline}\nIncludes: ${s.deliverables.join('; ')}\nPlans:\n${s.plans
        .map((p) => `- ${p.name}: ${formatPrice(p.price)}${p.unit ?? ''} (${p.features.join(', ')})`)
        .join('\n')}`,
  )
  .join('\n\n')

const faqText = faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n')

const instructions = `You are Mari, the friendly virtual receptionist for ${siteConfig.brand}, a freelance studio run by ${siteConfig.owner}.
Your job is to welcome new customers, explain services and prices, help them pick the right plan, and collect what they need.

SERVICES AND PRICES (all prices are starting prices in GBP (£); the business is based in the United Kingdom and serves UK clients; final quote depends on scope):
${catalog}

FAQ:
${faqText}

CONTACT DETAILS:
Email: ${siteConfig.contact.email}
Phone / WhatsApp: ${siteConfig.contact.phone}
Hours: ${siteConfig.contact.hours}
Location: ${siteConfig.contact.location}

RULES:
- Be warm, concise and professional. Keep replies short (2-5 sentences or a short list).
- Use plain text. You may use simple "-" bullet lists. Do not use markdown headings, bold or tables.
- Only quote prices listed above. Say they are starting prices and the final quote depends on requirements.
- Ask one clarifying question at a time to understand the customer's needs (type of business, pages, deadline, budget).
- If the customer asks something you cannot answer, wants a custom quote, wants to negotiate, wants to book a call, has an urgent problem, or is unhappy, share the contact details above and suggest they reach out directly.
- Never invent services, discounts, guarantees or deadlines that are not listed.
- Stay on topic. Politely decline unrelated requests.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: 'openai/gpt-5.4-mini',
    instructions,
    messages: await convertToModelMessages(messages.slice(-20)),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}
