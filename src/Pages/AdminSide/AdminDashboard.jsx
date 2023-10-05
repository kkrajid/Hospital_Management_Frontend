import React from 'react';
import AdminNavBar from '../../Components/AdminComponents/AdminNavBar';
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar';
import Card from '../../Components/AdminComponents/Card';

function AdminDashboard() {
  return (
    <div className="relative">
      {/* AdminNavBar */}
      <div className="absolute top-0 inset-0">
        <AdminNavBar />
      </div>
      
      {/* AdminSidebar */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <AdminSidebar />
      </div>
      
      {/* Card */}
      <div className="absolute" style={{ zIndex: 2 }}>
        {/* <Card /> */}
      </div>
    </div>
  );
}

export default AdminDashboard;
