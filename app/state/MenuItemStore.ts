import { create } from 'zustand'

export type MenuItemFilters = {
  limit?: number
}

type MenuItemStore = {
  filters: MenuItemFilters
  setFilters: (filters: MenuItemFilters) => void
}

export const useMenuItemStore = create<MenuItemStore>((set) => ({
  filters: {
    limit: 10
  },
  setFilters: (filters) => set({ filters })
}))