import React from 'react';

function TopCasesCard({ topCases }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg  h-[300px]  m-0">
      <h2 className="text-lg font-semibold">Top 5 Cases Today</h2>
      <ul>
        {topCases.map((caseItem, index) => (
          <li key={index} className="text-gray-600">
            {caseItem}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopCasesCard;
