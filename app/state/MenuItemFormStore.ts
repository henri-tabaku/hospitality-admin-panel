import { create } from 'zustand'
import { updateMenuItem } from '@/app/(admin)/menuItems/actions'

type MenuItem = {
  name: string
  price: number
  available: boolean
  categoryId: number
}

type MenuItemFormStore = {
  formData: MenuItem
  isLoading: boolean
  error: string | null
  updateField: (field: keyof MenuItem, value: any) => void
  resetForm: (menuItem: MenuItem) => void
  submitForm: (id: number) => Promise<void>
}

export const useMenuItemFormStore = create<MenuItemFormStore>((set, get) => ({
  formData: {
    name: '',
    price: 0,
    available: true,
    categoryId: 0
  },
  isLoading: false,
  error: null,

  updateField: (field, value) => set((state) => ({
    formData: { ...state.formData, [field]: value }
  })),

  resetForm: (menuItem) => set({
    formData: menuItem,
    error: null,
    isLoading: false
  }),

  submitForm: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await updateMenuItem(id, get().formData)
      set({ isLoading: false })
      return Promise.resolve()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update menu item'
      set({ error: errorMessage, isLoading: false })
      return Promise.reject(error)
    }
  }
}))