import Link from 'next/link'
import LimitFilter from './LimitFilter'
import Orders from './Orders'
import StatusFilter from './StatusFilter'
import { Plus } from 'lucide-react'

export default function OrdersPage() {
  return (
    <>
      <div className='mb-8 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <StatusFilter />
          <LimitFilter />
        </div>
        <Link href={'/addOrder'} className='flex items-center rounded-md bg-blue-500 px-4 py-2 text-white'>
          <Plus className='mr-2 h-4 w-4' />
          Add Order
        </Link>
      </div>
      <Orders />
    </>
  )
}
