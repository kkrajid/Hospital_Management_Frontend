import axios from "axios";
import { useAuthStore } from "../Store/auth";
import jwt_decode from "jwt-decode";


const baseURL = "http://localhost:8000/api/";
// const baseURL = "https://medcare.site/api/";


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

