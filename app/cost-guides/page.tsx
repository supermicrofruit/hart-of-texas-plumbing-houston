import { Metadata } from 'next'
import Link from 'next/link'
import { DollarSign, ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import businessData from '@/data/business.json'
import costGuidesData from '@/data/cost-guides.json'
import servicesData from '@/data/services.json'
import { generateDynamicMetadata } from '@/lib/seo'

export function generateMetadata(): Metadata {
  return generateDynamicMetadata({
    title: `Cost Guides | ${businessData.name}`,
    description: `Get pricing information for our services in ${businessData.address.city}, ${businessData.address.state}. Transparent pricing from ${businessData.name}.`,
    path: '/cost-guides',
  })
}

export default function CostGuidesIndex() {
  const guides = costGuidesData.guides || []

  if (guides.length === 0) {
    return null
  }

  return (
    <section className="pt-16 pb-28 md:pt-24 md:pb-40">
      <Container>
        <div className="text-center mb-12">
          <Badge variant="blue" className="mb-4">
            <DollarSign className="h-3 w-3 mr-1" />
            Pricing Info
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Cost Guides
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transparent pricing for our services in {businessData.address.city}. Prices vary by project — call {businessData.phone} for your free estimate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {guides.map((guide) => {
            const service = servicesData.services.find((s) => s.slug === guide.serviceSlug)
            return (
              <Link key={guide.slug} href={`/cost-guides/${guide.slug}`}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow group">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="slate" className="text-xs">
                      Updated {guide.lastUpdated}
                    </Badge>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {guide.headline}
                  </h2>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {guide.intro?.slice(0, 120)}...
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm">
                    View Pricing
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
