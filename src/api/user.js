import { authAxios, axi } from "./UseAxios";



//**///////////////////////////////////////D0CT0R SIDE////////////////////////////////////////////////**//
export const DoctorloginRequest = async (data) => {
    const response = await axi.post("doctor/login", data);
    return response;
};
export const Doctor_Dashboard = async () => {
    const response = await authAxios.get("doctor/dashboard");
    return response.data;
};
export const Doctor_Dashboard_all = async () => {
    const response = await authAxios.get("doctor/dashboard_all");
    return response.data;
};


export const Doctor_time_slote_create = async (data) => {
    const response = await authAxios.post("doctor/create_time_slots", data);
    return response.data;
};
export const Doctor_all_time_slote_ = async (date) => {
    const response = await authAxios.get(`doctor/all_time_slots?date=${date}`);
    return response.data;
};
export const Doctor_delete_time_slot = async (data) => {
    console.log(data, 34544);
    const response = await authAxios.post("doctor/doctor_delete_time_slots", { time_slot: data });
    return response.data;
};
export const doctor_profile_detail = async () => {
    const response = await authAxios.get("doctor_profile_detail");
    return response.data;
};
export const DoctorProfile_add_or_update = async (formData) => {
    const response = await authAxios.patch(`doctor_profile_detail`, formData)
    return response.data;
};

export const all_user_appointments_for_doctor = async (data) => {
    const response = await authAxios.get(`doctor/get_all_appointment_of_doctor?data=${data}`);
    return response.data;
};
export const doctor_get_detail_appointments_view = async (id) => {
    const response = await authAxios.get(`doctor/appointments/${id}/`);
    return response.data;
};

export const doctor_get_all_icu_patients = async () => {
    const response = await authAxios.get(`doctor/all_icu_patients/`);
    return response.data;
};

export const Doctor_submitICUPatient = async (data) => {
    const response = await authAxios.post("doctor/add_icu_patient/", data);
    return response.data;
};

export const createPrescription = async (prescriptionData) => {
    try {
        const response = await authAxios.post('doctor/create_prescription/', prescriptionData);
        console.log('Prescription created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating prescription:', error);
        throw error;
    }
};

export const getPrescriptions = async (appointmentId) => {
    try {
        const response = await authAxios.get(`doctor/get-prescriptions/${appointmentId}/`);
        console.log('Prescriptions for appointment:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching prescriptions for appointment ${appointmentId}:`, error);
        throw error;
    }
};

export const Doctor_Manage_Appointment_Status = async (appointmentId, data) => {
    try {
        const response = await authAxios.patch(`doctor/appointments/${appointmentId}/update-status/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating appointment status:', error);
        throw error;
    }
};

export const get_doctor_all_alert_from_icu_patients = async () => {
    const response = await authAxios.get(`notifications/`);
    return response.data;
};

export const  fetchNotificationUsers = async (user_ids) => {

      const response = await authAxios.get('doctor/get_notification_patient/', {
        params: {
          user_ids: user_ids.join(','), 
        },
      });
      return response.data;
  };
//**///////////////////////////////////////ADMIN SIDE////////////////////////////////////////////////**//

export const AdminloginRequest = async (data) => {
    const response = await axi.post("admin/login", data);
    return response;
};
export const admin_add_new_doctor = async (data) => {
    const response = await authAxios.post("admin/add_doctor", data);
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
    const response = await authAxios.post("admin/create-doctor/", data);
    return response.data;
};
export const fetchAllPatients = async () => {
    const response = await authAxios.get("admin/all_patients");
    return response.data;
};
export const adminblockUsers = async (userIds) => {
    const response = await authAxios.patch("admin/block-users/", { id: userIds });
    return response.data;
}
export const adminunblockUsers = async (userIds) => {
    const response = await authAxios.patch("admin/unblock-users/", { id: userIds });
    return response.data;
}

export const admin_dashboard_data = async () => {
    const response = await authAxios.get("admin/admin_dashboard_data/");
    return response.data;
};

export const adminunblockDoctor = async (userIds,isBlocked) => {
    const response = await authAxios.patch("admin/updateBlockStatusOfDoctor/", { id: userIds,is_blocked: !isBlocked});
    return response.data;
}

export const get_admin_doctor_detail_view = async (id) => {
    const response = await authAxios.get(`admin/doctors/${id}/`);
    return response.data;
};


export const adminUpdateDoctorCharge = async ({id,service_charge}) => {
    const response = await authAxios.patch(`admin/doctors/${id}/`,{service_charge});
    return response.data;
}

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
    const response = await axi.post("login", data);
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
    const response = await authAxios.post("patient/make_appointments", data);
    return response.data;
};
export const all_user_appointments = async () => {
    const response = await authAxios.get("patient/get_all_appointment");
    return response.data;
};
export const get_detail_appointments_view = async (id) => {
    const response = await authAxios.get(`patient/appointments/${id}/`);
    return response.data;
};

export const CancelAppointmentApi = async (id) => {
    const response = await authAxios.post(`patient/cancel_appointment/${id}/`);
    return response.data;
};

export const user_refund_amount_api = async () => {
    const response = await authAxios.get("patient/refund-amount/");
    return response.data;
};

// ///////////////////////////////////////////////////////////////////////////////////////////////