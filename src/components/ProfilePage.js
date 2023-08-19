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
import SavedHospitalsDashboard from "../SavedHospitalsDashboard";
const ProfilePage = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();

  const changePage = (route) => {
    navigate(`${route}`);
  };

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

  return user ? (
    <Box>
      <Card align="center" mb="4" overflow="auto">
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
      <Flex justify="center" spacing={4} ml={20} pl={20}>
        <ReviewDashboard />

        <SavedHospitalsDashboard />
      </Flex>
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
