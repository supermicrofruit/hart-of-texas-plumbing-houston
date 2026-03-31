'use client'

import Link from 'next/link'
import { Phone, DollarSign, ArrowRight, ChevronDown, Info } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CTABanner from '@/components/sections/CTABanner'
import SectionDivider from '@/components/ui/SectionDivider'
import FadeIn, { FadeInStagger } from '@/components/ui/FadeIn'
import businessData from '@/data/business.json'
import { useVisualEffects } from '@/lib/gradientPresets'
import { useState } from 'react'

interface CostGuideProps {
  guide: {
    slug: string
    serviceSlug: string
    headline: string
    intro: string
    factors: Array<{ name: string; description: string }>
    priceRanges: Array<{ item: string; low: string; high: string; note?: string }>
    faqs?: Array<{ question: string; answer: string }>
    lastUpdated: string
  }
  serviceName: string
}

export default function CostGuidePageContent({ guide, serviceName }: CostGuideProps) {
  const effects = useVisualEffects()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const breadcrumbItems = [
    { label: 'Cost Guides', href: '/cost-guides' },
    { label: guide.headline },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted pt-16 pb-28 md:pt-24 md:pb-40">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl">
            <FadeIn direction="up" duration={0.4}>
              <div className="flex items-center space-x-3 mb-4">
                <Badge variant="blue">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Cost Guide
                </Badge>
                <span className="text-sm text-slate-500">Updated {guide.lastUpdated}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {guide.headline}
              </h1>

              <p className="text-lg text-slate-600 mb-8">
                {guide.intro}
              </p>

              <a
                href={`tel:${businessData.phoneRaw}`}
                className={`inline-flex items-center justify-center px-6 py-4 text-white font-semibold rounded-lg transition-colors ${
                  effects.gradientButtons ? 'bg-gradient-theme hover:opacity-90' : 'bg-primary hover:bg-primary/90'
                }`}
              >
                <Phone className="h-5 w-5 mr-2" />
                Get a Free Estimate: {businessData.phone}
              </a>
            </FadeIn>
          </div>
        </Container>
      </section>

      <SectionDivider topColor="gray" bottomColor="white" />

      {/* Price Ranges Table */}
      <section className="pt-16 pb-28 md:pt-24 md:pb-40 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <FadeIn direction="up">
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-8">
                {serviceName} Price Ranges
              </h2>
            </FadeIn>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">Service</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">Low End</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">High End</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.priceRanges.map((range, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{range.item}</td>
                      <td className="px-6 py-4 text-slate-600">{range.low}</td>
                      <td className="px-6 py-4 text-slate-600">{range.high}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{range.note || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-start space-x-2 text-sm text-slate-500">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p>Prices are estimates for the {businessData.address.city} area. Your actual cost depends on the specific job. Call {businessData.phone} for a free, no-obligation estimate.</p>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider topColor="white" bottomColor="gray" />

      {/* Cost Factors */}
      <section className="py-16 md:py-24 bg-muted">
        <Container>
          <FadeIn>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-8 text-center">
              What Affects the Cost
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {guide.factors.map((factor, index) => (
              <FadeInStagger key={index} index={index}>
                <Card className="p-6 h-full">
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{factor.name}</h3>
                  <p className="text-slate-600 text-sm">{factor.description}</p>
                </Card>
              </FadeInStagger>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {guide.faqs && guide.faqs.length > 0 && (
        <>
          <SectionDivider topColor="gray" bottomColor="white" />
          <section className="py-16 md:py-24 bg-white">
            <Container>
              <div className="max-w-3xl mx-auto">
                <FadeIn>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-8 text-center">
                    Frequently Asked Questions
                  </h2>
                </FadeIn>
                <div className="space-y-3">
                  {guide.faqs.map((faq, index) => (
                    <div key={index} className="bg-card rounded-xl border border-border overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="flex items-center justify-between w-full px-6 py-4 text-left"
                      >
                        <span className="font-medium text-foreground pr-4">{faq.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                            openFaq === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openFaq === index && (
                        <div className="px-6 pb-4">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        </>
      )}

      <CTABanner
        title={`Ready to Get a Quote for ${serviceName}?`}
        description={`Contact ${businessData.name} for accurate pricing. Call ${businessData.phone} for a free estimate.`}
      />
    </>
  )
}
