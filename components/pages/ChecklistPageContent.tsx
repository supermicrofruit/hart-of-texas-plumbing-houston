'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, CheckCircle, Circle, ArrowRight, Leaf, Sun, CloudSnow, Flower2, Trophy } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CTABanner from '@/components/sections/CTABanner'
import FadeIn, { FadeInStagger } from '@/components/ui/FadeIn'
import businessData from '@/data/business.json'
import { useVisualEffects } from '@/lib/gradientPresets'

const seasonIcons = {
  spring: Flower2,
  summer: Sun,
  fall: Leaf,
  winter: CloudSnow,
}

const seasonColors = {
  spring: 'text-green-600 bg-green-50 border-green-200',
  summer: 'text-amber-600 bg-amber-50 border-amber-200',
  fall: 'text-orange-600 bg-orange-50 border-orange-200',
  winter: 'text-blue-600 bg-blue-50 border-blue-200',
}

const seasonAccent = {
  spring: 'bg-green-500',
  summer: 'bg-amber-500',
  fall: 'bg-orange-500',
  winter: 'bg-blue-500',
}

const priorityColors = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
}

interface ChecklistItem {
  task: string
  description: string
  priority?: 'high' | 'medium' | 'low'
  diy?: boolean
}

interface ChecklistProps {
  checklist: {
    slug: string
    season: 'spring' | 'summer' | 'fall' | 'winter'
    headline: string
    intro: string
    items: ChecklistItem[]
    callToAction: string
  }
}

export default function ChecklistPageContent({ checklist }: ChecklistProps) {
  const effects = useVisualEffects()
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const SeasonIcon = seasonIcons[checklist.season]
  const seasonColor = seasonColors[checklist.season]
  const barColor = seasonAccent[checklist.season]

  const toggleItem = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const progress = Math.round((checked.size / checklist.items.length) * 100)
  const allDone = checked.size === checklist.items.length

  const breadcrumbItems = [
    { label: 'Checklists', href: '/checklists' },
    { label: checklist.headline },
  ]

  return (
    <>
      {/* Sticky Progress Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${seasonColor}`}>
                <SeasonIcon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:inline">
                {checklist.headline}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 sm:w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-900 tabular-nums w-16 text-right">
                {checked.size}/{checklist.items.length}
              </span>
              {allDone && <Trophy className="h-4 w-4 text-amber-500" />}
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted pt-8 pb-12 md:pt-12 md:pb-16">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl">
            <FadeIn direction="up" duration={0.4}>
              <div className="flex items-center space-x-3 mb-4">
                <Badge className={seasonColor}>
                  <SeasonIcon className="h-3 w-3 mr-1" />
                  {checklist.season.charAt(0).toUpperCase() + checklist.season.slice(1)} Checklist
                </Badge>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {checklist.headline}
              </h1>

              <p className="text-base text-slate-600">
                {checklist.intro}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Checklist Items */}
      <section className="py-8 md:py-12 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-3">
            {checklist.items.map((item, index) => {
              const isChecked = checked.has(index)
              return (
                <FadeInStagger key={index} index={index}>
                  <button
                    onClick={() => toggleItem(index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      isChecked
                        ? 'bg-slate-50 border-green-200 ring-1 ring-green-100'
                        : 'bg-white border-slate-200 hover:border-primary/30 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {isChecked ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span
                            className={`text-sm font-semibold ${
                              isChecked ? 'line-through text-slate-400' : 'text-slate-900'
                            }`}
                          >
                            {item.task}
                          </span>
                          {item.priority && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[item.priority]}`}>
                              {item.priority}
                            </span>
                          )}
                          {item.diy && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">
                              DIY
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${isChecked ? 'text-slate-400' : 'text-slate-500'}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </FadeInStagger>
              )
            })}
          </div>

          {/* Completion State */}
          {allDone && (
            <div className="max-w-3xl mx-auto mt-8">
              <Card className="p-6 text-center bg-green-50 border-green-200">
                <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  All done! Your home is ready for {checklist.season}.
                </h2>
                <p className="text-sm text-slate-600">
                  Need professional help with any items? We're a call away.
                </p>
              </Card>
            </div>
          )}

          {/* Need Help CTA */}
          {!allDone && (
            <div className="max-w-3xl mx-auto mt-10">
              <Card className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-1">
                      {checklist.callToAction}
                    </h2>
                    <p className="text-sm text-slate-600">
                      Our team handles the professional items on this list.
                    </p>
                  </div>
                  <a
                    href={`tel:${businessData.phoneRaw}`}
                    className={`inline-flex items-center justify-center px-5 py-3 text-white font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      effects.gradientButtons ? 'bg-gradient-theme hover:opacity-90' : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {businessData.phone}
                  </a>
                </div>
              </Card>
            </div>
          )}
        </Container>
      </section>

      <CTABanner
        title={`Need Help With ${checklist.season.charAt(0).toUpperCase() + checklist.season.slice(1)} Maintenance?`}
        description={`${businessData.name} is here to help. Call ${businessData.phone} to schedule service.`}
      />
    </>
  )
}
