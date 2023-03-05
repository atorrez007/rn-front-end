import React from "react";
import { Link } from "react-router-dom";
import hospitalData from "../test-hospital-data";
import HospitalCard from "./HospitalCard";
import Navbar from "./Navbar";

// Previously the <Link> was used to wrap all the hospitals in a link, but now the link is entered into the hospital card component. If we want to change accessibility to allow clicking anywhere on the card, we can revert to putting the link in the hospitalData.map once again.
const Search = () => {
  const hospitals = hospitalData.map((hospital) => (
    <HospitalCard
      key={hospital.id}
      name={hospital.name}
      city={hospital.city}
      state={hospital.state}
      img={hospital.img}
      id={hospital.id}
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
