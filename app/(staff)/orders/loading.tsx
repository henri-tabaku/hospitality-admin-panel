import { Skeleton } from "@/components/ui/skeleton"

export default function OrdersLoading() {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='space-y-4 rounded-lg border border-gray-200 p-6'>
          <div className='flex items-center justify-between'>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-32" />
          <div className='space-y-2'>
            {[...Array(3)].map((_, j) => (
              <div key={j} className='flex justify-between'>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
          <Skeleton className="mt-4 h-[1px] w-full" />
          <div className='flex justify-between'>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className='flex justify-between pt-4'>
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}
