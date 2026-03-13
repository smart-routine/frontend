import { useState } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { useTodoStore } from '../../store/todoStore'
import type { Todo, Category, Goal } from '../../store/todoStore'

interface TodoItemProps {
  todo: Todo
  category: Category
  goal?: Goal
}

export function TodoItem({ todo, category, goal }: TodoItemProps) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodoStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.content)

  const handleSave = () => {
    if (editValue.trim()) {
      updateTodo(todo.id, editValue.trim())
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setIsEditing(false)
      setEditValue(todo.content)
    }
  }

  return (
    <div className={`group flex items-start gap-3 p-3 rounded-xl transition-all border ${todo.completed ? 'bg-gray-50 border-transparent opacity-60' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}>
      
      {/* Checkbox wrapper with category color */}
      <div className="pt-0.5">
        <button 
          onClick={() => toggleTodo(todo.id)}
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
            todo.completed 
              ? `${category.color} border-transparent text-white` 
              : `border-gray-300 hover:border-gray-400 text-transparent`
          }`}
        >
          <Check size={14} strokeWidth={3} className={todo.completed ? 'block' : 'hidden md:group-hover:block text-gray-300'} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`inline-block w-2 h-2 rounded-full ${category.color}`} />
          <span className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">
            {category.name} {goal && <span className="text-gray-400 font-normal ml-1">› {goal.name}</span>}
          </span>
        </div>
        
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              autoFocus
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-gray-50 border border-purple-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button onClick={handleSave} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Check size={16} /></button>
            <button onClick={() => { setIsEditing(false); setEditValue(todo.content); }} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"><X size={16} /></button>
          </div>
        ) : (
          <p className={`text-sm md:text-base leading-snug break-words ${todo.completed ? 'line-through text-gray-400 font-normal' : 'text-gray-800 font-medium'}`}>
            {todo.content}
          </p>
        )}
      </div>

      {/* Action Buttons (visible on hover) */}
      {!isEditing && (
        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1 pt-1 sm:opacity-100">
          <button 
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button 
            onClick={() => deleteTodo(todo.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
