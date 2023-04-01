import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHospitals, getHospitals } from "../redux/hospitalReducer";
import HospitalCard from "./HospitalCard";
import Navbar from "./Navbar";

// Previously the <Link> was used to wrap all the hospitals in a link, but now the link is entered into the hospital card component. If we want to change accessibility to allow clicking anywhere on the card, we can revert to putting the link in the hospitalData.map once again.
const Search = () => {
  const dispatch = useDispatch();
  const hospitalState = useSelector((state) => state.hospitals.hospitals);

  const [rawData, setRawData] = useState([]);
  // const [hospitalData, setHospitalData] = useState([]);
  const [page, setPage] = useState("1");
  const [state, setState] = useState("AK");
  // const [rawQuery, setRawQuery] = useState(false);
  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const url = `http://localhost:8000/hospitals?page=${page}&state=${state}`;

  useEffect(() => {
    dispatch(getAllHospitals());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHospitals(url));
  }, [dispatch, url]);

  // Query db without state middleware.
  // useEffect(() => {
  //   fetch(`http://localhost:8000/hospitals?page=${page}&state=${state}`)
  //     .then((res) => res.json())
  //     .then((data) => setHospitalData(data));
  // }, [page, state]);

  // This is a query without redux. Will replace with new redux call.
  useEffect(() => {
    fetch(`http://localhost:8000/hospitals?allHospitals=true`)
      .then((res) => res.json())
      .then((data) => {
        setRawData(data);
        // dispatch(getHospitals(url)); // dispatching after getting all data
      });
  }, [dispatch, url]);

  // const uniqueCities = rawData
  //   .map((hospital) => hospital.city)
  //   .filter((city, index, arr) => {
  //     return arr.indexOf(city) === index;
  //   })
  //   .sort();

  // const uniqueCities = [
  //   ...new Set(hospitalState.map((hospital) => hospital.city)),
  // ];

  // const citiesFiltered = uniqueCities.map((city, index) => {
  //   return <option key={index}>{city}</option>;
  // });
  const citiesFiltered = rawData
    .filter((hospital) => hospital.state === state)
    .map((hospital) => hospital.city)
    .filter((city, index, arr) => {
      return arr.indexOf(city) === index;
    })
    .sort()
    .map((city, index) => {
      return <option key={index}>{city}</option>;
    });

  // The only problem with this is that I'm querying only the first page.
  // const citiesFiltered = uniqueCities.map((city, index) => (
  //   <option key={index}>{city}</option>
  // ));

  const uniqueStates = rawData
    .map((hospital) => hospital.state)
    .filter((state, index, arr) => {
      return arr.indexOf(state) === index;
    })
    .sort();

  const statesFiltered = uniqueStates.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const hospitals = hospitalState.map((hospital) => (
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
        <div className="bg-blizzard-800 border-2 border-white rounded h-10 py-8 mb-10 flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <input
            type="text"
            className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
            placeholder="Search anything..."
          />
          <div className="">
            <label className="p-4 h-12 rounded text-center"></label>
            <select className="" onChange={handleStateChange}>
              <option value="AL">Choose a State</option>
              {statesFiltered}
            </select>
          </div>
          <div className="absolute top-4 right-3">
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
          </div>
          <div className="">
            <label className="p-4 h-12 rounded text-center"></label>
            <select>
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
