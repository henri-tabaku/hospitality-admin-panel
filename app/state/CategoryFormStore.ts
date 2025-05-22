import { create } from 'zustand'
import { updateCategory } from '@/app/(admin)/categories/actions'

interface CategoryFormState {
  name: string
  error: string
  isLoading: boolean
  setName: (name: string) => void
  setError: (error: string) => void
  submitForm: (categoryId: number) => Promise<void>
}

export const useCategoryFormStore = create<CategoryFormState>((set) => ({
  name: '',
  error: '',
  isLoading: false,
  setName: (name) => set({ name }),
  setError: (error) => set({ error }),
  submitForm: async (categoryId) => {
    set({ isLoading: true, error: '' })
    try {
      await updateCategory(categoryId, { name: useCategoryFormStore.getState().name })
      set({ isLoading: false })
      return Promise.resolve()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update category'
      set({ error: errorMessage, isLoading: false })
      return Promise.reject(error)
    }
  }
}))