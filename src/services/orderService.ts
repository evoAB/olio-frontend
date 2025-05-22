import type { Order } from "../types/Order";
import api from "./api";

export const placeOrder = async ()=> {
    const response = await api.post<Order>("/orders");
    return response.data;
}

export const getOrders = async () => {
    const response = await api.get<Order[]>("/orders");
    return response.data;
}