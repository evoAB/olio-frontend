import type { Cart } from "../types/Cart";
import api from "./api";

export const  getCart = () => api.get<Cart> ("/cart");

export const addToCart = (productId: number, quantity: number = 1) =>
    api.post(`/cart/add?productId=${productId}&quantity=${quantity}`);

export const removeFromCart = (productId: number) =>
    api.delete(`/cart/remove/${productId}`);

export const updateQuatity = (productId: number, quantity: number) =>
    api.put(`/cart/update?productId=${productId}&quantity=${quantity}`);