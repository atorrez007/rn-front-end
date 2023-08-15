import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getHospitals } from "../redux/hospitalReducer";
import { getReviews } from "../redux/reviewReducer";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const Reviews = () => {
  // const [reviews, setReviews] = useState([]);
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUrl = useSelector((state) => state.hospitals.currentUrl);
  const currentHospitalReviews = useSelector((state) => state.reviews.reviews);
  dayjs.extend(relativeTime);
  // console.log(currentHospitalReviews);
  // const reduxURL = useSelector((state) => state.reviews.currentUrl);

  const currentReviewURL = `http://localhost:8000/hospitals/${hospitalId}/reviews`;

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

  const handleReviewChange = (reviewId) => {
    navigate(`/search/${hospitalId}/${reviewId}`);
  };

  const handleReviewAdd = (hospitalId) => {
    navigate(`/search/${hospitalId}/eval`);
  };

  const handleBackClick = () => {
    navigate(`/search`);
    dispatch(getHospitals(currentUrl));
  };

  const reviewBreakdown = currentHospitalReviews.map((review) => {
    // const shortDayFormat = dayjs(review.date).format("MM/DD/YY");
    const relativeTime = dayjs(review.date).fromNow();

    return (
      // <Link key={review._id} to={`/search/${hospitalId}/${review._id}`}>
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
          <Button
            m="4"
            onClick={() => {
              handleReviewChange(review._id);
            }}
          >
            See more
          </Button>
        </AccordionPanel>
      </AccordionItem>

      // </Link>
    );
  });

  return (
    <Flex direction="column" alignItems="center">
      <Box width="550px" py="4">
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
          <Button
            colorScheme="green"
            onClick={() => {
              handleReviewAdd(hospitalId);
            }}
          >
            Add Review
          </Button>
        </Box>
        <Center>
          <Accordion width="100%" alignItems="center" allowMultiple>
            {reviewBreakdown}
          </Accordion>
        </Center>
      </Box>
    </Flex>
  );
};

export default Reviews;
