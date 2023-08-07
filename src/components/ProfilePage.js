import { Avatar, Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import ReviewDashboard from "./ReviewDashboard";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();

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
    <Box bg="gray.600">
      <Card align="center" mb="4">
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
      <Box pl="4">
        <ReviewDashboard />
      </Box>
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
