import api from "./api";

export const getAllCategories = () => api.get("/categories");

export const getProductsByCategory = (categoryId: number) => api.get(`/categories/${categoryId}/products`)

export const getCategoryById = (categoryId: number) => api.get(`/categories/${categoryId}`);