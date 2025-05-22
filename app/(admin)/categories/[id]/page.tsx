import { getCategory } from '../actions'
import CategoryForm from './CategoryForm'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params
  const categoryId = parseInt(resolvedParams.id)
  const category = await getCategory(categoryId)
  
  return <CategoryForm category={category} />
}
