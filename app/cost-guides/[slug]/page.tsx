import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CostGuidePageContent from '@/components/pages/CostGuidePageContent'
import businessData from '@/data/business.json'
import costGuidesData from '@/data/cost-guides.json'
import servicesData from '@/data/services.json'
import { generateDynamicMetadata } from '@/lib/seo'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (!costGuidesData?.guides?.length) return []
  return costGuidesData.guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = costGuidesData.guides.find((g) => g.slug === slug)

  if (!guide) {
    return { title: 'Not Found' }
  }

  return generateDynamicMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/cost-guides/${slug}`,
  })
}

export default async function CostGuidePage({ params }: PageProps) {
  const { slug } = await params
  const guide = costGuidesData.guides.find((g) => g.slug === slug)

  if (!guide) {
    notFound()
  }

  const service = servicesData.services.find((s) => s.slug === guide.serviceSlug)
  const serviceName = service?.name || guide.headline

  // JSON-LD for pricing page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: guide.metaTitle,
    description: guide.metaDescription,
    publisher: {
      '@type': 'LocalBusiness',
      name: businessData.name,
      telephone: businessData.phone,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CostGuidePageContent guide={guide} serviceName={serviceName} />
    </>
  )
}
