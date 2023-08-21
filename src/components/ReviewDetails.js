import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
  Spinner,
  Button,
} from "@chakra-ui/react";

const ReviewDetails = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const reviewDetailsURL = `${baseURL}/reviews/${reviewId}`;
  const currentHospitalReviewDetails = useSelector(
    (state) => state.reviews.reviewDetails
  );
  // console.log(currentHospitalReviewDetails);

  const handleReturn = () => {
    navigate(-1);
  };

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
    <Card maxW="600px" mx="33%" pt="4" py="4" mt="8">
      <Button
        onClick={() => {
          handleReturn();
        }}
      >
        Back to Reviews
      </Button>
      <CardHeader>
        <Heading size="md" textAlign="center">
          Hospital Report
        </Heading>
      </CardHeader>
      {currentHospitalReviewDetails ? (
        <CardBody style={{ maxHeight: "600px", overflowY: "auto" }}>
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
              <Text as="div" pt="2" fontSize="sm" textAlign="center">
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
        <Spinner size="xl" />
      )}
    </Card>
  );
};

export default ReviewDetails;
