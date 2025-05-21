import { PrismaClient, Role, OrderStatus, Prisma } from '../app/generated/prisma'
import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// Define seed data using Prisma types
const userData: Prisma.UserCreateInput[] = [
  {
    email: 'admin@restaurant.com',
    password: bcrypt.hashSync('admin123', 10),
    role: Role.ADMIN
  },
  {
    email: 'staff1@restaurant.com',
    password: bcrypt.hashSync('staff123', 10),
    role: Role.STAFF
  },
  {
    email: 'staff2@restaurant.com',
    password: bcrypt.hashSync('staff123', 10),
    role: Role.STAFF
  },
  {
    email: 'staff3@restaurant.com',
    password: bcrypt.hashSync('staff123', 10),
    role: Role.STAFF
  },
  {
    email: 'staff4@restaurant.com',
    password: bcrypt.hashSync('staff123', 10),
    role: Role.STAFF
  },
  {
    email: 'staff5@restaurant.com',
    password: bcrypt.hashSync('staff123', 10),
    role: Role.STAFF
  }
]

const categoryData: Prisma.CategoryCreateInput[] = [
  { name: 'Appetizers' },
  { name: 'Main Courses' },
  { name: 'Desserts' },
  { name: 'Beverages' },
  { name: 'Sides' }
]

export async function main() {
  console.log('Starting seed...')
  
  // Create users
  for (const user of userData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user
    })
  }
  
  // Create categories
  const categories = []
  for (const category of categoryData) {
    const createdCategory = await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
    categories.push(createdCategory)
  }
  
  // Define menu items data
  const menuItemsData = [
    // Appetizers
    { 
      name: 'Bruschetta',
      price: 8.99,
      available: true,
      categoryId: categories[0].id
    },
    { 
      name: 'Mozzarella Sticks',
      price: 7.99,
      available: true,
      categoryId: categories[0].id
    },
    { 
      name: 'Garlic Bread',
      price: 5.99,
      available: true,
      categoryId: categories[0].id
    },
    { 
      name: 'Buffalo Wings',
      price: 10.99,
      available: true,
      categoryId: categories[0].id
    },
    
    // Main Courses
    { 
      name: 'Spaghetti Bolognese',
      price: 15.99,
      available: true,
      categoryId: categories[1].id
    },
    { 
      name: 'Grilled Salmon',
      price: 19.99,
      available: true,
      categoryId: categories[1].id
    },
    { 
      name: 'Chicken Alfredo',
      price: 16.99,
      available: true,
      categoryId: categories[1].id
    },
    { 
      name: 'Beef Steak',
      price: 24.99,
      available: true,
      categoryId: categories[1].id
    },
    { 
      name: 'Vegetable Stir Fry',
      price: 14.99,
      available: true,
      categoryId: categories[1].id
    },
    
    // Desserts
    { 
      name: 'Chocolate Cake',
      price: 6.99,
      available: true,
      categoryId: categories[2].id
    },
    { 
      name: 'Tiramisu',
      price: 7.99,
      available: true,
      categoryId: categories[2].id
    },
    { 
      name: 'Cheesecake',
      price: 7.99,
      available: true,
      categoryId: categories[2].id
    },
    
    // Beverages
    { 
      name: 'Soda',
      price: 2.99,
      available: true,
      categoryId: categories[3].id
    },
    { 
      name: 'Coffee',
      price: 3.99,
      available: true,
      categoryId: categories[3].id
    },
    { 
      name: 'Iced Tea',
      price: 2.99,
      available: true,
      categoryId: categories[3].id
    },
    { 
      name: 'Lemonade',
      price: 3.49,
      available: true,
      categoryId: categories[3].id
    },
    
    // Sides
    { 
      name: 'French Fries',
      price: 4.99,
      available: true,
      categoryId: categories[4].id
    },
    { 
      name: 'Onion Rings',
      price: 5.99,
      available: true,
      categoryId: categories[4].id
    },
    { 
      name: 'Side Salad',
      price: 4.99,
      available: true,
      categoryId: categories[4].id
    }
  ]
  
  // Create menu items
  const menuItems = []
  for (const item of menuItemsData) {
    // Add some randomness to availability (90% chance of being available)
    item.available = Math.random() > 0.1
    const menuItem = await prisma.menuItem.create({ data: item })
    menuItems.push(menuItem)
  }
  
  // Create orders and order items
  let orderItemCount = 0
  
  // Create 15 orders
  const orders = []
  for (let i = 0; i < 15; i++) {
    // Create an order
    const order = await prisma.order.create({
      data: {
        status: faker.helpers.arrayElement(Object.values(OrderStatus)),
        createdAt: faker.date.recent({ days: 7 })
      }
    })
    
    orders.push(order)
    
    // Add 1-5 items to each order
    const itemCount = Math.floor(Math.random() * 5) + 1
    
    for (let j = 0; j < itemCount; j++) {
      const randomMenuItem = menuItems[Math.floor(Math.random() * menuItems.length)]
      
      // Create order item in the junction table
      await prisma.orderItem.create({
        data: {
          quantity: Math.floor(Math.random() * 3) + 1,
          menuItemId: randomMenuItem.id,
          orderId: order.id
        }
      })
      
      orderItemCount++
    }
  }
  
  console.log(`Seeded:`)
  console.log(`- ${userData.length} users (1 admin, ${userData.length - 1} staff)`)
  console.log(`- ${categories.length} categories`)
  console.log(`- ${menuItems.length} menu items`)
  console.log(`- ${orders.length} orders with ${orderItemCount} order items`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })