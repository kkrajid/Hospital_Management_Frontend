import { authAxios, axi } from "./UseAxios";


export const registerRequest = async (data) => {
    const response = await axi.post("register", data);
    return response;
};
  

export const otpValidationRequest = async (data) => {
    const response = await axi.post("verification", data);
    return response;
};


export const loginRequest = async (data) => {
    const response = await axi.post("login",data );
    return response;
};
  

export const AdminloginRequest = async (data) => {
    const response = await axi.post("admin/login",data );
    return response;
};
  

export const get_users = async () => {
    const response = await authAxios.get("/users/get/");
    return response.data;
};
  