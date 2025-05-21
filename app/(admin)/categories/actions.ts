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
    // First check if category has any menu items
    const category = await prisma.category.findFirst({
      where: { id: categoryId },
      include: {
        _count: {
          select: { menuItems: true }
        }
      }
    })

    if (!category) {
      throw new Error('Category not found')
    }

    if (category._count.menuItems > 0) {
      throw new Error('Cannot delete category that has menu items')
    }

    // If no menu items, proceed with deletion
    await prisma.category.delete({
      where: { id: categoryId }
    })
    return true
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to delete category')
  }
}