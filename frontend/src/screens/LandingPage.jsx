import React from 'react'
import Hero from '@/component/Hero'
import WhyChooseUs from '@/component/WhyChooseUs'
import { MarqueeDemo } from '@/component/MarqueeDemo'
import PricingPage from '@/component/PricingPage'
import Footer from '@/component/Footer'

function LandingPage() {
  return (
    <div>
        <Hero />
        <WhyChooseUs />
        <MarqueeDemo />
        <PricingPage />
        <Footer />
    </div>
  )
}

export default LandingPage
