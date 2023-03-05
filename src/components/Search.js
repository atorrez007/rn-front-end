import React from "react";

import hospitalData from "../test-hospital-data";
import HospitalCard from "./HospitalCard";
import Navbar from "./Navbar";

const Search = () => {
  const hospitals = hospitalData.map((hospital) => (
    <HospitalCard
      key={hospital.id}
      name={hospital.name}
      city={hospital.city}
      state={hospital.state}
      img={hospital.img}
    />
  ));
  return (
    <div className="flex bg-wetfloor-500">
      <Navbar />

      <div className="p-4 w-full border-black border-solid">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-10">{hospitals}</div>
        </div>
      </div>
    </div>
  );
};

export default Search;
