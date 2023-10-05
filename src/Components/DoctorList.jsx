import React from 'react';
import DoctorCard from './DoctorCard'; 

function DoctorList() {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {/* {doctors?.map((doctor, index) => (
        <DoctorCard  />
      ))} */}
      <DoctorCard />
      <DoctorCard  />
      <DoctorCard  />
      <DoctorCard  />
    </div>
  );
}

export default DoctorList

