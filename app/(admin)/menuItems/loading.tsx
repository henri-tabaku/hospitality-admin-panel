import { Skeleton } from "@/components/ui/skeleton"

export default function MenuItemsLoading() {
  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors">
              <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Available</th>
              <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b transition-colors">
                <td className="p-4"><Skeleton className="h-4 w-[120px]" /></td>
                <td className="p-4"><Skeleton className="h-4 w-[60px]" /></td>
                <td className="p-4"><Skeleton className="h-4 w-[100px]" /></td>
                <td className="p-4"><Skeleton className="h-4 w-[40px]" /></td>
                <td className="p-4 text-right">
                  <Skeleton className="ml-auto h-8 w-[70px]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}