import { Avatar, Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { getUserReviews } from "../redux/userReducer";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const reviews = useSelector((state) => state.users.reviewsWritten);

  const changePage = (route) => {
    navigate(`${route}`);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      if (user) {
        const userURL = `http://localhost:8000/users/${user.sub}`;
        dispatch(getUserReviews(userURL));
        // console.log(userURL);
      } else {
        console.log(`getting user details, please wait.`);
      }
    };
    getUserDetails();
  }, [user, dispatch]);

  return user ? (
    <Box>
      <Card align="center">
        <CardHeader>
          <Heading size="md"> Your Dashboard</Heading>
        </CardHeader>
        <Avatar src={user.picture} size="lg" />
        <CardBody>
          <Text>View your reviews and saved hospitals below.</Text>
        </CardBody>
        <CardFooter>
          <Button
            colorScheme="blue"
            onClick={() => {
              changePage("/search");
            }}
          >
            Back
          </Button>
        </CardFooter>
      </Card>
      <div>
        {reviews ? (
          reviews.map((review, index) => (
            <Box key={index}>
              <h1>{review.specialty}</h1>
            </Box>
          ))
        ) : (
          <Box padding="20" boxShadow="xl" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        )}
      </div>
    </Box>
  ) : (
    <Box padding="20" boxShadow="xl" bg="white">
      <Flex justify="center">
        <SkeletonCircle size="20" align="center" />
      </Flex>
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default ProfilePage;
