import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../Store/auth";
import jwt_decode from "jwt-decode";

export const PrivateRoute = () => {
  const { isAuth } = useAuthStore();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export const AdminPrivateRoute = () => {
  const token = useAuthStore.getState().access;
  const tokenDecoded = jwt_decode(token);
  const isAdmin = tokenDecoded.is_staff;
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};
