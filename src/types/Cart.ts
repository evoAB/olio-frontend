import type { Product } from "./Product";

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

export interface Cart{
    id: number;
    items: CartItem[];
}