import { getQueryClient } from '@/app/get-query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getOrders } from './actions'
import Orders from './Orders'
import { Suspense } from 'react'
import OrdersLoading from './loading'

export default async function OrdersPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <h1 className='mb-6 text-2xl font-bold'>Orders</h1>
        <Suspense fallback={<OrdersLoading />}>
          <Orders />
        </Suspense>
    </HydrationBoundary>
  )
}
