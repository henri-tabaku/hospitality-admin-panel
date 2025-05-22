'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { updateCategory } from '../actions'

type CategoryFormProps = {
  category: {
    id: number
    name: string
  }
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: (name: string) => updateCategory(category.id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      router.push('/categories')
    }
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    updateMutation.mutate(name)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Category Name
            </label>
            <Input
              id="name"
              name="name"
              defaultValue={category.name}
              required
              placeholder="Enter category name"
            />
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
            {updateMutation.isPending ? 'Updating...' : 'Update Category'}
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