'use server'

import prisma from "@/lib/prisma"
import { CategoryFilters } from "@/app/state/CategoryStore"

export async function getCategories(filters: CategoryFilters) {
  try {
    const categories = await prisma.category.findMany({
      take: filters.limit,
      include: {
        _count: {
          select: { menuItems: true }
        }
      }
    })
    return categories
  } catch (error) {
    throw new Error('Failed to fetch categories')
  }
}

export async function createCategory(name: string) {
  try {
    const category = await prisma.category.create({
      data: { name }
    })
    return category
  } catch (error) {
    throw new Error('Failed to create category')
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    await prisma.category.delete({
      where: { id: categoryId }
    })
    return true
  } catch (error) {
    throw new Error('Failed to delete category')
  }
}