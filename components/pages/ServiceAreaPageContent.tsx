'use client'

import Link from 'next/link'
import { Phone, MapPin, Check, ArrowRight, ChevronDown } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CTABanner from '@/components/sections/CTABanner'
import SectionDivider from '@/components/ui/SectionDivider'
import FadeIn from '@/components/ui/FadeIn'
import businessData from '@/data/business.json'
import { useVisualEffects } from '@/lib/gradientPresets'
import { useState } from 'react'

interface ServiceAreaFaq {
  question: string
  answer: string
}

interface ServiceAreaPageProps {
  page: {
    slug: string
    serviceSlug: string
    areaSlug: string
    headline: string
    description: string
    localContent: string
    metaTitle: string
    metaDescription: string
    faqs?: ServiceAreaFaq[]
  }
  service: {
    name: string
    slug: string
    shortDescription?: string
    features?: string[]
    icon?: string
  }
  area: {
    name: string
    slug: string
    state: string
    neighborhoods?: string[]
    landmarks?: string[]
  }
}

export default function ServiceAreaPageContent({ page, service, area }: ServiceAreaPageProps) {
  const effects = useVisualEffects()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: service.name, href: `/services/${service.slug}` },
    { label: `${area.name}, ${area.state}` },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted pt-16 pb-28 md:pt-24 md:pb-40">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="up" duration={0.4}>
              <div className="flex items-center space-x-3 mb-4">
                <Badge variant="blue">
                  <MapPin className="h-3 w-3 mr-1" />
                  {area.name}, {area.state}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {page.headline}
              </h1>

              <p className="text-lg text-slate-600 mb-8">
                {page.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${businessData.phoneRaw}`}
                  className={`inline-flex items-center justify-center px-6 py-4 text-white font-semibold rounded-lg transition-colors ${
                    effects.gradientButtons ? 'bg-gradient-theme hover:opacity-90' : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {businessData.phone}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-4 bg-white text-slate-900 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Get Free Estimate
                </Link>
              </div>
            </FadeIn>

            {/* Info Card */}
            <FadeIn direction="right" delay={0.1} className="lg:pl-8">
              <Card className="p-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                  {service.name} in {area.name}
                </h2>

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-4 mb-6">
                    {service.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={`tel:${businessData.phoneRaw}`}
                  className={`block w-full text-center px-6 py-4 text-white font-semibold rounded-lg transition-colors ${
                    effects.gradientButtons ? 'bg-gradient-theme hover:opacity-90' : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  Call Now: {businessData.phone}
                </a>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </section>

      <SectionDivider topColor="gray" bottomColor="white" />

      {/* Local Content */}
      <section className="pt-16 pb-28 md:pt-24 md:pb-40 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeIn direction="up">
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-6">
                About {service.name} in {area.name}
              </h2>
              <div className="prose prose-slate max-w-none text-lg">
                <p>{page.localContent}</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Neighborhoods */}
      {area.neighborhoods && area.neighborhoods.length > 0 && (
        <>
          <SectionDivider topColor="white" bottomColor="gray" />
          <section className="py-16 md:py-24 bg-muted">
            <Container>
              <FadeIn>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-8 text-center">
                  {service.name} Near You in {area.name}
                </h2>
              </FadeIn>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {area.neighborhoods.map((neighborhood, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 text-center border border-slate-100">
                    <span className="text-slate-700 font-medium">{neighborhood}</span>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        </>
      )}

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <>
          <SectionDivider topColor="gray" bottomColor="white" />
          <section className="py-16 md:py-24 bg-white">
            <Container>
              <div className="max-w-3xl mx-auto">
                <FadeIn>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-8 text-center">
                    Common Questions About {service.name} in {area.name}
                  </h2>
                </FadeIn>
                <div className="space-y-3">
                  {page.faqs.map((faq, index) => (
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

      {/* Related Links */}
      <SectionDivider topColor="white" bottomColor="gray" />
      <section className="py-16 md:py-24 bg-muted">
        <Container>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              More About {service.name}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
            <Link
              href={`/areas/${area.slug}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              All Services in {area.name}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </Container>
      </section>

      <CTABanner
        title={`Need ${service.name} in ${area.name}?`}
        description={`Contact ${businessData.name} today for professional ${service.name.toLowerCase()} in ${area.name}, ${area.state}. Call ${businessData.phone} for a free estimate.`}
      />
    </>
  )
}
