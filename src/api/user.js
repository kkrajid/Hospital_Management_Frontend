import { authAxios, axi } from "./UseAxios";



export const registerRequest = async (data) => {
    const response = await axi.post("register", data);
    return response;
};
  
export const loginRequest = async (email, password) => {
    const response = await axi.post("/users/login/", { email, password });
    return response;
};
  

export const get_users = async () => {
    const response = await authAxios.get("/users/get/");
    return response.data;
};
  