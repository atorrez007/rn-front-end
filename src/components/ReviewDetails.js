import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewDetails } from "../redux/reviewReducer";
import {
  Stack,
  Card,
  CardBody,
  CardHeader,
  StackDivider,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";

const ReviewDetails = () => {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const reviewDetailsURL = `http://localhost:8000/reviews/${reviewId}`;
  const currentHospitalReviewDetails = useSelector(
    (state) => state.reviews.reviewDetails
  );
  // console.log(currentHospitalReviewDetails);

  useEffect(() => {
    const fetchReviewDetails = async (reviewDetailsURL) => {
      try {
        dispatch(getReviewDetails(reviewDetailsURL));
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviewDetails(reviewDetailsURL);
  }, [dispatch, reviewDetailsURL]);

  return (
    <Card maxW="600px" mx="33%">
      <CardHeader>
        <Heading size="md" textAlign="center">
          Hospital Report
        </Heading>
      </CardHeader>
      {currentHospitalReviewDetails ? (
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                Overall Score
              </Heading>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.overallScore}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                Dining Options
              </Heading>
              {currentHospitalReviewDetails?.diningOptions?.map(
                (item, index) => (
                  <Text key={index} pt="2" fontSize="sm" textAlign="center">
                    {item}
                  </Text>
                )
              )}
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                Shift
              </Heading>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.shift[0]}
              </Text>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.shift[1]}
              </Text>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.shift[2]}
              </Text>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.shift[3]}
              </Text>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.shift[4]}
              </Text>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.shift[5]}
              </Text>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.shift[6]}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                Nurse/Patient Ratio
              </Heading>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.nurseRatio}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                Charting Software
              </Heading>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.chartingSoftware}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                Accessibility
              </Heading>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.accessibility}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                Scrub Color
              </Heading>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.scrubColor}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                Housing
              </Heading>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.accommodations?.map(
                  (item, index) => (
                    <Text key={index}>{item}</Text>
                  )
                )}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                Safety
              </Heading>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.safety}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                Parking
              </Heading>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.parking}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" textAlign="center">
                Comment
              </Heading>
              <Text pt="2" fontSize="sm" textAlign="center">
                {currentHospitalReviewDetails.text}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      ) : (
        <h1>Loading...</h1>
      )}
    </Card>
  );
};

export default ReviewDetails;
