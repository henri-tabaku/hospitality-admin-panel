'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useAddOrderStore } from "@/app/state/AddOrderStore"
import { createOrder, getMenuItems } from "../actions"

export default function AddOrderPage() {
    const router = useRouter()
    const { orderItems, addItem, updateItem, removeItem, resetForm } = useAddOrderStore()
    
    const { data: menuItems } = useQuery({
        queryKey: ['menuItems'],
        queryFn: getMenuItems
    })

    const createOrderMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            resetForm()
            router.push('/orders')
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createOrderMutation.mutate(orderItems)
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>New Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {orderItems.map((item, index) => (
                        <div key={index} className="flex gap-4 items-center">
                            <Select
                                value={String(item.menuItemId)}
                                onValueChange={(value) => updateItem(index, 'menuItemId', Number(value))}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select item" />
                                </SelectTrigger>
                                <SelectContent>
                                    {menuItems?.map((menuItem) => (
                                        <SelectItem 
                                            key={menuItem.id} 
                                            value={String(menuItem.id)}
                                        >
                                            {menuItem.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                                className="w-24"
                            />
                            <Button 
                                type="button" 
                                variant="destructive"
                                onClick={() => removeItem(index)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={addItem}>
                        Add Item
                    </Button>
                    <Button type="submit" disabled={orderItems.length === 0}>
                        Create Order
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}