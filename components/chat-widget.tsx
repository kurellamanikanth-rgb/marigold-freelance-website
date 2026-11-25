'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { Headset, Mail, MessageCircle, Phone, Send, X } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const suggestions = [
  'How much does a business website cost?',
  'My website is broken, can you fix it?',
  'What do maintenance plans include?',
  'Can you build custom software?',
]

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [showContact, setShowContact] = useState(false)
  const { messages, sendMessage, status, error } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)
  const busy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === '#chat') {
        setOpen(true)
        history.replaceState(null, '', window.location.pathname)
      }
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, showContact])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    sendMessage({ text: trimmed })
    setInput('')
  }

  const { email, phone, whatsapp } = siteConfig.contact

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-primary pl-4 pr-5 font-medium text-primary-foreground shadow-xl ring-4 ring-primary/25 transition-transform hover:-translate-y-0.5"
      >
        {open ? <X className="size-5" aria-hidden /> : <MessageCircle className="size-5" aria-hidden />}
        <span>{open ? 'Close' : 'Chat with Mari'}</span>
      </button>

      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label="Chat with Mari, virtual receptionist"
          className="fixed inset-x-3 bottom-24 z-50 flex h-[min(600px,calc(100dvh-8rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 sm:inset-x-auto sm:right-5 sm:w-[400px]"
        >
          <div className="flex items-center gap-3 bg-ink p-4 text-ink-foreground">
            <span className="relative inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Headset className="size-5" aria-hidden />
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 ring-2 ring-ink" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="font-display font-semibold">Mari</p>
              <p className="text-xs text-ink-foreground/60">Virtual receptionist · replies instantly</p>
            </div>
            <button
              type="button"
              onClick={() => setShowContact((v) => !v)}
              className="rounded-full border border-ink-foreground/20 px-3 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary"
            >
              Talk to a human
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
            <Bubble role="assistant">
              {`Hi there! I'm Mari, the receptionist at ${siteConfig.brand}. I can tell you about our services and prices, or help you figure out what you need. What can I help you with today?`}
            </Bubble>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-left text-xs transition-colors hover:border-primary hover:bg-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m) => (
              <Bubble key={m.id} role={m.role}>
                {m.parts.map((p, i) => (p.type === 'text' ? <span key={i}>{p.text}</span> : null))}
              </Bubble>
            ))}

            {status === 'submitted' && (
              <Bubble role="assistant">
                <span className="inline-flex gap-1" aria-label="Mari is typing">
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                </span>
              </Bubble>
            )}

            {(error || showContact) && (
              <div className="rounded-2xl border border-primary/40 bg-accent p-4 text-sm">
                <p className="font-medium">
                  {error
                    ? "Sorry, I couldn't respond right now. Please contact me directly:"
                    : `Reach ${siteConfig.owner} directly:`}
                </p>
                <div className="mt-3 grid gap-2">
                  <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                    <MessageCircle className="size-4 text-primary" aria-hidden /> WhatsApp {phone}
                  </a>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:underline">
                    <Phone className="size-4 text-primary" aria-hidden /> Call {phone}
                  </a>
                  <a href={`mailto:${email}`} className="flex items-center gap-2 hover:underline">
                    <Mail className="size-4 text-primary" aria-hidden /> {email}
                  </a>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your message
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault()
              }}
              placeholder="Ask about services or prices..."
              autoComplete="off"
              className="h-11 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-50"
            >
              <Send className="size-4" aria-hidden />
              <span className="sr-only">Send</span>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

function Bubble({ role, children }: { role: string; children: React.ReactNode }) {
  const isUser = role === 'user'
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser ? 'rounded-br-md bg-ink text-ink-foreground' : 'rounded-bl-md bg-muted text-foreground',
        )}
      >
        {children}
      </div>
    </div>
  )
}
