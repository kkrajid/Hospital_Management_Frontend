import React from 'react';

function PatientSurveysCard({ surveyCount }) {
  return (
    <div className=" flex bg-[#4C7FF3] shadow-md justify-center items-center p-4 rounded-lg h-[150px]  m-0">
      <h2 className="text-lg font-semibold">Patient Surveys</h2>
      <p className="text-3xl font-bold text-green-500">{surveyCount}</p>
    </div>
  );
}

export default PatientSurveysCard;
