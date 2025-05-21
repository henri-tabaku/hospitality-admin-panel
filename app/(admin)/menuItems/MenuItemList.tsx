'use client'

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { deleteMenuItem, getMenuItems } from "./actions"
import { useMenuItemStore } from "@/app/state/MenuItemStore"
import MenuItemsLoading from "./loading"

export default function MenuItemList() {
  const queryClient = useQueryClient()
  const filters = useMenuItemStore((state) => state.filters)

  const { data: menuItems, error, isLoading } = useQuery({
    queryKey: ['menuItems', filters],
    queryFn: () => getMenuItems(filters)
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] })
    }
  })

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) return <MenuItemsLoading />
  if (error) return <div className="text-red-500">Error loading menu items</div>

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>{item.category.name}</TableCell>
              <TableCell>{item.available ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}