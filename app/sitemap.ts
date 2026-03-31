import { MetadataRoute } from 'next'
import businessData from '@/data/business.json'
import servicesData from '@/data/services.json'
import areasData from '@/data/areas.json'
import postsData from '@/data/posts.json'
import worksData from '@/data/works.json'
import serviceAreasData from '@/data/service-areas.json'
import costGuidesData from '@/data/cost-guides.json'
import checklistsData from '@/data/checklists.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = businessData.website || process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Service pages
  const servicePages = servicesData.services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Area pages
  const areaPages = areasData.areas.map((area) => ({
    url: `${baseUrl}/areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Blog post pages
  const blogPages = postsData.posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Works/project pages
  const worksPages = worksData.projects.map((project) => ({
    url: `${baseUrl}/works/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Service × Area cross-pages (conditional)
  const serviceAreaPages = (serviceAreasData?.pages || []).map((page) => ({
    url: `${baseUrl}/services/${page.serviceSlug}/${page.areaSlug}`,  // /services/[slug]/[areaSlug]
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Cost guide pages (conditional)
  const costGuidePages = (costGuidesData?.guides || []).map((guide) => ({
    url: `${baseUrl}/cost-guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  if (costGuidePages.length > 0) {
    costGuidePages.unshift({
      url: `${baseUrl}/cost-guides`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  }

  // Checklist pages (conditional)
  const checklistPages = (checklistsData?.checklists || []).map((checklist) => ({
    url: `${baseUrl}/checklists/${checklist.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  if (checklistPages.length > 0) {
    checklistPages.unshift({
      url: `${baseUrl}/checklists`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  }

  return [
    ...staticPages,
    ...servicePages,
    ...areaPages,
    ...blogPages,
    ...worksPages,
    ...serviceAreaPages,
    ...costGuidePages,
    ...checklistPages,
  ]
}
