'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { getOrders } from './actions'
import OrdersLoading from './loading'
import { useOrderStore } from '@/app/state/OrderStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useMutation } from '@tanstack/react-query'
import { updateOrderStatus } from './actions'
import { Order, OrderStatus } from '@/app/types/Order'
import { getQueryClient } from '@/app/get-query-client'

export default function OrdersList() {
  const { filters } = useOrderStore();
    const queryClient = getQueryClient()
  
  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: number, status: Order['status'] }) => 
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    }
  })

  const { isPending, error, data } = useQuery({
    queryKey: ['orders', filters ],
    queryFn: () => getOrders(filters)
  })

  const calculateOrderTotal = (items: any) => {
    return items.reduce(
      (total: any, item: any) => total + item.menuItem.price * item.quantity,
      0
    )
  }

  if (isPending) {
    return (
      <OrdersLoading />
    )
  }

  if (error) {
    return <div>Error loading orders</div>
  }

  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {data?.map(order => (
        <Card key={order.id} className='flex flex-col justify-between'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>Order #{order.id}</CardTitle>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  order.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : order.status === 'PREPARING'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'SERVED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                }`}
              >
                {order.status}
              </span>
            </div>
            <CardDescription>
              {formatDistanceToNow(new Date(order.createdAt), {
                addSuffix: true
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2'>
              {order.items.map(item => (
                <li key={item.id} className='flex justify-between'>
                  <span>
                    {item.quantity}x {item.menuItem.name}
                  </span>
                  <span>
                    ${(item.menuItem.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className='mt-4 flex justify-between border-t border-gray-200 pt-2 font-medium'>
              <span>Total:</span>
              <span>${calculateOrderTotal(order.items).toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200'>
                  Update Status
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => updateStatusMutation.mutate({ 
                    orderId: order.id, 
                    status: OrderStatus.PENDING 
                  })}
                >
                  Mark as Pending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updateStatusMutation.mutate({ 
                    orderId: order.id, 
                    status: OrderStatus.PREPARING 
                  })}
                >
                  Mark as Preparing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updateStatusMutation.mutate({ 
                    orderId: order.id, 
                    status: OrderStatus.SERVED 
                  })}
                >
                  Mark as Served
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
