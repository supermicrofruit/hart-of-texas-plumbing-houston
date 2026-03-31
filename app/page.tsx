import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import MediaMentions from '@/components/sections/MediaMentions'
import SectionDivider from '@/components/ui/SectionDivider'
import HeroDivider from '@/components/ui/HeroDivider'
import { generateOrganizationSchema, generateReviewSchema } from '@/lib/schema'
import businessData from '@/data/business.json'
import faqsData from '@/data/faqs.json'
import testimonialsData from '@/data/testimonials.json'
import { seoConfig } from '@/lib/seo'
import { getCtaBannerContent, getFaqSectionContent } from '@/lib/content'

// Client components that access localStorage/window must be ssr: false
// to prevent hydration mismatch (React error #418) which cascades
// and causes entire sections to disappear.
const TrustSignals = dynamic(() => import('@/components/sections/TrustSignals'), { ssr: false })
const ServiceGrid = dynamic(() => import('@/components/sections/ServiceGrid'), { ssr: false })
const ProcessSteps = dynamic(() => import('@/components/sections/ProcessSteps'), { ssr: false })
const WorksGallery = dynamic(() => import('@/components/sections/WorksGallery'), { ssr: false })
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: false })
const TestimonialsSlider = dynamic(() => import('@/components/sections/TestimonialsSlider'), { ssr: false })
const CTABanner = dynamic(() => import('@/components/sections/CTABanner'), { ssr: false })
const HomepageFAQ = dynamic(() => import('@/components/sections/HomepageFAQ'), { ssr: false })
const BlogSection = dynamic(() => import('@/components/sections/BlogSection'), { ssr: false })

const ctaContent = getCtaBannerContent()
const faqContent = getFaqSectionContent()

// Homepage uses the default description from business.json SEO config
export const metadata = {
  title: `${businessData.name} | Professional Services in ${businessData.address.city}, ${businessData.address.state}`,
  description: seoConfig.defaultDescription,
  openGraph: {
    title: `${businessData.name} | Professional Services in ${businessData.address.city}, ${businessData.address.state}`,
    description: seoConfig.defaultDescription,
    type: 'website' as const,
    siteName: businessData.name,
  },
}

export default function HomePage() {
  const faqCategories = (faqsData as any).categories || []
  const generalFaqs = faqCategories.find((cat: any) => cat.slug === 'general')?.faqs || faqCategories[0]?.faqs || []

  return (
    <>
      {/* Schema Markup (LocalBusiness schema is in layout.tsx via LocalBusinessSchema component) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema())
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateReviewSchema(testimonialsData.testimonials))
        }}
      />

      <HeroSection />
      <HeroDivider />
      <MediaMentions />
      <SectionDivider topColor="gray" bottomColor="white" label="Media → Trust" gradientTopWhenActive />
      <TrustSignals />
      <SectionDivider topColor="white" bottomColor="gray" label="Trust → Services" />
      <ServiceGrid limit={8} />
      <SectionDivider topColor="gray" bottomColor="white" label="Services → Process" />
      <ProcessSteps />
      <div className="bg-background"><div className="max-w-5xl mx-auto"><hr className="border-border" /></div></div>
      <WorksGallery limit={6} />
      <div className="bg-background"><div className="max-w-5xl mx-auto"><hr className="border-border" /></div></div>
      <AboutSection />
      <SectionDivider topColor="white" bottomColor="gray" label="About → Testimonials" />
      <TestimonialsSlider />
      <SectionDivider topColor="gray" bottomColor="white" label="Testimonials → FAQ" />
      <HomepageFAQ
        defaultFaqs={generalFaqs}
        defaultTitle={faqContent.title}
        defaultDescription={faqContent.subtitle}
      />
      <SectionDivider topColor="white" bottomColor="gray" label="FAQ → Blog" />
      <BlogSection />
      <CTABanner
        title={ctaContent.title}
        description={ctaContent.description}
        fromColor="gray"
      />
    </>
  )
}
