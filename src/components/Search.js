import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHospitals, getHospitals } from "../redux/hospitalReducer";
import HospitalCard from "./HospitalCard";
import Navbar from "./Navbar";
import Pages from "./Pages";
import { Button, Box } from "@chakra-ui/react";
import Profile from "./Profile";

// Previously the <Link> was used to wrap all the hospitals in a link, but now the link is entered into the hospital card component. If we want to change accessibility to allow clicking anywhere on the card, we can revert to putting the link in the hospitalData.map once again.
const Search = () => {
  const dispatch = useDispatch();
  // const allHospitalsState = useSelector(
  //   (state) => state.hospitals.allHospitals
  // );
  // const [resetPage, setResetPage] = useState(1);
  const hospitalCount = useSelector((state) => state.hospitals.hospitals.count);
  const hospitalState = useSelector((state) => state.hospitals.hospitals.data);

  const numOfPages = Math.ceil(hospitalCount / 12);

  const pageNumbers = [];
  for (let i = 1; i <= numOfPages; i++) {
    pageNumbers.push(i);
  }
  const handlePageChange = (page) => {
    setPage(page);
  };

  const [rawData, setRawData] = useState([]);
  // allHospitals query to be used later
  // const [fullList, setFullList] = useState([]);
  const [page, setPage] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  // Set State and City handlers.
  const handleStateChange = (e) => {
    setCity("");
    setSelectedState(e.target.value);
    setState(e.target.value);
  };

  const resetSearchParams = () => {
    setSearchTerm("");
    setCity("");
    setState("");
    setSelectedState("");
    setQuery("");
    setPage("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setCity(e.target.value);
  };

  // Search term handler
  const handleSearchTermChange = (e) => {
    const string = e.target.value;
    // What is this searchTerm we're setting used for? Do we need it?
    setSearchTerm(string);
  };
  const setSearchQuery = (e) => {
    e.preventDefault();

    setQuery(searchTerm);
  };
  // url sent to Redux for backend query
  // add query to string.
  const url = `http://localhost:8000/hospitals?page=${page}&state=${state}&city=${city}&query=${query}`;

  useEffect(() => {
    dispatch(getAllHospitals());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHospitals(url));
    // setResetPage(1);
  }, [dispatch, url]);

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

  // const uniqueCities = rawData
  //   ?.map((hospital) => hospital.city)
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

  // The only problem with this is that I'm querying only the first page.
  // const citiesFiltered = uniqueCities.map((city, index) => (
  //   <option key={index}>{city}</option>
  // ));

  // Raw data query to populate states and cities in search bar.
  const uniqueStates = rawData
    .map((hospital) => hospital.state)
    .filter((state, index, arr) => {
      return arr.indexOf(state) === index;
    })
    .sort();

  const statesFiltered = uniqueStates.map((item, index) => {
    return (
      <option key={index + 1} value={item}>
        {item}
      </option>
    );
  });

  statesFiltered.unshift(
    <option value="Choose a State" key={0}>
      Choose a State
    </option>
  );

  const citiesFiltered = rawData
    .filter((hospital) => hospital.state === state)
    .map((hospital) => hospital.city)
    .filter((city, index, arr) => {
      return arr.indexOf(city) === index;
    })
    .sort()
    .map((city, index) => {
      return (
        <option city={city} value={city} key={index + 1}>
          {city}
        </option>
      );
    });

  citiesFiltered.unshift(
    <option value="Choose a City" key={0}>
      Choose a City
    </option>
  );

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
          <form onChange={setSearchQuery} onSubmit={setSearchQuery}>
            <input
              onChange={handleSearchTermChange}
              value={searchTerm}
              type="text"
              className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
              placeholder="Search anything..."
            />
          </form>
          <div className="">
            <label className="p-4 h-12 rounded text-center"></label>
            <select value={selectedState} onChange={handleStateChange}>
              {statesFiltered ? statesFiltered : null}
            </select>
          </div>
          <div className="absolute top-4 right-3">
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
          </div>
          <div className="">
            <label className="p-4 h-12 rounded text-center"></label>
            <select value={selectedCity} onChange={handleCityChange}>
              {citiesFiltered ? citiesFiltered : null}
            </select>
          </div>
          <Box ml="8">
            <Button colorScheme="yellow" onClick={resetSearchParams}>
              Reset Search
            </Button>
          </Box>
          <div className="absolute top-4 right-3">
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
          </div>
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-10">
            {hospitals ? hospitals : null}
          </div>
        </div>
        <Pages handlePageChange={handlePageChange} state={state} />
      </div>
    </div>
  );
};

export default Search;
