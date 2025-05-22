import { getMenuItem } from '../actions'
import { getCategories } from '../../categories/actions'
import MenuItemForm from './MenuItemForm'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MenuItemPage({ params }: PageProps) {
  const resolvedParams = await params
  const menuItemId = parseInt(resolvedParams.id)
  const [menuItem, categories] = await Promise.all([
    getMenuItem(menuItemId),
    getCategories({})
  ])
  
  return <MenuItemForm menuItem={menuItem} categories={categories} />
}