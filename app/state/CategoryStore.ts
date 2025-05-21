import { create } from 'zustand'

export type CategoryFilters = {
  limit?: number
}

type CategoryStore = {
  filters: CategoryFilters
  setFilters: (filters: CategoryFilters) => void
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  filters: {
    limit: 10
  },
  setFilters: (filters) => set({ filters })
}))