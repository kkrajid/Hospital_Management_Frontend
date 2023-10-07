import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../Store/auth";

export const PrivateRoute = () => {
  const { isAuth, role } = useAuthStore();
  return isAuth && role === "patient" ? <Outlet /> : <Navigate to="/login" />;
};

export const AdminPrivateRoute = () => {
  const { isAuth, role } = useAuthStore();
  return isAuth && role === "admin" ? <Outlet /> : <Navigate to="/admin/login" />;
};

export const DoctorPrivateRoute = () => {
  const { isAuth, role } = useAuthStore();
  return isAuth && role === "doctor" ? <Outlet /> : <Navigate to="/doctor/login" />;
};
