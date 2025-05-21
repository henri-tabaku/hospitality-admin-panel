export default function OrdersLoading() {
  return (
    <div className='grid animate-pulse grid-cols-1 gap-8 pt-28 md:grid-cols-2 lg:grid-cols-3'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='h-[300px] rounded-lg bg-gray-200'></div>
      ))}
    </div>
  )
}
