import React from 'react';
import AdminNavBar from '../../Components/AdminComponents/AdminNavBar';
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar';
import Dashboard from '../../Components/AdminComponents/PageComponents/Dashboard';
import {useSelector,useDispatch } from 'react-redux'
import Doctors from '../../Components/AdminComponents/PageComponents/Doctors';
import Patients from '../../Components/AdminComponents/PageComponents/Patients';
import ICU from '../../Components/AdminComponents/PageComponents/ICU';
import Settings from '../../Components/AdminComponents/PageComponents/Settings';
import { useAuthStore } from "../../Store/auth";
import { selectDashboard } from '../../Redux/Actions/selectDashboardActions'
function AdminDashboard() {
  const filed_type = useSelector(state => state.adminDashboardSelectionButton.filed_type);
  const dispatch = useDispatch()

  let componentToRender;

  switch (filed_type) {
    case "Dashboard":
      componentToRender = <Dashboard/>;
      break;
    case "Doctors":
      componentToRender = <Doctors/>;
      break;
    case "Patients":
      componentToRender = <Patients/>;
      break;
    case "ICU":
      componentToRender = <ICU/>;
      break;
    case "Settings":
      componentToRender = <Settings/>;
      break;
    case "Logout":
      useAuthStore.getState().logout();
      dispatch(selectDashboard(""))
      break;
      
    default:
      componentToRender = <Dashboard/>; 
      break;
  }


  return (
    <div className="flex flex-col h-screen">
      <AdminNavBar />
      <div className="flex flex-row flex-grow">
        <AdminSidebar />
        <div className="flex-grow p-4 ml-20">
          <div className="overflow-y-auto max-h-[calc(100vh-64px)]">
          {componentToRender}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
