/**
 * Content loader for data-driven pages
 * All text content comes from /data/content.json
 * Variables like {{businessName}} are replaced via copyEngine
 */

import contentData from '@/data/content.json'
import { processContent } from '@/lib/copyEngine'

// Type definitions
export interface HeroContent {
  headline: string
  headlineAccent: string
  subheading: string
  description: string
  imageAlt: string
  heroImage?: string
  heroBackgroundImage?: string
}

export interface TrustSectionContent {
  title: string
  subtitle: string
  factoryAuthorized: string
  factoryDescription: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface ProcessSectionContent {
  title: string
  subtitle: string
  steps: ProcessStep[]
}

export interface PageContent {
  heroTitle?: string
  heroSubtitle?: string
  ctaTitle?: string
  ctaDescription?: string
  [key: string]: string | string[] | undefined
}

export interface AboutSectionContent {
  title: string
  subtitle: string
  description: string
  mission: string
  values: { title: string; description: string }[]
}

export interface BlogSectionContent {
  title: string
  subtitle: string
}

interface ContentData {
  hero?: {
    headline?: string
    headlineAccent?: string
    subheading?: string
    description?: string
    imageAlt?: string
  }
  trustSection?: {
    title?: string
    subtitle?: string
    factoryAuthorized?: string
    factoryDescription?: string
  }
  mediaBar?: Record<string, string>
  servicesSection?: {
    title?: string
    subtitle?: string
  }
  processSection?: {
    title?: string
    headline?: string
    subtitle?: string
    description?: string
    steps?: ProcessStep[]
  }
  worksSection?: Record<string, string>
  testimonialsSection?: {
    title?: string
    headline?: string
    subtitle?: string
    description?: string
  }
  faqSection?: {
    title?: string
    headline?: string
    subtitle?: string
    description?: string
  }
  aboutSection?: {
    title?: string
    headline?: string
    subtitle?: string
    description?: string
    mission?: string
    values?: { title: string; description: string; icon?: string }[]
  }
  blogSection?: {
    title?: string
    headline?: string
    subtitle?: string
    description?: string
  }
  ctaBanner?: {
    title?: string
    headline?: string
    description?: string
    buttonText?: string
    buttonHref?: string
  }
  pages?: Record<string, PageContent>
}

const data = processContent(contentData) as ContentData

// Content getters with meaningful defaults
export function getHeroContent(): HeroContent {
  const hero = data.hero
  return {
    headline: hero?.headline || 'Professional Service You Can Trust',
    headlineAccent: hero?.headlineAccent || 'You Can Trust',
    subheading: hero?.subheading || '',
    description: hero?.description || 'Licensed, insured, and committed to quality workmanship on every job.',
    imageAlt: hero?.imageAlt || 'Professional service team',
    heroImage: hero?.heroImage,
    heroBackgroundImage: hero?.heroBackgroundImage,
  }
}

export function getTrustSectionContent(): TrustSectionContent {
  const trust = data.trustSection
  return {
    title: trust?.title || (trust as any)?.headline || 'Why Choose Us',
    subtitle: trust?.subtitle || (trust as any)?.description || 'Trusted by homeowners across the area',
    factoryAuthorized: trust?.factoryAuthorized || 'Certified Professionals',
    factoryDescription: trust?.factoryDescription || 'Trained and certified technicians',
  }
}

export function getMediaBarContent() {
  return data.mediaBar || {}
}

export function getServicesSectionContent() {
  const services = data.servicesSection
  return {
    title: services?.title || (services as any)?.headline || 'Our Services',
    subtitle: services?.subtitle || (services as any)?.description || 'Comprehensive solutions for your home and business',
    ...services,
  }
}

export function getProcessSectionContent(): ProcessSectionContent {
  const process = data.processSection
  return {
    title: process?.title || process?.headline || 'How It Works',
    subtitle: process?.subtitle || process?.description || 'Simple, transparent process from start to finish',
    steps: process?.steps || [
      { title: 'Contact Us', description: 'Call or fill out our form for a free estimate.' },
      { title: 'Get a Quote', description: 'We assess the job and provide transparent pricing.' },
      { title: 'We Do the Work', description: 'Our certified team completes the job right.' },
      { title: 'Your Satisfaction', description: 'We ensure you are 100% happy with the results.' },
    ],
  }
}

export function getWorksSectionContent() {
  const works = data.worksSection || {} as Record<string, any>
  return {
    title: works.title || works.headline || 'Our Work',
    subtitle: works.subtitle || works.description || 'See examples of our recent projects',
    badgeText: works.badgeText || 'Portfolio',
    ...works,
  }
}

export function getTestimonialsSectionContent() {
  const testimonials = data.testimonialsSection
  return {
    title: testimonials?.title || testimonials?.headline || 'What Our Customers Say',
    subtitle: testimonials?.subtitle || testimonials?.description || 'Real reviews from real customers',
    ...testimonials,
  }
}

export function getFaqSectionContent() {
  const faq = data.faqSection
  return {
    title: faq?.title || faq?.headline || 'Common Questions',
    subtitle: faq?.subtitle || faq?.description || 'Find answers to frequently asked questions about our services',
  }
}

export function getAboutSectionContent(): AboutSectionContent {
  const about = data.aboutSection
  return {
    title: about?.title || about?.headline || 'About Us',
    subtitle: about?.subtitle || 'Learn more about our story and values',
    description: about?.description || 'We are a dedicated team of professionals committed to delivering exceptional service to our community.',
    mission: about?.mission || '',
    values: about?.values || [],
  }
}

export function getBlogSectionContent(): BlogSectionContent {
  const blog = data.blogSection
  return {
    title: blog?.title || blog?.headline || 'Latest Articles',
    subtitle: blog?.subtitle || blog?.description || 'Tips and insights from our team',
  }
}

export function getCtaBannerContent() {
  const cta = data.ctaBanner
  return {
    title: cta?.title || cta?.headline || 'Ready to Get Started?',
    description: cta?.description || 'Contact us today for a free estimate. Our team is ready to help.',
    ...cta,
  }
}

export function getPageContent(page: string): PageContent {
  const pages = data.pages
  if (!pages || !pages[page]) {
    return { heroTitle: '', heroSubtitle: '', ctaTitle: '', ctaDescription: '' }
  }
  const raw = pages[page] as Record<string, unknown>
  // Accept both schema names (headline/description) and legacy names (heroTitle/heroSubtitle)
  return {
    heroTitle: (raw.heroTitle || raw.headline || '') as string,
    heroSubtitle: (raw.heroSubtitle || raw.description || '') as string,
    ctaTitle: (raw.ctaTitle || '') as string,
    ctaDescription: (raw.ctaDescription || '') as string,
    ...raw,
  } as PageContent
}

// Export full content for direct access
export { contentData }
