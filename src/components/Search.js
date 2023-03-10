import React, { useState, useEffect } from "react";
import HospitalCard from "./HospitalCard";
import Navbar from "./Navbar";

// Previously the <Link> was used to wrap all the hospitals in a link, but now the link is entered into the hospital card component. If we want to change accessibility to allow clicking anywhere on the card, we can revert to putting the link in the hospitalData.map once again.
const Search = () => {
  const [rawData, setRawData] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);
  const [page, setPage] = useState("1");

  const changePage = (e) => {
    e.preventDefault();
    setPage(2);
  };

  // Query db without state middleware.
  useEffect(() => {
    fetch(`http://localhost:8000/hospitals?page=${page}`)
      .then((res) => res.json())
      .then((data) => setHospitalData(data));
  }, [page]);

  useEffect(() => {
    fetch(`http://localhost:8000/hospitals`)
      .then((res) => res.json())
      .then((data) => setRawData(data));
  }, []);

  const uniqueStates = rawData
    .map((hospital) => hospital.state)
    .filter((state, index, arr) => {
      return arr.indexOf(state) === index;
    })
    .sort();

  const uniqueCities = rawData
    .map((hospital) => hospital.city)
    .filter((city, index, arr) => {
      return arr.indexOf(city) === index;
    })
    .sort();

  const citiesFiltered = uniqueCities.map((city, index) => {
    return <option key={index}>{city}</option>;
  });

  const statesFiltered = uniqueStates.map((item, index) => {
    return <option key={index}>{item}</option>;
  });

  const hospitals = hospitalData.map((hospital) => (
    <HospitalCard
      key={hospital.hospitalId}
      name={hospital.name}
      city={hospital.city}
      state={hospital.state}
      img={hospital.img}
      id={hospital.hospitalId}
    />
  ));

  return (
    <div className="flex bg-wetfloor-500">
      <Navbar />
      <div className="p-11  w-full border-black border-solid">
        <div className=" border-2 border-rose-600 h-10 py-8 mb-10 flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <input
            type="text"
            className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
            placeholder="Search anything..."
          />
          <div className="">
            <label className="p-4 h-12 rounded text-center"></label>
            <select className="">
              <option>Choose a State</option>
              {statesFiltered}
            </select>
          </div>
          <div className="absolute top-4 right-3">
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
          </div>{" "}
          <div className="">
            <label className="p-4 h-12 rounded text-center"></label>
            <select className="">
              <option>Choose a City</option>
              {citiesFiltered}
            </select>
          </div>
          <div className="absolute top-4 right-3">
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
          </div>
        </div>
        {/* <button onClick={changePage}>Page 2</button> */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-10">{hospitals}</div>
        </div>
      </div>
    </div>
  );
};

export default Search;
