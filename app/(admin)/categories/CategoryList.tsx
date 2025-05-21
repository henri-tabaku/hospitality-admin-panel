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
import { deleteCategory, getCategories } from "./actions"
import { useCategoryStore } from "@/app/state/CategoryStore"
import CategoriesLoading from "./loading"

type Category = {
  id: number
  name: string
  _count: {
    menuItems: number
  }
}

export default function CategoryList() {
  const queryClient = useQueryClient()
  const filters = useCategoryStore((state) => state.filters)

  const { data: categories, error, isLoading } = useQuery({
    queryKey: ['categories', filters],
    queryFn: () => getCategories(filters)
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    }
  })

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) return <CategoriesLoading />
  if (error) return <div className="text-red-500">Error loading categories</div>

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Menu Items</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category._count.menuItems}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
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