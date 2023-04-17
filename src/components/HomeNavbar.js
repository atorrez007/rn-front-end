import React from "react";
import { Box, Button, Flex, Image, Input, Spacer } from "@chakra-ui/react";
import mainLogo from "../assets/RN-reviews now.png";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

const HomeNavbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  return (
    <Flex
      bg="#737373"
      w="auto"
      h="150px"
      p="3"
      m="1"
      borderRadius="10"
      borderColor="black"
    >
      <Profile />
      {/* <Spacer /> */}
      {isAuthenticated ? (
        <Box mt="8">
          <Button
            onClick={() => {
              logout({ returnTo: window.location.origin });
            }}
            rounded="3xl"
            ml="55px"
            mr="10"
            colorScheme="red"
            boxShadow="dark-lg"
            _hover={{ background: "gray.600" }}
            _active={{ background: "whitesmoke", color: "black" }}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <Box mt="8">
          <Button
            onClick={() => {
              loginWithRedirect();
            }}
            ml="120px"
            mr="10"
            colorScheme="red"
            rounded="3xl"
            boxShadow="dark-lg"
            _hover={{ background: "gray.600" }}
            _active={{ background: "whitesmoke", color: "black" }}
          >
            Log in
          </Button>
          {/* <Button
            rounded="3xl"
            mr="1"
            colorScheme="red"
            boxShadow="dark-lg"
            _hover={{ background: "gray.600" }}
            _active={{ background: "whitesmoke", color: "black" }}
          >
            Sign up
          </Button> */}
        </Box>
      )}
      {/* <Box mt="8">
        <Button
          onClick={() => {
            loginWithRedirect();
          }}
          ml="120px"
          mr="10"
          colorScheme="red"
          rounded="3xl"
          boxShadow="dark-lg"
          _hover={{ background: "gray.600" }}
          _active={{ background: "whitesmoke", color: "black" }}
        >
          Log in
        </Button>
        <Button
          rounded="3xl"
          mr="1"
          colorScheme="red"
          boxShadow="dark-lg"
          _hover={{ background: "gray.600" }}
          _active={{ background: "whitesmoke", color: "black" }}
        >
          Sign up
        </Button>
      </Box> */}

      <Spacer />

      <Box w="649px" h="-140px">
        <Image alt="RN-Logo" src={mainLogo} w="649px" h="138px" />
      </Box>

      <Spacer />

      <Input
        _hover={{ boxShadow: "dark-lg" }}
        _focus={{ boxShadow: "dark-lg" }}
        bg="rgb(237,242,247)"
        border="none"
        boxShadow="dark-lg"
        mt="8"
        textAlign="left"
        placeholder="Where to next?"
        w="sm"
      />
    </Flex>
  );
};

export default HomeNavbar;
