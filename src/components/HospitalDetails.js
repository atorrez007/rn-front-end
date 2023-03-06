import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const HospitalDetails = () => {
  // const params = useParams();
  const [thisHospital, setThisHospital] = useState([]);
  const { hospitalId } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/hospitals")
      .then((res) => res.json())
      .then((data) => setThisHospital(data));
  });

  // Temporary solution, but will eliminate the need for the more specific endpoint. A link between the db and the id being used will need to be implemented.
  const targetHospital = thisHospital.find(
    (hospital) => hospital.hospitalId === hospitalId
  );
  // <div>
  //   <h1>Hospital Details</h1>
  //   <h1>{targetHospital ? targetHospital.name : null}</h1>
  //   <p>{targetHospital ? targetHospital.address : null}</p>
  //   <p>{targetHospital ? targetHospital.city : null}</p>
  //   <p>{targetHospital ? targetHospital.zipCode : null}</p>
  //   <p>{targetHospital ? targetHospital.county : null}</p>
  //   <p>{targetHospital ? targetHospital.phoneNumber : null}</p>
  //   <Link to={`/search/${hospitalId}/reviews`}>
  //     <h1>Reviews</h1>
  //   </Link>
  // </div>

  return (
    <div className="flex justify-center mt-10">
      <div className="text-center w-fit h-fit  border bg-white-border bg-white border-gray-200  dark:bg-gray-800 dark:border-gray-700 rounded overflow-hidden shadow-lg ">
        <img
          className="w-full"
          src="/img/card-top.jpg"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            <h1>{targetHospital ? targetHospital.name : null}</h1>
          </div>
          <div className="text-gray-700 text-base">
            <p>{targetHospital ? targetHospital.address : null}</p>
            <p>{targetHospital ? targetHospital.city : null}</p>
            <p>{targetHospital ? targetHospital.zipCode : null}</p>
            <p>{targetHospital ? targetHospital.county : null}</p>
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <Link to={`/search/${hospitalId}/reviews`}>
            {/* <h1>Reviews</h1> */}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Reviews
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
