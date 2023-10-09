import React from 'react';
import AdminNavBar from '../../Components/AdminComponents/AdminNavBar';
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar';
function AdminDashboard({state}) {

  let componentToRender = state;


  return (
    <div className="flex flex-col ">
      <AdminNavBar  />
      <div className="flex flex-row  overflow-x-auto ">
        <AdminSidebar />
        <div className=" p-4 mt-12 ml-20 w-full">
          <div className="">
          {componentToRender}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
