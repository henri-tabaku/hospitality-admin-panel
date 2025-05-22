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
import { useRouter } from "next/navigation"
import { createCategory } from "../actions"
import { useMutation } from "@tanstack/react-query"
import { getQueryClient } from "@/app/get-query-client"

export default function CategoryForm() {
  const router = useRouter()
  const queryClient = getQueryClient()

  const createMutation = useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      router.push('/categories')
    }
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    createMutation.mutate(name)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>New Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Category Name
            </label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Enter category name"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            type="submit"
            disabled={createMutation.isPending}
          >
            Create Category
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}