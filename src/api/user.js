import { authAxios, axi } from "./UseAxios";

  

//**///////////////////////////////////////D0CT0R SIDE////////////////////////////////////////////////**//
export const DoctorloginRequest = async (data) => {
    const response = await axi.post("doctor/login",data );
    return response;
};
export const Doctor_Dashboard = async () => {
    const response = await authAxios.get("doctor/dashboard");
    return response.data;
};
export const Doctor_time_slote_create = async (data) => {
    const response = await authAxios.post("doctor/create_time_slots",data );
    return response.data;
};
export const Doctor_all_time_slote_ = async (date) => {
    const response = await authAxios.get(`doctor/all_time_slots?date=${date}`);
    return response.data;
};
export const Doctor_delete_time_slot = async (timeSlotId) => {
    const response = await authAxios.delete(`doctor/delete_time_slot/${timeSlotId}`);
    return response.data;
};
export const doctor_profile_detail = async () => {
    const response = await authAxios.get("doctor_profile_detail");
    return response.data;
};
export const DoctorProfile_add_or_update = async (formData) => {
    const response = await authAxios.put(`doctor_profile_detail`, formData)
    return response.data;
};
export const all_user_appointments_for_doctor = async (data) => {
    const response = await authAxios.get(`doctor/get_all_appointment_of_doctor?data=${data}`);
    return response.data;
};
//**///////////////////////////////////////ADMIN SIDE////////////////////////////////////////////////**//

export const AdminloginRequest = async (data) => {
    const response = await axi.post("admin/login",data );
    return response;
};
export const admin_add_new_doctor = async (data) => {
    const response = await authAxios.post("admin/add_doctor",data);
    return response.data;
};
export const all_doctors_Profile = async () => {
    const response = await authAxios.get("admin/all_doctors");
    return response.data;
};
export const get_all_patients = async () => {
    const response = await authAxios.get("admin/all_patients");
    return response.data;
};
export const add_new_doctor_ = async (data) => {
    const response = await authAxios.post("admin/doctor/create",data);
    return response.data;
};
//**///////////////////////////////////////PATIENT SIDE////////////////////////////////////////////////**//

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
export const patientProfile = async () => {
    const response = await authAxios.get("patient/profile");
    return response.data;
};
export const patientProfile_add_or_update = async (formData) => {
    const response = await authAxios.put(`patient/add_or_updateprofile`, formData)
    return response.data;
};
export const patientDashboard = async () => {
    const response = await authAxios.get("patient/dashboard");
    return response.data;
};
export const all_doctors_Profile_patientside = async () => {
    const response = await authAxios.get("patient/doctor_list");
    return response.data;
};
export const patient_side_doctore_complete_details = async (pk) => {
    const response = await authAxios.get(`patient/doctor_select/${pk}`);
    return response.data;
};
export const patient_side_doctor_time_slot = async (doctorId, date) => {
    const response = await authAxios.get(`patient/doctor/time-slots/${doctorId}/${date}/`);
    return response.data;
};
export const make_patient_appointment = async (data) => {
    const response = await authAxios.post("patient/make_appointments",data);
    return response.data;
};
export const all_user_appointments = async () => {
    const response = await authAxios.get("patient/get_all_appointment");
    return response.data;
};

// ///////////////////////////////////////////////////////////////////////////////////////////////