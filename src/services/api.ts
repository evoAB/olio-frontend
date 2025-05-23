import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8080/api', // adjust if needed
  baseURL: 'https://olio-backend-x2hq.onrender.com/api', // hosted api base
});
console.log("Using API base URL:", api.defaults.baseURL);

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;
