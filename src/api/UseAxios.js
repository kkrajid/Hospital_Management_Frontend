import axios from "axios";
import { useAuthStore } from "../Store/auth";
import jwt_decode from "jwt-decode";


export const baseURL = "http://localhost:8000/api/";
export const websocketbaseUrl = "127.0.0.1:8000"
// export const baseURL = "https://medcare.site/api/";
// export const websocketbaseUrl = "medcare.site"


export const axi = axios.create({
    baseURL
});


export const authAxios = axios.create({
    baseURL 
  });
  
  authAxios.interceptors.request.use((config) => {
    const token = useAuthStore.getState().access; 
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  });

