import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTodoStore } from '../../store/todoStore'

export function CalendarRegion() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month')
  const { todos, categories } = useTodoStore()

  // Basic Calendar Logic for current month
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  const days = []
  // Pad empty days at the start
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center gap-1">
            <button onClick={handlePrevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button onClick={handleNextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button 
            onClick={() => setViewMode('month')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'month' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Month
          </button>
          <button 
            onClick={() => setViewMode('week')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'week' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Week
          </button>
        </div>
      </header>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
            <div key={day} className={`py-3 text-center text-xs font-semibold tracking-wider ${idx === 0 || idx === 6 ? 'text-gray-400' : 'text-gray-500'}`}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7 flex-1 auto-rows-fr">
          {days.map((dayNum, idx) => {
            if (!dayNum) return <div key={`empty-${idx}`} className="border-r border-b border-gray-100 bg-gray-50/50" />
            
            // Format dates to match todo date strings ('YYYY-MM-DD')
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
            const dayTodos = todos.filter(t => t.date === dateStr)
            const isToday = dateStr === new Date().toISOString().split('T')[0]

            return (
              <div key={dayNum} className={`border-r border-b border-gray-100 p-1 sm:p-2 hover:bg-gray-50 transition-colors relative group min-h-[80px]`}>
                <div className={`w-7 h-7 flex items-center justify-center rounded-full mb-1 ${isToday ? 'bg-purple-600 text-white font-bold' : 'text-gray-700 font-medium group-hover:bg-gray-200'}`}>
                  {dayNum}
                </div>
                
                {/* Todo Indicator Blocks */}
                <div className="space-y-1">
                  {dayTodos.map(todo => {
                    const category = categories.find(c => c.id === todo.categoryId)
                    return (
                      <div 
                        key={todo.id} 
                        className={`h-1.5 w-full rounded-sm ${category?.color || 'bg-gray-400'} ${todo.completed ? 'opacity-40' : 'opacity-100'}`}
                        title={todo.content}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
