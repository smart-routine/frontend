import { Settings, User, LayoutList } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

export function Header() {
  const { isDetailedViewOpen, setDetailedViewOpen } = useAppStore()

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        {/* Brand/Logo Placeholder */}
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white font-bold pb-0.5">
          S
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
          Smart Routine
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setDetailedViewOpen(!isDetailedViewOpen)}
          className={`group flex items-center justify-center rounded-full p-2 transition-colors ${isDetailedViewOpen ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
          title="상세보기 (카테고리:목표)"
        >
          <LayoutList size={20} />
          <span className="hidden sm:ml-2 sm:block text-sm font-medium">상세보기</span>
        </button>
        <div className="h-6 w-px bg-gray-200 mx-1"></div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
          <Settings size={20} />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
          <User size={20} />
        </button>
      </div>
    </header>
  )
}
