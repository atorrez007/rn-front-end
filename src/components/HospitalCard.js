import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import SaveItem from "./SaveItem";

import { Image, Box, Text, Flex, Button, Skeleton } from "@chakra-ui/react";

import { useAuth0 } from "@auth0/auth0-react";

const HospitalCard = ({
  name,
  city,
  state,
  img,
  id,
  overallScore,
  reviews,
}) => {
  const { user } = useAuth0();

  // Check if the hospital is already saved. This will return a true/false statement. This will be passed as props to the saveItem component to map out the filled heart icons with true and empty heart icons with false.
  const isHospitalSaved = user
    ? JSON.parse(localStorage.getItem(`hospitalList_${user.sub}`))?.some(
        (hospital) => hospital.id === id
      )
    : false;

  const handleSave = () => {
    if (user) {
      const hospitalObject = {
        name,
        city,
        state,
        img,
        id,
        overallScore,
      };

      // This will get the existing hospital list for the user from localStorage
      const userHospitalListKey = `hospitalList_${user.sub}`;

      const existingHospitalList =
        JSON.parse(localStorage.getItem(userHospitalListKey)) || [];

      // Update the hospital list will be updated and then stored it in localStorage
      const updatedHospitalList = [...existingHospitalList, hospitalObject];
      localStorage.setItem(
        userHospitalListKey,
        JSON.stringify(updatedHospitalList)
      );
    }
  };

  const handleUnsave = () => {
    if (user) {
      const userHospitalListKey = `hospitalList_${user.sub}`;

      const existingHospitalList =
        JSON.parse(localStorage.getItem(userHospitalListKey)) || [];

      const updatedHospitalList = existingHospitalList.filter(
        (hospital) => hospital.id !== id
      );

      localStorage.setItem(
        userHospitalListKey,
        JSON.stringify(updatedHospitalList)
      );
    }
  };

  return (
    <Box>
      {user ? (
        <Box
          maxW="xs"
          // borderWidth="1px"
          // borderRadius="lg"
          overflow="hidden"
          bg="white"
          boxShadow="md"
          transition="transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)"
          _hover={{
            transform: "scale(1.05)",
          }}
        >
          <Box position="relative">
            <Image
              // p={8}
              // borderTopRadius="lg"
              src={img}
              alt="hospital or popular city view"
            />
            <Box
              position="absolute"
              top="8px"
              right="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="white"
              borderRadius="50%"
              width="35px"
              height="35px"
              boxShadow="md"
              pt="2"
            >
              <SaveItem
                style={{ margin: "auto", transform: "translateY(4px)" }}
                handleSave={handleSave}
                handleUnsave={handleUnsave}
                isLiked={isHospitalSaved}
              />
            </Box>
          </Box>
          <Box p={5} maxW="300px">
            {/* <SaveItem handleSave={handleSave} /> */}
            <Text fontSize="xl" fontWeight="semibold" color="gray.900">
              {name}
            </Text>
            <Text fontSize="md" fontWeight="thin" color="gray.900">
              {city}, {state}
            </Text>
            <Flex align="center" mt={2.5} mb={5}>
              <StarRating
                overallScore={overallScore ? Math.floor(overallScore) : "0"}
              />
              <Text as="b" fontSize="sm" color="gray.500" p="4">
                {reviews.length} reviews
              </Text>
            </Flex>
            <Flex w="250px" align="center" justify="flex-end">
              <Link to={`/search/${id}`}>
                <Button
                  color="white"
                  bg="blue.700"
                  _hover={{ bg: "blue.800" }}
                  _focus={{ ring: "4", outline: "none", ringColor: "blue.300" }}
                  fontWeight="medium"
                  rounded="lg"
                  fontSize="sm"
                  px={5}
                  py={2.5}
                  textAlign="center"
                >
                  See More
                </Button>
              </Link>
            </Flex>
          </Box>
        </Box>
      ) : (
        //Generate a loading skeleton while user is loaded.
        <Skeleton height="350px" w="300px"></Skeleton>
      )}
    </Box>
  );
};

export default HospitalCard;
