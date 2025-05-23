import api from "./api";


export const getAllProducts = () => {
    console.log("Making API call with baseURL:", api.defaults.baseURL);
    return api.get("/products");
  };