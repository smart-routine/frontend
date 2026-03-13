import { create } from 'zustand'

export interface Category {
  id: string
  name: string
  color: string
}

export interface Goal {
  id: string
  categoryId: string
  name: string
}

export interface Todo {
  id: string
  categoryId: string
  goalId?: string
  content: string
  completed: boolean
  date: string
}

interface TodoState {
  categories: Category[]
  goals: Goal[]
  todos: Todo[]
  addTodo: (todo: Omit<Todo, 'id'>) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, content: string) => void
}

const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Work', color: 'bg-blue-500' },
  { id: 'c2', name: 'Health', color: 'bg-green-500' },
  { id: 'c3', name: 'Personal', color: 'bg-yellow-500' },
]

const MOCK_GOALS: Goal[] = [
  { id: 'g1', categoryId: 'c1', name: 'Finish Project Alpha' },
  { id: 'g2', categoryId: 'c2', name: 'Run 5km' },
]

const getTodayString = () => new Date().toISOString().split('T')[0]

const MOCK_TODOS: Todo[] = [
  { id: 't1', categoryId: 'c1', goalId: 'g1', content: 'Review pull requests', completed: false, date: getTodayString() },
  { id: 't2', categoryId: 'c2', goalId: 'g2', content: 'Morning Jogging', completed: true, date: getTodayString() },
  { id: 't3', categoryId: 'c3', content: 'Read a book chapter', completed: false, date: getTodayString() },
]

export const useTodoStore = create<TodoState>((set) => ({
  categories: MOCK_CATEGORIES,
  goals: MOCK_GOALS,
  todos: MOCK_TODOS,
  addTodo: (todo) => set((state) => ({ 
    todos: [...state.todos, { ...todo, id: Date.now().toString() }] 
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
  })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(t => t.id !== id)
  })),
  updateTodo: (id, content) => set((state) => ({
    todos: state.todos.map(t => t.id === id ? { ...t, content } : t)
  }))
}))
