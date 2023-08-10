import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

import Reviews from "./Reviews";

const HospitalDetails = () => {
  const [thisHospital, setThisHospital] = useState([]);
  const { hospitalId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/hospitals/${hospitalId}`)
      .then((res) => res.json())
      .then((data) => setThisHospital(data));
  }, [hospitalId]);

  return (
    <Box bg="wetfloor.500" display="flex">
      <Box h="100vh" flex="1" display="flex" justifyContent="center">
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
            src={thisHospital ? thisHospital.img : null}
            alt="hospital or city view"
          />

          <Box px={6} py={4}>
            <Box fontWeight="bold" fontSize="xl" mb={2}>
              <Heading>{thisHospital ? thisHospital.name : null}</Heading>
            </Box>
            <Box color="gray.700" fontSize="base">
              <Text>{thisHospital ? thisHospital.address : null}</Text>
              <Text>{thisHospital ? thisHospital.city : null}</Text>
              <Text>{thisHospital ? thisHospital.zipCode : null}</Text>
              <Text>{thisHospital ? thisHospital.county : null}</Text>
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
