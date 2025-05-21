import { create } from "zustand";
import { GetOrdersFilters } from "../(staff)/orders/actions";

type OrderStore = {
    filters: GetOrdersFilters;
    setFilters: (filters: GetOrdersFilters) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
    filters: {
        status: undefined,
        limit: 10,
    },
    setFilters: (filters) => set({ filters }),
}));