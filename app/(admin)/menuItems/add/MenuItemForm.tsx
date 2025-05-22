'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { createMenuItem } from "../actions"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getCategories } from "../../categories/actions"
import { getQueryClient } from "@/app/get-query-client"

export default function MenuItemForm() {
  const router = useRouter()
  const queryClient = getQueryClient()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories({ limit: undefined })
  })

  const createMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] })
      router.push('/menuItems')
    }
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    createMutation.mutate({
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      categoryId: parseInt(formData.get('categoryId') as string),
      available: formData.get('available') !== null
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>New Menu Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Enter item name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              placeholder="Enter price"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="categoryId" className="text-sm font-medium">
              Category
            </label>
            <Select name="categoryId" required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="available" name="available" defaultChecked />
            <label htmlFor="available" className="text-sm font-medium">
              Available
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            type="submit"
            disabled={createMutation.isPending}
          >
            Create Menu Item
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}