import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import SaveItem from "./SaveItem";
import { Image, Text } from "@chakra-ui/react";

const HospitalCard = ({
  name,
  city,
  state,
  img,
  id,
  overallScore,
  reviews,
}) => {
  return (
    <div className="text-center w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* <h1>{overallScore ? Math.floor(overallScore) : "No Reviews Left "}/10</h1> */}

      <SaveItem />
      <Image
        className="p-8 rounded-t-lg"
        src={img}
        alt="hospital or popular city view"
      />

      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="text-lg text-left p-2 tracking-tight break-words text-gray-900 dark:text-white">
          {city},
          <span className="text-lg text-left p-1 break-words tracking-tight text-gray-900 dark:text-white">
            {state}
          </span>
        </p>

        <div className="flex items-center mt-2.5 mb-5">
          <StarRating
            overallScore={overallScore ? Math.floor(overallScore) : "0"}
          />
          <Text as="b" fontSize="sm" color="gray.500" p="4">
            {reviews.length} reviews
          </Text>
        </div>
        <div className="flex items-center justify-between">
          <Link
            to={`/search/${id}`}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
