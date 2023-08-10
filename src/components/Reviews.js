import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Center, Flex } from "@chakra-ui/react";

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

  // Replace this useEffect with the reviewReducer to get review data.
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/hospitals/${hospitalId}/reviews`)
  //     .then((response) => {
  //       setReviews(response.data[0].reviews);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [hospitalId]);

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

  // Reviews from api request. To be deleted.
  // const reviewBreakdown = reviews.map((review) => {
  //   return (
  //     // <Link key={review._id} to={`/search/${hospitalId}/${review._id}`}>
  //     <tr
  //       key={review._id}
  //       className="bg-slate-400 flex p-2 w-full h-[66%] items-center border border-black"
  //       onClick={() => {
  //         handleReviewChange(review._id);
  //       }}
  //     >
  //       <td>{review.overallScore}</td>
  //     </tr>
  //     // </Link>
  //   );
  // });

  // const reviewBreakdown = currentHospitalReviews.map((review) => {
  //   return (
  //     // <Link key={review._id} to={`/search/${hospitalId}/${review._id}`}>
  //     <tr
  //       key={review._id}
  //       className="bg-slate-400 flex p-2 w-full h-[66%] items-center border border-black"
  //       onClick={() => {
  //         handleReviewChange(review._id);
  //       }}
  //     >
  //       <td>{review.overallScore}</td>
  //     </tr>
  //     // </Link>
  //   );
  // });

  const reviewBreakdown = currentHospitalReviews.map((review) => {
    return (
      // <Link key={review._id} to={`/search/${hospitalId}/${review._id}`}>
      <AccordionItem key={review._id}>
        <h2>
          <AccordionButton _expanded={{ color: "white" }}>
            <Box as="span" flex="1" textAlign="center">
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
