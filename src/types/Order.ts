import type { Product } from "./Product";

export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price:number;
}

export interface Order{
    id: number;
    createdAt: string;
    total: number;
    items: OrderItem[];
}