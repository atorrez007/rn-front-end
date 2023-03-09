import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Reviews from "./Reviews";

const HospitalDetails = () => {
  // const params = useParams();
  const [thisHospital, setThisHospital] = useState([]);
  const { hospitalId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/hospitals/${hospitalId}`)
      .then((res) => res.json())
      .then((data) => setThisHospital(data));
  }, [hospitalId]);

  // Temporary solution, but will eliminate the need for the more specific endpoint. A link between the db and the id being used will need to be implemented.

  // const targetHospital = thisHospital.find(
  //   (hospital) => hospital.hospitalId === hospitalId
  // );

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
    <div className="flex bg-wetfloor-500">
      <Navbar />
      <div className="flex justify-center w-full">
        <div className="text-center w-full h-full border bg-white-border bg-white border-gray-200  dark:bg-gray-800 dark:border-gray-700 rounded overflow-hidden shadow-lg ">
          <img
            className=" mt-3 w-[532px] h-[356px] mx-auto my-auto"
            src={thisHospital ? thisHospital.img : null}
            alt="hospital or city view"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              <h1>{thisHospital ? thisHospital.name : null}</h1>
            </div>
            <div className="text-gray-700 text-base">
              <p>{thisHospital ? thisHospital.address : null}</p>
              <p>{thisHospital ? thisHospital.city : null}</p>
              <p>{thisHospital ? thisHospital.zipCode : null}</p>
              <p>{thisHospital ? thisHospital.county : null}</p>
            </div>
          </div>
          <div className="px-6 pt-4 pb-2">
            {/* <Link to={`/search/${hospitalId}/reviews`}>
            
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Reviews
              </span>
            </Link> */}
            <Reviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
