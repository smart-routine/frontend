import { CheckSquare, CalendarDays, LayoutList } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

export function BottomNav() {
  const { mobileActiveTab, setMobileActiveTab, isDetailedViewOpen, setDetailedViewOpen } = useAppStore()

  const navItems = [
    { id: 'todo', icon: CheckSquare, label: '투두' },
    { id: 'calendar', icon: CalendarDays, label: '캘린더' },
  ] as const

  return (
    <nav className="fixed bottom-0 left-0 z-20 flex h-16 w-full items-center justify-around border-t border-gray-200 bg-white/80 backdrop-blur-md sm:hidden pb-safe">
      {navItems.map(({ id, icon: Icon, label }) => {
        const isActive = mobileActiveTab === id && !isDetailedViewOpen
        return (
          <button
            key={id}
            onClick={() => {
              setMobileActiveTab(id)
              setDetailedViewOpen(false)
            }}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        )
      })}

      <button
        onClick={() => setDetailedViewOpen(true)}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
          isDetailedViewOpen ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
        }`}
      >
        <LayoutList size={24} strokeWidth={isDetailedViewOpen ? 2.5 : 2} />
        <span className="text-[10px] font-medium">상세</span>
      </button>
    </nav>
  )
}
