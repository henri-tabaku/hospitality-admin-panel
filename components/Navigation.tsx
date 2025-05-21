import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="flex items-center justify-center gap-4 p-4 bg-card border-b">
      <div className="flex gap-2">
        <Link 
          href="/menu-items" 
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Menu Items
        </Link>
        <Link 
          href="/categories" 
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Categories
        </Link>
        <Link 
          href="/orders" 
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Orders
        </Link>
      </div>
    </nav>
  )
}