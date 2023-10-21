import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PrivateRoute, AdminPrivateRoute, DoctorPrivateRoute } from "./Components/PrivateRoute"
import Layout from "./Components/Layout"
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/PatientSide/LoginPage"
import RegisterPage from "./Pages/PatientSide/RegisterPage"
import NotFound from "./Pages/NotFound"
import DoctorLoginPage from "./Pages/DoctorSide/DoctorLoginPage"
import AdminLoginPage from "./Pages/AdminSide/AdminLoginPage"
import OTPVerification from "./Pages/PatientSide/OTPVerification"
import DoctorDashboard from "./Pages/DoctorSide/DoctorDashboard"
import PatientsPage from "./Pages/AdminSide/PatientsPage"
import ICUPage from "./Pages/AdminSide/ICUPage"
import SettingsPage from "./Pages/AdminSide/SettingsPage"
import DoctorsPage from "./Pages/AdminSide/DoctorsPage"
import DashboardPage from "./Pages/AdminSide/DashboardPage"
import AddDoctorPage from "./Pages/AdminSide/AddDoctorPage"
import AddPatientsPage from "./Pages/AdminSide/AddPatientsPage"
import PatientSideBar from "./Pages/PatientSide/PageComponents/PatientSideBar"
import PatientDashboard from "./Pages/PatientSide/PatientDashboard"
import PatientDoctorPage from "./Pages/PatientSide/PatientDoctorPage"
import PatientAppointmentPage from "./Pages/PatientSide/PatientAppointmentPage"
import PatientChatPage from "./Pages/PatientSide/PatientChatPage"
import IndividulaDoctor from "./Pages/PatientSide/IndividulaDoctor"

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="doctor/login" element={<DoctorLoginPage />} />



                    <Route path="patient/appointments" element={<PatientAppointmentPage />} />
                    <Route path="patient/chat" element={<PatientChatPage />} />



                    <Route path="admin/login" element={<AdminLoginPage />} />
                    <Route path="patient/verification" element={<OTPVerification />} />
                    <Route path="*" element={<NotFound />} />


                    <Route path="patient" element={<PrivateRoute />} >
                        <Route path="profile" element={<PatientDashboard />} />
                        <Route path="doctors" element={<PatientDoctorPage />} />
                        <Route path="doctors/:page" element={<IndividulaDoctor />} />

                        {/* <Route index element={<AdminDashboard />} /> */}
                    </Route>

                    <Route path="doctor" element={<DoctorPrivateRoute />} >
                        <Route index element={<DoctorDashboard />} />
                    </Route>


                    <Route path="admin" element={<AdminPrivateRoute />} >
                        <Route index element={<DashboardPage />} />
                        <Route path="patients" element={<PatientsPage />} />
                        <Route path="patients/addpatient" element={<AddPatientsPage />} />
                        <Route path="doctors/addDoctor" element={<AddDoctorPage />} />
                        <Route path="doctors" element={<DoctorsPage />} />
                        <Route path="icu" element={<ICUPage />} />
                        <Route path="settings" element={<SettingsPage />} />
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