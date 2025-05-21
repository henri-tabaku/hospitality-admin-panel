export class MenuItem {
    id: number;
    name: string;
    price: number;
    categoryName: string;

    constructor(id: number, name: string, price: number, categoryName: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryName = categoryName;
    }
}