'use server'

import prisma from '@/lib/prisma'

type OrderItemInput = {
    menuItemId: number
    quantity: number
}

export async function createOrder(items: OrderItemInput[]) {
    try {
        const order = await prisma.order.create({
            data: {
                status: 'PENDING',
                items: {
                    create: items.map(item => ({
                        quantity: item.quantity,
                        menuItemId: item.menuItemId
                    }))
                }
            },
            include: {
                items: {
                    include: {
                        menuItem: true
                    }
                }
            }
        })
        return { success: true, order }
    } catch (error) {
        return { success: false, error: 'Failed to create order' }
    }
}

export async function getMenuItems() {
    return await prisma.menuItem.findMany({
        where: {
            available: true
        },
        orderBy: {
            name: 'asc'
        }
    })
}