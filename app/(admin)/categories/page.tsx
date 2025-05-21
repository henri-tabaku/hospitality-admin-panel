import Link from 'next/link'
import CategoryList from './CategoryList'
import LimitFilter from './LimitFilter'
import { Plus } from 'lucide-react'

export default function CategoriesPage() {
  return (
    <div className='mx-auto max-w-6xl space-y-6 p-4'>
      <div className='flex items-center justify-between'>
        <LimitFilter />
        <Link href={'/categories/add'} className='flex items-center rounded-md bg-blue-500 px-4 py-2 text-white'>
          <Plus className='mr-2 h-4 w-4' />
          Add Category
        </Link>
      </div>

      <CategoryList />
    </div>
  )
}
