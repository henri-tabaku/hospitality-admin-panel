'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useOrderStore } from "@/app/state/OrderStore"

type OrderStatus = 'PENDING' | 'PREPARING' | 'SERVED'

export default function StatusFilter() {
  const { filters, setFilters } = useOrderStore()

  const handleValueChange = (value: string) => {
    setFilters?.({
      ...filters,
      status: value === 'ALL' ? undefined : value as OrderStatus
    })
  }

  return (
    <Select 
      defaultValue="ALL" 
      onValueChange={handleValueChange}
      value={filters?.status || 'ALL'}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">All Orders</SelectItem>
        <SelectItem value="PENDING">Pending</SelectItem>
        <SelectItem value="PREPARING">Preparing</SelectItem>
        <SelectItem value="SERVED">Served</SelectItem>
      </SelectContent>
    </Select>
  )
}