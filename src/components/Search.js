import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHospitals, getHospitals } from "../redux/hospitalReducer";
import HospitalCard from "./HospitalCard";
import Navbar from "./Navbar";

// Previously the <Link> was used to wrap all the hospitals in a link, but now the link is entered into the hospital card component. If we want to change accessibility to allow clicking anywhere on the card, we can revert to putting the link in the hospitalData.map once again.
const Search = () => {
  const dispatch = useDispatch();
  // const allHospitalsState = useSelector(
  //   (state) => state.hospitals.allHospitals
  // );

  const hospitalCount = useSelector((state) => state.hospitals.hospitals.count);
  // console.log(hospitalCount);
  const hospitalState = useSelector((state) => state.hospitals.hospitals.data);
  // console.log(hospitalState);
  // console.log(hospitalState);

  const [rawData, setRawData] = useState([]);
  // allHospitals query to be used later
  const [fullList, setFullList] = useState([]);
  const [page, setPage] = useState("");
  const [state, setState] = useState("");

  // const numOfPages = Math.ceil(12);

  // const pageNumbers = [];
  // for (let i = 0; i <= numOfPages; i++) {}

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const url = `http://localhost:8000/hospitals?page=${page}&state=${state}`;

  useEffect(() => {
    dispatch(getAllHospitals());
  }, [dispatch]);

  // useEffect(() => {
  //   setFullList(allHospitalsState);
  // }, [allHospitalsState]);

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
      .then((hospitals) => {
        setRawData(hospitals.data);
        // console.log(hospitals.data);
        // dispatch(getHospitals(url)); // dispatching after getting all data
      });
  }, [dispatch, url]);

  const uniqueCities = rawData
    ?.map((hospital) => hospital.city)
    .filter((city, index, arr) => {
      return arr.indexOf(city) === index;
    })
    .sort();

  // const uniqueCities = [
  //   ...new Set(hospitalState.map((hospital) => hospital.city)),
  // ];

  // const citiesFiltered = uniqueCities.map((city, index) => {
  //   return <option key={index}>{city}</option>;
  // });

  // The only problem with this is that I'm querying only the first page.
  // const citiesFiltered = uniqueCities.map((city, index) => (
  //   <option key={index}>{city}</option>
  // ));

  // Rely on Raw Data

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

  // Redux allHospitals call to populate search state and city options
  // const otherUniqueStates = fullList
  //   ?.map((hospital) => hospital.state)
  //   .filter((state, index, arr) => {
  //     return arr.indexOf(state) === index;
  //   })
  //   .sort();

  // const otherStatesFiltered = otherUniqueStates?.map((item, index) => {
  //   return (
  //     <option key={index} value={item}>
  //       {item}
  //     </option>
  //   );
  // });

  // const otherCitiesFiltered = fullList
  //   ? fullList
  //       .filter((hospital) => hospital.state === state)
  //       .map((hospital) => hospital.city)
  //       .filter((city, index, arr) => {
  //         return arr.indexOf(city) === index;
  //       })
  //   : null;

  const hospitals = hospitalState?.map((hospital) => (
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
              {statesFiltered ? statesFiltered : null}
            </select>
          </div>
          <div className="absolute top-4 right-3">
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
          </div>
          <div className="">
            <label className="p-4 h-12 rounded text-center"></label>
            <select>
              <option>Choose a City</option>
              {citiesFiltered ? citiesFiltered : null}
            </select>
          </div>
          <div className="absolute top-4 right-3">
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
          </div>
        </div>
        {/* <button onClick={changePage}>Page 2</button> */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-10">
            {hospitals ? hospitals : null}
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <a
                href="/"
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fillRule="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="/"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="/"
                aria-current="page"
                className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="/"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="/"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fillRule="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Search;
