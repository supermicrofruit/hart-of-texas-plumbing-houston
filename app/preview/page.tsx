'use client'

import { useState, useMemo, useEffect } from 'react'
import { processContent } from '@/lib/copyEngine'
import {
  getAvailableVerticals,
  type Headlines,
  type Services,
  type FAQs,
} from '@/lib/contentLoader'
import FAQAccordion from '@/components/sections/FAQAccordion'

// Static imports for all verticals — avoids broken dynamic import() client-side
import hvacHeadlines from '@/content/verticals/hvac/headlines.json'
import hvacServices from '@/content/verticals/hvac/services.json'
import hvacFaqs from '@/content/verticals/hvac/faqs.json'
import plumbingHeadlines from '@/content/verticals/plumbing/headlines.json'
import plumbingServices from '@/content/verticals/plumbing/services.json'
import plumbingFaqs from '@/content/verticals/plumbing/faqs.json'
import electricalHeadlines from '@/content/verticals/electrical/headlines.json'
import electricalServices from '@/content/verticals/electrical/services.json'
import electricalFaqs from '@/content/verticals/electrical/faqs.json'
import cleaningHeadlines from '@/content/verticals/cleaning/headlines.json'
import cleaningServices from '@/content/verticals/cleaning/services.json'
import cleaningFaqs from '@/content/verticals/cleaning/faqs.json'
import roofingHeadlines from '@/content/verticals/roofing/headlines.json'
import roofingServices from '@/content/verticals/roofing/services.json'
import roofingFaqs from '@/content/verticals/roofing/faqs.json'
import landscapingHeadlines from '@/content/verticals/landscaping/headlines.json'
import landscapingServices from '@/content/verticals/landscaping/services.json'
import landscapingFaqs from '@/content/verticals/landscaping/faqs.json'

const allContent: Record<string, { headlines: any; services: any; faqs: any }> = {
  hvac: { headlines: hvacHeadlines, services: hvacServices, faqs: hvacFaqs },
  plumbing: { headlines: plumbingHeadlines, services: plumbingServices, faqs: plumbingFaqs },
  electrical: { headlines: electricalHeadlines, services: electricalServices, faqs: electricalFaqs },
  cleaning: { headlines: cleaningHeadlines, services: cleaningServices, faqs: cleaningFaqs },
  roofing: { headlines: roofingHeadlines, services: roofingServices, faqs: roofingFaqs },
  landscaping: { headlines: landscapingHeadlines, services: landscapingServices, faqs: landscapingFaqs },
}

const verticals = getAvailableVerticals()

export default function PreviewPage() {
  const [active, setActive] = useState('hvac')

  // Hide site Header, Footer, and dev tools on preview page via injected CSS
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'preview-hide'
    style.textContent = 'header, footer, [class*="fixed"]:not([class*="sticky"]) { display: none !important; } main { padding: 0 !important; }'
    document.head.appendChild(style)
    return () => { style.remove() }
  }, [])

  const { headlines, services, faqs } = useMemo(() => {
    const raw = allContent[active] || allContent.hvac
    return {
      headlines: processContent(raw.headlines) as Headlines,
      services: processContent(raw.services) as Services,
      faqs: processContent(raw.faqs) as FAQs,
    }
  }, [active])

  const heroCount = headlines?.hero?.variations?.length ?? 0
  const serviceCount = services?.services?.length ?? 0
  const faqCount = faqs?.general?.length ?? 0
  const valuePropCount = headlines?.valueProps?.variations?.length ?? 0

  // Collect non-general FAQ sections
  const faqSections = faqs
    ? Object.entries(faqs).filter(
        ([key, val]) => key !== 'vertical' && key !== 'general' && Array.isArray(val)
      )
    : []

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Dev Toolbar */}
      <div className="sticky top-0 z-50 bg-slate-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-violet-400 font-bold text-sm tracking-wide uppercase">
                Vertical Preview
              </span>
              <span className="text-slate-500">|</span>
              <div className="flex gap-1.5 flex-wrap">
                {verticals.map((v) => (
                  <button
                    key={v.slug}
                    onClick={() => setActive(v.slug)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      active === v.slug
                        ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>{heroCount} headlines</span>
              <span className="text-slate-600">&middot;</span>
              <span>{valuePropCount} value props</span>
              <span className="text-slate-600">&middot;</span>
              <span>{serviceCount} services</span>
              <span className="text-slate-600">&middot;</span>
              <span>{faqCount} FAQs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Headlines */}
        {headlines?.hero?.variations && (
          <section>
            <SectionHeader
              title="Hero Headlines"
              count={heroCount}
              description="A/B testable hero variations with different tones"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {headlines.hero.variations.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {v.tone && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-violet-100 text-violet-700">
                        {v.tone}
                      </span>
                    )}
                    {v.region && v.region !== 'universal' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-700">
                        {v.region}
                      </span>
                    )}
                    <span className="ml-auto text-[10px] text-gray-400 font-mono">{v.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{v.headline}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.subheadline}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Value Props */}
        {headlines?.valueProps?.variations && headlines.valueProps.variations.length > 0 && (
          <section>
            <SectionHeader
              title="Value Propositions"
              count={valuePropCount}
              description="Trust-building feature highlights"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {headlines.valueProps.variations.map((vp, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      {vp.icon}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{vp.title}</h4>
                  <p className="text-sm text-gray-500">{vp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Services */}
        {services?.services && (
          <section>
            <SectionHeader
              title="Services"
              count={serviceCount}
              description="Full service definitions with SEO metadata"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {services.services.map((svc) => (
                <div
                  key={svc.slug}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      {svc.icon}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-blue-100 text-blue-700">
                      {svc.category}
                    </span>
                    {svc.emergency && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-red-100 text-red-700">
                        Emergency
                      </span>
                    )}
                    <span className="ml-auto text-[10px] text-gray-400 font-mono">/{svc.slug}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{svc.name}</h4>
                  <p className="text-sm text-gray-500 mb-3">{svc.shortDescription}</p>

                  {svc.features && svc.features.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        Features
                      </span>
                      <ul className="mt-1 space-y-0.5">
                        {svc.features.map((f, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <span className="text-green-500 mt-0.5 flex-shrink-0">&#10003;</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {svc.benefits && svc.benefits.length > 0 && (
                    <div className="mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        Benefits
                      </span>
                      <ul className="mt-1 space-y-0.5">
                        {svc.benefits.map((b, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <span className="text-violet-500 mt-0.5 flex-shrink-0">&rarr;</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {svc.meta && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        SEO Meta
                      </span>
                      <p className="text-xs font-medium text-blue-800 mt-1">{svc.meta.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{svc.meta.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs - General */}
        {faqs?.general && faqs.general.length > 0 && (
          <section>
            <SectionHeader
              title="FAQs &mdash; General"
              count={faqs.general.length}
              description="Using FAQAccordion component"
            />
            <FAQAccordion
              faqs={faqs.general}
              title=""
              showSchema={false}
              faqStyle="accordion"
            />
          </section>
        )}

        {/* FAQs - Service-specific sections */}
        {faqSections.map(([key, items]) => (
          <section key={key}>
            <SectionHeader
              title={`FAQs \u2014 ${key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}`}
              count={(items as any[]).length}
            />
            <FAQAccordion
              faqs={items as any[]}
              title=""
              showSchema={false}
              faqStyle="accordion"
            />
          </section>
        ))}
      </div>
    </div>
  )
}

function SectionHeader({
  title,
  count,
  description,
}: {
  title: string
  count: number
  description?: string
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-gray-900" dangerouslySetInnerHTML={{ __html: title }} />
        <span className="bg-slate-200 text-slate-600 text-xs font-mono px-2 py-0.5 rounded-full">
          {count}
        </span>
      </div>
      {description && <p className="text-sm text-gray-400 mt-0.5">{description}</p>}
    </div>
  )
}
