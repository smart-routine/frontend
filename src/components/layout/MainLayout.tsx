import type { ReactNode } from 'react'
import { Header } from './Header'
import { BottomNav } from './BottomNav'
import { useAppStore } from '../../store/appStore'

interface MainLayoutProps {
  todoRegion: ReactNode
  calendarRegion: ReactNode
  detailedRegion: ReactNode
}

export function MainLayout({ todoRegion, calendarRegion, detailedRegion }: MainLayoutProps) {
  const { mobileActiveTab, isDetailedViewOpen } = useAppStore()

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 overflow-hidden">
      <Header />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Desktop Split View / Mobile Conditional View */}
        {isDetailedViewOpen ? (
          <main className="flex-1 w-full h-full overflow-y-auto bg-white p-4 sm:p-8 animate-in fade-in duration-300">
            {detailedRegion}
          </main>
        ) : (
          <div className="flex flex-1 w-full h-full relative overflow-hidden">
            
            {/* Left/Main Side: Todo Region */}
            <main 
              className={`
                h-full w-full overflow-y-auto sm:border-r sm:border-gray-200 bg-gray-50/50 relative
                sm:w-1/2 lg:w-[55%] xl:w-[60%] sm:flex-none
                ${mobileActiveTab === 'todo' ? 'block' : 'hidden sm:block'}
              `}
            >
              {todoRegion}
            </main>

            {/* Right Side: Calendar Region */}
            <aside 
              className={`
                h-full w-full overflow-y-auto bg-white relative sm:flex-1
                ${mobileActiveTab === 'calendar' ? 'block' : 'hidden sm:block'}
              `}
            >
              {calendarRegion}
            </aside>
            
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
