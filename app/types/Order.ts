export enum OrderStatus {
    PENDING = 'PENDING',
    PREPARING = 'PREPARING',
    SERVED = 'SERVED',
}

interface MenuItem {
    id: number;
    name: string;
    price: number;
    available: boolean;
    categoryId: number;
}

interface OrderItem {
    id: number;
    quantity: number;
    menuItemId: number;
    orderId: number;
    menuItem: MenuItem;
}

export class Order {
    constructor(
        public id: number,
        public status: OrderStatus,
        public items: OrderItem[],
        public createdAt: Date
    ) {}

    static fromPrisma(data: any): Order {
        return new Order(
            data.id,
            data.status,
            data.items,
            new Date(data.createdAt)
        );
    }
}