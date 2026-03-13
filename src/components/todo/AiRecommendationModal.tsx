import { useState, useEffect } from 'react'
import { Sparkles, X, Plus, Check } from 'lucide-react'
import { useAppStore } from '../../store/appStore'
import { useTodoStore } from '../../store/todoStore'

const MOCK_RECOMMENDATIONS = [
  "매일 아침 10분 명상하기",
  "점심 식사 후 15분 가벼운 산책",
  "취침 전 30분 독서",
  "영양제 챙겨먹기",
  "오후 3시에 스트레칭 5분"
]

export function AiRecommendationModal() {
  const { isAiModalOpen, setAiModalOpen } = useAppStore()
  const { addTodo, categories } = useTodoStore()
  const [isLoading, setIsLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set())

  // Mock API call effect
  useEffect(() => {
    if (isAiModalOpen) {
      setIsLoading(true)
      setAddedItems(new Set())
      
      const timer = setTimeout(() => {
        // Randomize 3 choices
        const shuffled = [...MOCK_RECOMMENDATIONS].sort(() => 0.5 - Math.random())
        setRecommendations(shuffled.slice(0, 3))
        setIsLoading(false)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [isAiModalOpen])

  if (!isAiModalOpen) return null

  const handleAdd = (rec: string, index: number) => {
    addTodo({
      categoryId: categories[0]?.id || 'c1', // Default to first category
      content: rec,
      completed: false,
      date: new Date().toISOString().split('T')[0]
    })
    setAddedItems(prev => new Set(prev).add(index))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
              <Sparkles size={20} />
            </div>
            <h3 className="font-bold text-gray-800">AI 스마트 추천</h3>
          </div>
          <button 
            onClick={() => setAiModalOpen(false)}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            회원님의 그동안의 생활 패턴을 분석하여 오늘 실천하면 좋을 습관들을 추천해 드립니다.
          </p>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
              <p className="text-sm font-medium text-purple-600 animate-pulse">최적의 루틴을 분석하는 중...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recommendations.map((rec, idx) => {
                const isAdded = addedItems.has(idx)
                return (
                  <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${isAdded ? 'bg-purple-50/50 border-purple-100' : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-sm'}`}>
                    <span className={`font-medium text-sm ${isAdded ? 'text-gray-400' : 'text-gray-800'}`}>
                      {rec}
                    </span>
                    <button
                      onClick={() => !isAdded && handleAdd(rec, idx)}
                      disabled={isAdded}
                      className={`p-2 rounded-lg flex items-center justify-center transition-all ${isAdded ? 'text-purple-500 bg-purple-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white'}`}
                    >
                      {isAdded ? <Check size={16} strokeWidth={3} /> : <Plus size={16} />}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={() => setAiModalOpen(false)}
            className="px-5 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {addedItems.size > 0 ? '완료' : '닫기'}
          </button>
        </div>
      </div>
    </div>
  )
}
