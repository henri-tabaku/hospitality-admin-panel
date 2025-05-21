import { create } from 'zustand'

type OrderItem = {
    menuItemId: number
    quantity: number
    menuItemName?: string
}

type AddOrderStore = {
    orderItems: OrderItem[]
    addItem: () => void
    updateItem: (index: number, field: keyof OrderItem, value: any) => void
    removeItem: (index: number) => void
    resetForm: () => void
}

export const useAddOrderStore = create<AddOrderStore>((set) => ({
    orderItems: [],
    addItem: () => set((state) => ({
        orderItems: [...state.orderItems, { menuItemId: 0, quantity: 1 }]
    })),
    updateItem: (index, field, value) => set((state) => {
        const newItems = [...state.orderItems];
        (newItems[index] as any)[field] = value
        return { orderItems: newItems }
    }),
    removeItem: (index) => set((state) => ({
        orderItems: state.orderItems.filter((_, i) => i !== index)
    })),
    resetForm: () => set({ orderItems: [] })
}))