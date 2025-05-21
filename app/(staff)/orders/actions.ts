'use server'

import { Order } from '@/app/types/Order'
import prisma from '@/lib/prisma'

export type GetOrdersFilters = {
    status?: 'PENDING' | 'PREPARING' | 'SERVED'
    limit?: number
}

export async function getOrders(filters?: GetOrdersFilters): Promise<Order[]> {
    const orders = await prisma.order.findMany({
        where: {
            ...(filters?.status && {
                status: filters.status
            })
        },
        include: {
            items: {
                include: {
                    menuItem: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        ...(filters?.limit && {
            take: filters.limit
        })
    });
    
    return orders.map(order => ({
        id: order.id,
        status: order.status as Order['status'],
        createdAt: order.createdAt,
        items: order.items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            menuItemId: item.menuItemId,
            orderId: item.orderId,
            menuItem: {
                id: item.menuItem.id,
                name: item.menuItem.name,
                price: item.menuItem.price,
                available: item.menuItem.available,
                categoryId: item.menuItem.categoryId,
            }
        }))
    }));
}

export async function updateOrderStatus(orderId: number, status: Order['status']) {
    return await prisma.order.update({
        where: { id: orderId },
        data: { status }
    });
}