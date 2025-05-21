import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Navigation() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <NavigationMenu className="max-w-none">
        <div className="max-w-6xl mx-auto p-4 w-full">
          <NavigationMenuList className="w-full justify-start gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/menu-items">Menu Items</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/categories">Categories</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/orders">Orders</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </div>
  )
}