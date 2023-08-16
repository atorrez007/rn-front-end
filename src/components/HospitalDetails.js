import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import Reviews from "./Reviews";
import { getSelectedHospital } from "../redux/hospitalReducer";

const HospitalDetails = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const dispatch = useDispatch();
  const { hospitalId } = useParams();
  const url = `${baseURL}/hospitals/${hospitalId}`;
  const selectedHospital = useSelector(
    (state) => state.hospitals.selectedHospital
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getSelectedHospital(url));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url, dispatch]);

  return (
    <Box display="flex">
      <Box flex="1" display="flex" justifyContent="center">
        <Box
          textAlign="center"
          width="full"
          height="full"
          border="1px"
          bg="white"
          borderColor="gray.200"
          borderRadius="md"
          overflow="hidden"
          shadow="md"
        >
          <Image
            mt={3}
            width="532px"
            height="356px"
            mx="auto"
            my="auto"
            src={selectedHospital ? selectedHospital.img : null}
            alt="hospital or city view"
          />

          <Box px={6} py={4}>
            <Box fontWeight="bold" fontSize="xl" mb={2}>
              <Heading>
                {selectedHospital ? selectedHospital.name : null}
              </Heading>
            </Box>
            <Box color="gray.700" fontSize="base">
              <Text>{selectedHospital ? selectedHospital.address : null}</Text>
              <Text>{selectedHospital ? selectedHospital.city : null}</Text>
              <Text>{selectedHospital ? selectedHospital.zipCode : null}</Text>
              <Text>{selectedHospital ? selectedHospital.county : null}</Text>
            </Box>
          </Box>
          <Box px={6} pt={4} pb={2}>
            <Reviews />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HospitalDetails;
