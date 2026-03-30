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

export function App(): JSX.Element {
  return (
    <div className="flex min-h-screen">
      <ShowcaseSidebar />
      <main className="flex-1 px-16 py-12 max-w-[900px]">
        <ShowcaseHeader />
        <ButtonSection />
        <InputSection />
        <CardSection />
        <BadgeSection />
        <SkeletonSection />
        <DialogSection />
        <NavigationSection />
      </main>
    </div>
  )
}
