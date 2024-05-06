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
import DoctorDashboard from "./Pages/DoctorSide/DoctorDashboardPage"
import PatientDashboardPage from "./Pages/PatientSide/PatientDashboardPage"
import PatientDoctorPage from "./Pages/PatientSide/PatientDoctorPage"
import PatientAppointmentPage from "./Pages/PatientSide/PatientAppointmentPage"
import PatientChatPage from "./Pages/PatientSide/PatientChatPage"
import IndividulaDoctor from "./Pages/PatientSide/IndividulaDoctor"
import DoctorTimeSlotePage from "./Pages/DoctorSide/DoctorTimeSlotePage"
import PatientProfilePage from "./Pages/PatientSide/PatientProfilePage"
import DoctorDashboardPage from "./Pages/DoctorSide/DoctorDashboardPage"
import AdminDashboardPage from "./Pages/AdminSide/AdminDashboardPage"
import AdminDoctorsPage from "./Pages/AdminSide/AdminDoctorsPage"
import AdminPatientsPage from "./Pages/AdminSide/AdminPatientsPage"
import AdminSettingsPage from "./Pages/AdminSide/AdminSettingsPage"
import DoctorProfilePage from "./Pages/DoctorSide/DoctorProfilePage"
import DoctorAppointmentPage from "./Pages/DoctorSide/DoctorAppointmentPage"
import DoctorChatPage from "./Pages/DoctorSide/DoctorChatPage"
import Patient_Appointment_Detail_View_Page from "./Pages/PatientSide/Patient_Appointment_Detail_View_Page"
import Doctor_Appointment_Detail_View_Page from "./Pages/DoctorSide/Doctor_Appointment_Detail_View_Page"
import DoctorIcuPatientsPage from "./Pages/DoctorSide/DoctorIcuPatientsPage"
import DoctorIcuDetail_ViewPage from "./Pages/DoctorSide/DoctorIcuDetail_ViewPage"
import StripeCheckoutComponent from "./Pages/PatientSide/PageComponents/Stripe/StripeCheckoutComponent"
import AdminDoctorDetailViewPage from "./Pages/AdminSide/AdminDoctorDetailViewPage"
import PatientWalletPage from "./Pages/PatientSide/PatientWalletPage"
import Sample from "./Pages/Sample"
import DoctorNotificationPage from "./Pages/DoctorSide/DoctorNotificationPage"
import LandingPage from "./Pages/LandingPage/LandingPage"


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    {/* <Route index element={<HomePage />} /> */}
                    <Route index element={<LandingPage/>} />
                    
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="doctor/login" element={<DoctorLoginPage />} />
                    <Route path="admin/login" element={<AdminLoginPage />} />
                    <Route path="patient/verification" element={<OTPVerification />} />
                    <Route path="sample" element={<Sample/>} />
                    <Route path="*" element={<NotFound />} />
                   
                    
                    <Route path="patient" element={<PrivateRoute />} >
                        <Route path="dashboard" element={<PatientDashboardPage />} />
                        <Route path="profile" element={<PatientProfilePage/>} />
                        <Route path="doctors" element={<PatientDoctorPage />} />
                        <Route path="doctors/:page" element={<IndividulaDoctor />} />
                        <Route path="payment/:payment_app" element={<StripeCheckoutComponent/>} />
                        <Route path="appointments" element={<PatientAppointmentPage />} />
                        <Route path="appointments/:appointmentId" element={<Patient_Appointment_Detail_View_Page/>} />
                        <Route path="wallet" element={<PatientWalletPage/>} />
                    </Route>

                    <Route path="doctor" element={<DoctorPrivateRoute />} >
                        <Route index element={<DoctorDashboardPage/>} />
                        <Route path="profile" element={<DoctorProfilePage/>} />
                        <Route path="timeslote" element={<DoctorTimeSlotePage/>} />
                        <Route path="icu" element={<DoctorIcuPatientsPage />}/>
                        <Route path="icu/:icuId" element={<DoctorIcuDetail_ViewPage/> }/>
                        <Route path="appointments" element={<DoctorAppointmentPage/>} />
                        <Route path="notifications" element={<DoctorNotificationPage/>} />
                        <Route path="appointments/:appointmentId" element={<Doctor_Appointment_Detail_View_Page/>} />
                        <Route path="chat" element={<DoctorChatPage/>} />
                    </Route>


                    <Route path="admin" element={<AdminPrivateRoute />} >
                        <Route index element={<AdminDashboardPage/>} />
                        <Route path="doctors" element={<AdminDoctorsPage/>} />
                        <Route path="doctors/:admin_side_doctor_id" element={<AdminDoctorDetailViewPage/>} />
                        <Route path="patients" element={<AdminPatientsPage/>} />
                        <Route path="settings" element={<AdminSettingsPage/>} />
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