import api from "./api";


export const getAllProducts = () => {
    return api.get("/products");
  };

