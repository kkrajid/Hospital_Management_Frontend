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

export const DoctorloginRequest = async (data) => {
    const response = await axi.post("doctor/login",data );
    return response;
};
  
export const admin_add_new_doctor = async (data) => {
    const response = await authAxios.post("admin/add_doctor",data);
    return response.data;
};

export const get_all_doctor = async () => {
    const response = await authAxios.get("admin/all_doctors");
    return response.data;
};


export const get_all_patients = async () => {
    const response = await authAxios.get("admin/all_patients");
    return response.data;
};

export const patientProfile = async () => {
    const response = await authAxios.get("patient/profile");
    return response.data;
};