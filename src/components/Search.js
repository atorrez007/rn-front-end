import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHospitals, getHospitals } from "../redux/hospitalReducer";
import HospitalCard from "./HospitalCard";
import Pages from "./Pages";
import { Button, Box, Input, Select, Flex } from "@chakra-ui/react";
import HomeNavbar from "../components/HomeNavbar";

// import { useAuth0 } from "@auth0/auth0-react";
// Previously the <Link> was used to wrap all the hospitals in a link, but now the link is entered into the hospital card component. If we want to change accessibility to allow clicking anywhere on the card, we can revert to putting the link in the hospitalData.map once again.
const Search = () => {
  const dispatch = useDispatch();

  const allHospitals = useSelector((state) => state.hospitals.allHospitals);
  // const [resetPage, setResetPage] = useState(1);
  const hospitalCount = useSelector((state) => state.hospitals.hospitals.count);

  const hospitalState = useSelector((state) => state.hospitals.hospitals.data);

  // const currentUrl = useSelector((state) => state.hospitals.currentUrl);
  // console.log(currentUrl);

  const numOfPages = Math.ceil(hospitalCount / 12);

  const pageNumbers = [];
  for (let i = 1; i <= numOfPages; i++) {
    pageNumbers.push(i);
  }
  const handlePageChange = (page) => {
    setPage(page);
  };

  // const [rawData, setRawData] = useState([]);
  // allHospitals query to be used later
  // const [fullList, setFullList] = useState([]);
  const [page, setPage] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  // const { getAccessTokenSilently } = useAuth0();
  // You can access auth0 token from almost anywhere by calling this method in your functions.
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
    const fetchData = async () => {
      try {
        await dispatch(getAllHospitals()); // Wait for the API call to complete before proceeding
      } catch (error) {
        console.error(`React error ${error}`);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        dispatch(getHospitals(url));
      } catch (error) {
        console.log(error);
      }
    };
    fetchHospitalData();
    // setResetPage(1);
  }, [dispatch, url]);

  // Raw data query to populate states and cities in search bar.
  let statesFiltered;
  let citiesFiltered;

  if (allHospitals.data) {
    const uniqueStates = allHospitals.data
      .map((hospital) => hospital.state)
      .filter((state, index, arr) => {
        return arr.indexOf(state) === index;
      })
      .sort();
    statesFiltered = uniqueStates.map((item, index) => {
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

    citiesFiltered = allHospitals.data
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
  }

  // const hospitals = hospitalState?.map((hospital) => (
  //   <HospitalCard
  //     key={hospital.hospitalId}
  //     name={hospital.name}
  //     city={hospital.city}
  //     state={hospital.state}
  //     img={hospital.img}
  //     id={hospital.hospitalId}
  //     overallScore={hospital.overallScore}
  //   />
  // ));

  const hospitals = hospitalState?.map((hospital) => (
    <HospitalCard
      key={hospital.hospitalId}
      name={hospital.name}
      city={hospital.city}
      state={hospital.state}
      img={hospital.img}
      id={hospital.hospitalId}
      overallScore={hospital.overallScore}
      reviews={hospital.reviews}
    />
  ));

  // const hospitalID = hospitalState?.map((hospital) =>
  //   console.log(`hospitalID goes here. ${hospitalId}`)
  // );

  return (
    <Box bg="gray.600" w="auto" p={8}>
      <HomeNavbar />
      <Flex pt="4" justify="center">
        <Box mr="1">
          <Select
            bg="white"
            value={selectedState}
            onChange={handleStateChange}
            mb={4}
          >
            {allHospitals.data ? statesFiltered : null}
          </Select>
        </Box>
        <Box mr="1">
          <Select
            bg="white"
            value={selectedCity}
            onChange={handleCityChange}
            mb={4}
          >
            {allHospitals.data ? citiesFiltered : null}
          </Select>
          <Box>
            <Button colorScheme="yellow" onClick={resetSearchParams}>
              Reset Search
            </Button>
          </Box>
        </Box>
        <form onChange={setSearchQuery} onSubmit={setSearchQuery}>
          <Input
            bg="white"
            onChange={handleSearchTermChange}
            value={searchTerm}
            focus={{ shadow: "outline" }}
            placeholder="Search anything..."
          />
        </form>
      </Flex>
      <Box mx="auto" maxW="6xl" mt={8}>
        <Box
          bg="gray.600"
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap="10"
        >
          {hospitals ? hospitals : null}
        </Box>
      </Box>
      <Pages handlePageChange={handlePageChange} state={state} />
    </Box>
  );
};

export default Search;
