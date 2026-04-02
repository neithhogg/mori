import type { JSX } from 'react'
import { ShowcaseHeader } from './components/ShowcaseHeader'
import { ShowcaseSidebar } from './components/ShowcaseSidebar'
import { ButtonSection } from './sections/ButtonSection'
import { InputSection } from './sections/InputSection'
import { CardSection } from './sections/CardSection'
import { BadgeSection } from './sections/BadgeSection'
import { SkeletonSection } from './sections/SkeletonSection'
import { DialogSection } from './sections/DialogSection'
import { NavigationSection } from './sections/NavigationSection'
import { EmptyStateSection } from './sections/EmptyStateSection'
import { DataDisplaySection } from './sections/DataDisplaySection'

export function App(): JSX.Element {
  return (
    <div className="flex min-h-screen">
      <ShowcaseSidebar />
      <main className="max-w-[900px] flex-1 px-16 py-12">
        <ShowcaseHeader />
        <ButtonSection />
        <InputSection />
        <CardSection />
        <BadgeSection />
        <SkeletonSection />
        <DialogSection />
        <NavigationSection />
        <EmptyStateSection />
        <DataDisplaySection />
      </main>
    </div>
  )
}
