import React from 'react';
function DoctorCard() {
  return (
    <div className="bg-white shadow-lg rounded-md p-10 mb-4 flex flex-col items-center">
      <img
        src={"https://th.bing.com/th/id/R.215c1ff399e961851cc11a7810886a0e?rik=oZfxvnavGwz6cA&riu=http%3a%2f%2fwww.writergirl.com%2fwp-content%2fuploads%2f2014%2f11%2fDoctor-790X1024.jpg&ehk=CmnYm47Si7SLogCKQcVQ9Onueou53ycpcjvFFc3Ej00%3d&risl=&pid=ImgRaw&r=0"}
        alt={"doctor name"}
        className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full mb-2"
      />
      <h2 className="text-lg sm:text-xl font-semibold text-center mt-2">
        {"Dr.Raju"}
      </h2>
      <p className="text-gray-600 text-sm sm:text-base text-center">
        {"doctor.specialization"}
      </p>
      <p className="mt-2 text-sm sm:text-base text-center">{"doctor.bio"}</p>
    </div>
  );
}

export default DoctorCard;

