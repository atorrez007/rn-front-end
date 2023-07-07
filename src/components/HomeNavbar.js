import React from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Box, Button, Flex, Image, Input, Spacer } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import mainLogo from "../assets/RN-reviews now.png";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { loginWithPopup } = useAuth0();
  const { logout } = useAuth0();

  const loginFunc = async () => {
    await loginWithPopup();
  };

  const logoutFunc = () => {
    logout({ returnTo: window.location.origin });
  };

  // This is used to test the protected endpoint through auth0, but will be disabled for now.
  // const fetchRequest = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     // console.log(token);

  //     // const response = await axios.get("http://localhost:8000/getHospitals");

  //     const response = await axios.get("http://localhost:8000/testing", {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });

  //     console.log(response.data);
  //   } catch (err) {
  //     console.log(`Error message: ${err}`);
  //   }

  //   // const jsonData = await response.json();
  //   // console.log(jsonData);
  // };

  const changePage = () => {
    navigate("/search");
  };

  useEffect(() => {
    const sendAuthDetails = async () => {
      try {
        if (user) {
          // console.log(user);
          await axios
            .post("http://localhost:8000/signup", {
              auth0sub: user.sub,
              nickname: user.nickname,
              email: user.email,
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          // console.log(JSON.stringify(user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    sendAuthDetails();
  }, [user]);

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
      {isAuthenticated && user ? (
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    logoutFunc();
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
              <MenuButton
                borderRadius="full"
                isActive={isOpen}
                as={Button}
                colorScheme="gray"
              >
                <ChevronDownIcon />
              </MenuButton>
            </>
          )}
        </Menu>
      ) : null}

      {isAuthenticated && user ? (
        <Box mt="8">
          {/* <Button
            onClick={() => {
              logoutFunc();
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
          </Button> */}
          <Button
            ml="8"
            onClick={() => {
              changePage();
            }}
          >
            Get Hospitals
          </Button>
        </Box>
      ) : (
        <Box mt="8">
          <Button
            onClick={() => {
              // loginWithPopup();
              loginFunc();
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
