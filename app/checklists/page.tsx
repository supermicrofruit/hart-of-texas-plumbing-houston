import { Metadata } from 'next'
import Link from 'next/link'
import { Leaf, Sun, CloudSnow, Flower2, ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import businessData from '@/data/business.json'
import checklistsData from '@/data/checklists.json'
import { generateDynamicMetadata } from '@/lib/seo'

const seasonIcons: Record<string, any> = {
  spring: Flower2,
  summer: Sun,
  fall: Leaf,
  winter: CloudSnow,
}

const seasonColors: Record<string, string> = {
  spring: 'text-green-600 bg-green-50',
  summer: 'text-amber-600 bg-amber-50',
  fall: 'text-orange-600 bg-orange-50',
  winter: 'text-blue-600 bg-blue-50',
}

export function generateMetadata(): Metadata {
  return generateDynamicMetadata({
    title: `Maintenance Checklists | ${businessData.name}`,
    description: `Seasonal maintenance checklists to keep your home in top shape. Tips from ${businessData.name} in ${businessData.address.city}.`,
    path: '/checklists',
  })
}

export default function ChecklistsIndex() {
  const checklists = checklistsData.checklists || []

  if (checklists.length === 0) {
    return null
  }

  return (
    <section className="pt-16 pb-28 md:pt-24 md:pb-40">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Maintenance Checklists
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Keep your home in top condition year-round with these seasonal checklists from {businessData.name}.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {checklists.map((checklist) => {
            const SeasonIcon = seasonIcons[checklist.season] || Leaf
            const colorClass = seasonColors[checklist.season] || 'text-slate-600 bg-slate-50'

            return (
              <Link key={checklist.slug} href={`/checklists/${checklist.slug}`}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow group">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <SeasonIcon className="h-5 w-5" />
                    </div>
                    <Badge className={colorClass}>
                      {checklist.season.charAt(0).toUpperCase() + checklist.season.slice(1)}
                    </Badge>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {checklist.headline}
                  </h2>
                  <p className="text-sm text-slate-600 mb-4">
                    {(checklist as any).items?.length || 0} items
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm">
                    View Checklist
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
