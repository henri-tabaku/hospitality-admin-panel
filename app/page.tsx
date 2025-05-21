import prisma from '@/lib/prisma'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default async function Home() {
  const users = await prisma.user.findMany()
  return (
    <main>
      <div className='grid grid-cols-3 gap-8'>
        {users.map(user => 
          <Card key={user.id} className='flex flex-col justify-between'>
            <CardHeader className='flex flex-row items-center gap-4'>
                <CardTitle>{user.email} - 1</CardTitle>
                <CardDescription>{user.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='truncate'>{user.password}</p>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <p>Button</p>
              <p>Button2</p>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  )
}
