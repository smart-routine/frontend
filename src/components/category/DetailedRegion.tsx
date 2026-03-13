import { FolderOpen } from 'lucide-react'
import { useTodoStore } from '../../store/todoStore'

export function DetailedRegion() {
  const { categories, goals, todos } = useTodoStore()

  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
          <FolderOpen className="text-purple-600" size={32} />
          상세 보기 <span className="text-xl font-normal text-gray-500 ml-2">(카테고리 및 목표)</span>
        </h2>
        <p className="mt-2 text-gray-500">모든 카테고리와 연관된 목표 리스트를 한눈에 확인하세요.</p>
      </header>

      <div className="space-y-6">
        {categories.map((category) => {
          const categoryGoals = goals.filter((g) => g.categoryId === category.id)
          const categoryTodos = todos.filter((t) => t.categoryId === category.id)

          // Completed vs Total stats
          const totalCatTodos = categoryTodos.length
          const completedCatTodos = categoryTodos.filter((t) => t.completed).length

          return (
            <div key={category.id} className="bg-white border text-left border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${category.color}`} />
                  <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                </div>
                {totalCatTodos > 0 && (
                  <div className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    {completedCatTodos} / {totalCatTodos} 완료
                  </div>
                )}
              </div>

              {/* Goals List */}
              {categoryGoals.length === 0 ? (
                <p className="text-gray-400 text-sm italic">등록된 목표가 없습니다.</p>
              ) : (
                <div className="space-y-4">
                  {categoryGoals.map((goal) => {
                    const goalTodos = categoryTodos.filter((t) => t.goalId === goal.id)
                    const completedGoalTodos = goalTodos.filter((t) => t.completed).length

                    return (
                      <div key={goal.id} className="bg-gray-50/50 rounded-xl p-4 border border-gray-100/50">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                            <span className="text-gray-400">↳</span> {goal.name}
                          </h4>
                          <span className="text-xs text-gray-400 font-medium">
                            {completedGoalTodos}/{goalTodos.length}
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full ${category.color}`} 
                            style={{ width: `${goalTodos.length === 0 ? 0 : (completedGoalTodos / goalTodos.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
