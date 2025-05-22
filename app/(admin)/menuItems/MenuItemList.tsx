'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteMenuItem, getMenuItems } from "./actions"
import { useMenuItemStore } from "@/app/state/MenuItemStore"
import MenuItemsLoading from "./loading"
import { getQueryClient } from "@/app/get-query-client"

export default function MenuItemList() {
  const queryClient = getQueryClient()
  const {filters} = useMenuItemStore()

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
              <TableCell>{item.category?.name}</TableCell>
              <TableCell>{item.available ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-right space-x-2">
                <Link href={`/menuItems/${item.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                  >
                    Edit
                  </Button>
                </Link>
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