'use server'

import prisma from "@/lib/prisma"
import { MenuItemFilters } from "@/app/state/MenuItemStore"

export async function getMenuItems(filters: MenuItemFilters) {
  try {
    const menuItems = await prisma.menuItem.findMany({
      take: filters.limit,
      include: {
        category: true
      }
    })
    return menuItems
  } catch (error) {
    throw new Error('Failed to fetch menu items')
  }
}

export async function createMenuItem(data: {
  name: string
  price: number
  categoryId: number
  available: boolean
}) {
  try {
    const menuItem = await prisma.menuItem.create({
      data,
      include: {
        category: true
      }
    })
    return menuItem
  } catch (error) {
    throw new Error('Failed to create menu item')
  }
}

export async function deleteMenuItem(menuItemId: number) {
  try {
    // First check if menu item exists in any orders
    const menuItem = await prisma.menuItem.findFirst({
      where: { id: menuItemId },
      include: {
        _count: {
          select: { orders: true }
        }
      }
    })

    if (!menuItem) {
      throw new Error('Menu item not found')
    }

    if (menuItem._count.orders > 0) {
      throw new Error('Cannot delete menu item that exists in orders')
    }

    // If no orders found, proceed with deletion
    await prisma.menuItem.delete({
      where: { id: menuItemId }
    })
    return true
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to delete menu item')
  }
}