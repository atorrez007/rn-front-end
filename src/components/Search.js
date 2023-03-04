import React from "react";
import HospitalCard from "./HospitalCard";
import Navbar from "./Navbar";

const Search = () => {
  return (
    <div className="flex bg-wetfloor-500">
      <Navbar />

      <div className="p-4 w-full border-black border-solid">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-10">
            <HospitalCard />
            <HospitalCard />
            <HospitalCard />
            <HospitalCard />
            <HospitalCard />
            <HospitalCard />
            <HospitalCard />
            <HospitalCard />
            <HospitalCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
