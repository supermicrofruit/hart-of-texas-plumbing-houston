import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceAreaPageContent from '@/components/pages/ServiceAreaPageContent'
import businessData from '@/data/business.json'
import servicesData from '@/data/services.json'
import areasData from '@/data/areas.json'
import serviceAreasData from '@/data/service-areas.json'
import { generateDynamicMetadata } from '@/lib/seo'

interface PageProps {
  params: Promise<{ slug: string; areaSlug: string }>
}

export async function generateStaticParams() {
  // Graceful fallback: if no service-areas.json or empty, build zero pages
  if (!serviceAreasData?.pages?.length) return []

  return serviceAreasData.pages.map((page) => ({
    slug: page.serviceSlug,
    areaSlug: page.areaSlug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, areaSlug } = await params
  const page = serviceAreasData.pages.find(
    (p) => p.serviceSlug === slug && p.areaSlug === areaSlug
  )

  if (!page) {
    return { title: 'Not Found' }
  }

  return generateDynamicMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/services/${slug}/${areaSlug}`,
  })
}

export default async function ServiceAreaPage({ params }: PageProps) {
  const { slug, areaSlug } = await params
  const page = serviceAreasData.pages.find(
    (p) => p.serviceSlug === slug && p.areaSlug === areaSlug
  )

  if (!page) {
    notFound()
  }

  const service = servicesData.services.find((s) => s.slug === slug)
  const area = areasData.areas.find((a) => a.slug === areaSlug)

  if (!service || !area) {
    notFound()
  }

  // JSON-LD: Service + AreaServed schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    provider: {
      '@type': 'LocalBusiness',
      name: businessData.name,
      telephone: businessData.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: businessData.address.city,
        addressRegion: businessData.address.state,
      },
    },
    areaServed: {
      '@type': 'City',
      name: area.name,
      addressRegion: (area as any).state,
    },
    description: page.description,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceAreaPageContent
        page={page as any}
        service={service as any}
        area={area as any}
      />
    </>
  )
}
