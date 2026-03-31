import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import themeData from '@/data/theme.json'
import { fontClasses } from '@/lib/fonts'
import { DevProvider, DesignPanel, LogoMaker } from '@/components/dev'
import { getRootMetadata } from '@/lib/seo'
import FeatureWidgets from '@/components/layout/FeatureWidgets'

// Build theme class string from theme.json
const themeClasses = [
  `theme-${themeData.colors}`,
  `radius-${themeData.radius}`,
  `fonts-${themeData.fonts}`,
  themeData.pageStyle ? `page-style-${themeData.pageStyle}` : '',
].filter(Boolean).join(' ')

// Use SEO config from business.json for consistent branding across all pages
export const metadata: Metadata = getRootMetadata()

// Theme is set at build time from data/theme.json via themeClasses.
// No localStorage override — production sites use the built-in theme only.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontClasses} suppressHydrationWarning>
      <head>
        <LocalBusinessSchema />
      </head>
      <body className={`min-h-screen flex flex-col font-body ${themeClasses}`} suppressHydrationWarning>
        <DevProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FeatureWidgets />
          <DesignPanel />
          <LogoMaker />
        </DevProvider>
      </body>
    </html>
  )
}
