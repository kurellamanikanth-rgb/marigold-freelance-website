import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { PriceEstimator } from '@/components/price-estimator'
import { Process } from '@/components/process'
import { Faq } from '@/components/faq'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { ChatWidget } from '@/components/chat-widget'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <PriceEstimator />
        <Process />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  )
}
