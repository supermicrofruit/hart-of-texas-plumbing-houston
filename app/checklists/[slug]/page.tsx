import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ChecklistPageContent from '@/components/pages/ChecklistPageContent'
import businessData from '@/data/business.json'
import checklistsData from '@/data/checklists.json'
import { generateDynamicMetadata } from '@/lib/seo'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (!checklistsData?.checklists?.length) return []
  return checklistsData.checklists.map((checklist) => ({
    slug: checklist.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const checklist = checklistsData.checklists.find((c) => c.slug === slug)

  if (!checklist) {
    return { title: 'Not Found' }
  }

  return generateDynamicMetadata({
    title: checklist.metaTitle,
    description: checklist.metaDescription,
    path: `/checklists/${slug}`,
  })
}

export default async function ChecklistPage({ params }: PageProps) {
  const { slug } = await params
  const checklist = checklistsData.checklists.find((c) => c.slug === slug)

  if (!checklist) {
    notFound()
  }

  // JSON-LD HowTo schema for checklists
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: checklist.headline,
    description: checklist.intro,
    step: checklist.items.map((item, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: item.task,
      text: item.description,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ChecklistPageContent checklist={checklist as any} />
    </>
  )
}
