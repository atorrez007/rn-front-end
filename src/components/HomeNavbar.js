import React from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Box, Button, Flex, Image, Spacer } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import mainLogo from "../assets/rn-logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
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

  const changePage = (route) => {
    navigate(`${route}`);
  };

  useEffect(() => {
    const sendAuthDetails = async () => {
      try {
        if (user) {
          // console.log(user);
          await axios
            .post(`${baseURL}/signup`, {
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
  }, [user, baseURL]);

  return (
    <Flex
      bg="#737373"
      w="100%"
      h="130px"
      p="3"
      mt="3"
      borderRadius="10"
      borderColor="black"
      alignItems="start"
      justifyContent="space-between"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Profile />
      {isAuthenticated && user ? (
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    changePage("/profilePage");
                  }}
                >
                  Profile
                </MenuItem>
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
        <Box mt="8" display="flex">
          <Button
            ml="8"
            onClick={() => {
              changePage("/search");
            }}
          >
            Get Hospitals
          </Button>
        </Box>
      ) : (
        <Box mt="8">
          <Button
            onClick={() => {
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
            Log in / Sign up
          </Button>
        </Box>
      )}

      <Box flex="2" display="flex" justifyContent="center" alignItems="center">
        <Image
          alt="RN-Logo"
          src={mainLogo}
          pl="3"
          w={{ base: "80%", md: "400px" }}
          h="81px"
          ml="75px"
        />
      </Box>
      <Spacer />
    </Flex>
  );
};

export default HomeNavbar;
