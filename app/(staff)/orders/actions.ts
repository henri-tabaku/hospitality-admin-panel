'use server'

import prisma from '@/lib/prisma'

export async function getOrders() {
  return await prisma.order.findMany({
    include: {
      items: {
        include: {
          menuItem: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}