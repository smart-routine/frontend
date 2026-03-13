import { create } from 'zustand'

type ViewMode = 'todo' | 'calendar' | 'detailed'

interface AppState {
  mobileActiveTab: ViewMode
  setMobileActiveTab: (tab: ViewMode) => void
  isDetailedViewOpen: boolean
  setDetailedViewOpen: (isOpen: boolean) => void
  isAiModalOpen: boolean
  setAiModalOpen: (isOpen: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  mobileActiveTab: 'todo', // User can change this in settings later
  setMobileActiveTab: (tab) => set({ mobileActiveTab: tab }),
  isDetailedViewOpen: false,
  setDetailedViewOpen: (isOpen) => set({ isDetailedViewOpen: isOpen }),
  isAiModalOpen: false,
  setAiModalOpen: (isOpen) => set({ isAiModalOpen: isOpen }),
}))
