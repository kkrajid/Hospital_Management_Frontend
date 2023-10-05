import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PrivateRoute, AdminPrivateRoute } from "./Components/PrivateRoute"
import Layout from "./Components/Layout"

import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/PatientSide/LoginPage"
import RegisterPage from "./Pages/PatientSide/RegisterPage"
import NotFound from "./Pages/NotFound"
import DoctorLoginPage from "./Pages/DoctorSide/DoctorLoginPage"
import AdminLoginPage from "./Pages/AdminSide/AdminLoginPage"
import PatientProfilePage from "./Pages/PatientSide/PatientProfilePage"
import OTPVerification from "./Pages/PatientSide/OTPVerification"
import AdminSidebar from "./Components/AdminComponents/AdminSidebar"
import AdminNavBar from "./Components/AdminComponents/AdminNavBar"
import AdminDashboard from "./Pages/AdminSide/AdminDashboard"



// import AdminPage from "./pages/AdminPage"

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="doctor/login" element={<DoctorLoginPage/>} />
                <Route path="patient/profile" element={<PatientProfilePage/>} />
                <Route path="admin/login" element={<AdminLoginPage/>} />
                <Route path="patient/verification" element={<OTPVerification/>} />
                <Route path="dash" element={<AdminNavBar/>} />
                <Route path="dashboard" element={<AdminDashboard/>} />
                <Route path="*" element={<NotFound/>} />


                {/* <Route path="cate" element={<CatePage />} />
                <Route path="cate/:cate" element={<SearchByCate />} /> */}

                {/* <Route element={<PrivateRoute />} >

                    <Route path="profile" element={<UserProfile />} />
                    <Route path="order/:id" element={<SoloOrder />} />
                </Route>

                <Route path="admin" element={<AdminPrivateRoute />} >
                    <Route index element={<AdminPage />} />
                    <Route path="add" element={<AddProductPage />} />
                    <Route path="edit/:id" element={<EditProductPage />} />
                </Route> */}

            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App