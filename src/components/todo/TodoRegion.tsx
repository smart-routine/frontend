import { useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { useTodoStore } from '../../store/todoStore'
import { useAppStore } from '../../store/appStore'
import { TodoItem } from './TodoItem'
import { AiRecommendationModal } from './AiRecommendationModal'

export function TodoRegion() {
  const { todos, categories, goals, addTodo } = useTodoStore()
  const { setAiModalOpen } = useAppStore()
  const [inputValue, setInputValue] = useState('')
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id)
  
  // Filter for today's todos
  const todayString = new Date().toISOString().split('T')[0]
  const todaysTodos = todos.filter(t => t.date === todayString)

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Quick add logic mapping
    addTodo({
      categoryId: activeCategoryId,
      content: inputValue.trim(),
      completed: false,
      date: todayString
    })
    setInputValue('')
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-[200vh] max-w-3xl mx-auto">
      <AiRecommendationModal />
      
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Today's Routine</h2>
          <p className="text-gray-500 mt-1 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </header>

      {/* Quick Add Input Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 mb-8 sticky top-4 z-10 transition-shadow hover:shadow-md focus-within:shadow-md focus-within:border-purple-300">
        <form onSubmit={handleAddSubmit} className="flex items-center gap-2">
          
          {/* Category Selector (Visual mock for now) */}
          <select 
            value={activeCategoryId} 
            onChange={(e) => setActiveCategoryId(e.target.value)}
            className="bg-gray-50 text-gray-700 text-sm rounded-xl px-3 py-2.5 outline-none font-medium cursor-pointer border-transparent focus:border-purple-300 focus:ring-0"
          >
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <input 
            type="text" 
            placeholder="새로운 습관이나 할 일을 추가하세요" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent px-2 py-2 text-gray-800 placeholder:text-gray-400 focus:outline-none text-base sm:text-sm"
          />
          
          <button 
            type="button" 
            onClick={() => setAiModalOpen(true)}
            className="flex items-center justify-center p-2.5 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors shrink-0 tooltip-trigger group relative"
            title="AI 추천받기"
          >
            <Sparkles size={20} />
            <span className="absolute -top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">AI 추천</span>
          </button>
          
          <button 
            type="submit" 
            disabled={!inputValue.trim()}
            className="flex items-center justify-center p-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
          </button>
        </form>
      </div>

      {/* Todo List Mapping */}
      <div className="space-y-3">
        {todaysTodos.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <p>오늘 등록된 일정이 없습니다.</p>
          </div>
        ) : (
          todaysTodos.map(todo => {
            const category = categories.find(c => c.id === todo.categoryId)!
            const goal = goals.find(g => g.id === todo.goalId)
            return (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                category={category} 
                goal={goal} 
              />
            )
          })
        )}
      </div>

    </div>
  )
}
