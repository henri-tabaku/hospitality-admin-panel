import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LimitFilter from './LimitFilter'
import MenuItemList from './MenuItemList'
import { Plus } from 'lucide-react'

export default function MenuItemsPage() {
  return (
    <div className='mx-auto max-w-6xl space-y-6 p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Menu Items</h1>
        <div className='flex items-center gap-4'>
          <LimitFilter />
          <Link
            href={'/menuItems/add'}
            className='flex items-center rounded-md bg-blue-500 px-4 py-2 text-white'
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Menu Item
          </Link>
        </div>
      </div>

      <MenuItemList />
    </div>
  )
}
