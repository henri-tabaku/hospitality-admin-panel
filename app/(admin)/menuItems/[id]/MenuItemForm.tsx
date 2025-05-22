'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateMenuItem } from '../actions'

type MenuItemFormProps = {
  menuItem: {
    id: number
    name: string
    price: number
    available: boolean
    categoryId: number
  }
  categories: {
    id: number
    name: string
  }[]
}

export default function MenuItemForm({ menuItem, categories }: MenuItemFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: (formData: typeof menuItem) => updateMenuItem(menuItem.id, formData),
    onSuccess: (updatedItem) => {
      // Update the cache for both the list and individual item
      queryClient.setQueryData(['menuItems'], (oldData: any) => {
        if (!oldData) return oldData
        return oldData.map((item: any) => 
          item.id === menuItem.id ? updatedItem : item
        )
      })
      queryClient.setQueryData(['menuItem', menuItem.id], updatedItem)
      queryClient.invalidateQueries({ queryKey: ['menuItems'] })
      router.push('/menuItems')
      router.refresh()
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    updateMutation.mutate({
      id: menuItem.id,
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      available: formData.get('available') === 'on',
      categoryId: parseInt(formData.get('categoryId') as string)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Menu Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <Input
              id="name"
              name="name"
              defaultValue={menuItem.name}
              required
              placeholder="Enter menu item name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">Price</label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              defaultValue={menuItem.price}
              required
              placeholder="Enter price"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="available"
              name="available"
              defaultChecked={menuItem.available}
            />
            <label htmlFor="available" className="text-sm font-medium">
              Available
            </label>
          </div>

          <div className="space-y-2">
            <label htmlFor="categoryId" className="text-sm font-medium">
              Category
            </label>
            <Select 
              name="categoryId" 
              defaultValue={menuItem.categoryId.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem 
                    key={category.id} 
                    value={category.id.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.back()}
            disabled={updateMutation.isPending}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? 'Updating...' : 'Update Menu Item'}
          </Button>
        </CardFooter>
      </Card>
      
      {updateMutation.error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {updateMutation.error instanceof Error ? updateMutation.error.message : 'An error occurred'}
        </div>
      )}
    </form>
  )
}