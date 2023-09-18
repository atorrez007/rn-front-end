import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardFooter, Text, Tooltip } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getHospitals } from "../redux/hospitalReducer";
import { getReviews } from "../redux/reviewReducer";
import { getUserReviews } from "../redux/userReducer";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const Reviews = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth0();

  const currentUrl = useSelector((state) => state.hospitals.currentUrl);
  const currentHospitalReviews = useSelector((state) => state.reviews.reviews);
  const reviewsWritten = useSelector((state) => state.users.reviewsWritten);
  const [hasReviewFromUser, setHasReviewFromUser] = useState(false);
  dayjs.extend(relativeTime);

  const currentReviewURL = `${baseURL}/hospitals/${hospitalId}/reviews`;

  useEffect(() => {
    const fetchReviewData = async (currentReviewURL) => {
      try {
        dispatch(getReviews(currentReviewURL));
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviewData(currentReviewURL);
  }, [dispatch, currentReviewURL]);

  useEffect(() => {}, []);

  useEffect(() => {
    const getUserDetails = async () => {
      if (user) {
        const userURL = `${baseURL}/users/${user.sub}`;
        dispatch(getUserReviews(userURL));

        // console.log(userURL);
      } else {
        console.log(`getting user details, please wait.`);
      }
    };
    getUserDetails();
  }, [user, dispatch, baseURL]);

  useEffect(() => {
    const reviewLoop = async () => {
      await reviewsWritten.forEach((review) => {
        if (review.hospital.hospitalId === hospitalId) {
          setHasReviewFromUser(true);
        }
      });
    };
    reviewLoop();
  }, [hospitalId]);

  const handleReviewChange = (reviewId) => {
    navigate(`/search/${hospitalId}/${reviewId}`);
  };

  const handleReviewAdd = (hospitalId) => {
    navigate(`/search/${hospitalId}/eval`);
  };

  const handleBackClick = () => {
    navigate(-1);
    dispatch(getHospitals(currentUrl));
  };

  const reviewBreakdown = currentHospitalReviews.map((review) => {
    // const shortDayFormat = dayjs(review.date).format("MM/DD/YY");
    const relativeTime = dayjs(review.date).fromNow();

    return (
      <AccordionItem key={review._id}>
        <h2>
          <AccordionButton _expanded={{ color: "gray" }}>
            <Text as="i" flexShrink={0} marginRight={2}>
              {relativeTime}
            </Text>
            <Box flex="1" mr="4" textAlign="end">
              {review.overallScore}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={8}>
          {review.text}
          <Box>
            <Button
              m="4"
              onClick={() => {
                handleReviewChange(review._id);
              }}
            >
              See more
            </Button>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    );
  });

  return (
    <Card direction="column" alignItems="center">
      <Box width="550px" height="auto" py="4">
        <Box as="div" display="flex" justifyContent="center" mb="2">
          <Button
            mr="4"
            colorScheme="yellow"
            onClick={() => {
              handleBackClick();
            }}
          >
            Back
          </Button>
          {!hasReviewFromUser ? (
            <Button
              colorScheme="green"
              onClick={() => {
                handleReviewAdd(hospitalId);
              }}
            >
              Add Review
            </Button>
          ) : (
            <Tooltip
              label="You already left a review for this hospital."
              placement="top"
              hasArrow
            >
              <Button
                colorScheme="green"
                isDisabled
                onClick={() => {
                  handleReviewAdd(hospitalId);
                }}
              >
                Add Review
              </Button>
            </Tooltip>
          )}
        </Box>

        <Accordion width="100%" height="100%" alignItems="center" allowMultiple>
          {/* {hasReviewFromUser.toString()} */}
          {reviewBreakdown}
        </Accordion>
      </Box>
      <CardFooter height="250px"></CardFooter>
    </Card>
  );
};

export default Reviews;
