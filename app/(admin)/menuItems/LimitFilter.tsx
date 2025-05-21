'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMenuItemStore } from "@/app/state/MenuItemStore"

export default function LimitFilter() {
  const { filters, setFilters } = useMenuItemStore()

  const handleValueChange = (value: string) => {
    setFilters({
      ...filters,
      limit: value === 'ALL' ? undefined : parseInt(value)
    })
  }

  return (
    <Select 
      defaultValue="10"
      onValueChange={handleValueChange}
      value={String(filters?.limit || 'ALL')}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Show" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="25">25</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="ALL">All</SelectItem>
      </SelectContent>
    </Select>
  )
}