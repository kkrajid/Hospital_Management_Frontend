import React from 'react';

function PatientSurveysCard({ surveyCount }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg h-[300px]  m-0">
      <h2 className="text-lg font-semibold">Patient Surveys</h2>
      <p className="text-3xl font-bold text-green-500">{surveyCount}</p>
    </div>
  );
}

export default PatientSurveysCard;
