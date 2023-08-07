import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import SaveItem from "./SaveItem";
import { Image, Box, Text, Flex, Button } from "@chakra-ui/react";

const HospitalCard = ({
  name,
  city,
  state,
  img,
  id,
  overallScore,
  reviews,
}) => {
  const handleSave = () => {
    alert(`${name}, 
    ${city},
    ${state},
    ${img},
    ${id},
    ${overallScore},
    ${reviews}`);
  };

  return (
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
    >
      <Image
        p={8}
        borderTopRadius="lg"
        src={img}
        alt="hospital or popular city view"
      />
      <Box p={5} maxW="300px">
        <SaveItem handleSave={handleSave} />
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
  );
};

export default HospitalCard;
