import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PrivateRoute, AdminPrivateRoute, DoctorPrivateRoute } from "./Components/PrivateRoute"
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
import LoadingSpinner from "./Components/LoadingSpinner"
import DoctorDashboard from "./Pages/DoctorSide/DoctorDashboard"
import Dashboard from "./Components/AdminComponents/PageComponents/Dashboard"
import Doctors from "./Components/AdminComponents/PageComponents/Doctors"
import Patients from "./Components/AdminComponents/PageComponents/Patients"
import ICU from "./Components/AdminComponents/PageComponents/ICU"
import Settings from "./Components/AdminComponents/PageComponents/Settings"
import PatientsPage from "./Pages/AdminSide/PatientsPage"
import ICUPage from "./Pages/AdminSide/ICUPage"
import SettingsPage from "./Pages/AdminSide/SettingsPage"
import DoctorsPage from "./Pages/AdminSide/DoctorsPage"
import DashboardPage from "./Pages/AdminSide/DashboardPage"
import AddDoctorPage from "./Pages/AdminSide/AddDoctorPage"
import AddPatientsPage from "./Pages/AdminSide/AddPatientsPage"

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
                <Route path="*" element={<NotFound/>} />


                <Route path="patient" element={<PrivateRoute/>} >

                    {/* <Route index element={<AdminDashboard />} /> */}
                </Route>

                <Route path="doctor" element={<DoctorPrivateRoute/>} >
                    <Route index element={<DoctorDashboard/>} />
                </Route>

    
                <Route path="admin" element={<AdminPrivateRoute />} >
                    <Route index element={<DashboardPage/>} />
                    <Route path="patients" element={<PatientsPage/>} />
                    <Route path="patients/addpatient" element={<AddPatientsPage/>} />
                    <Route path="doctors/addDoctor" element={<AddDoctorPage/>} />
                    <Route path="doctors" element={<DoctorsPage/>} />
                    <Route path="icu" element={<ICUPage/>} />
                    <Route path="settings" element={<SettingsPage/>} />
                </Route> 
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App

















       {/* <Route path="add" element={<AddProductPage />} />
                    <Route path="edit/:id" element={<EditProductPage />} /> */}


                {/* <Route path="cate" element={<CatePage />} />
                <Route path="cate/:cate" element={<SearchByCate />} /> */}

                {/* <Route element={<PrivateRoute />} >

                    <Route path="profile" element={<UserProfile />} />
                    <Route path="order/:id" element={<SoloOrder />} />
                </Route>
            </Route> */}