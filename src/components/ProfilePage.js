import { Avatar, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
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
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();

  // const userURL = `http://localhost:8000/users/${user.sub}`;
  const changePage = (route) => {
    navigate(`${route}`);
  };
  useEffect(() => {
    const getUserDetails = () => {
      if (user) {
        console.log(user.sub);
      } else {
        console.log(`getting user details, please wait.`);
      }
    };
    getUserDetails();
  });

  return user ? (
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
  ) : (
    <Box padding="20" boxShadow="xl" bg="white">
      <SkeletonCircle size="10" align="center" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default ProfilePage;
