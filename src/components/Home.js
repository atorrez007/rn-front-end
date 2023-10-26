import React from "react";
import HomeNavbar from "./HomeNavbar";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import coverPhoto from "../assets/cover-photo.jpg";
import HomeCard from "./HomeCard";
import tile1 from "../assets/tile-photo-1.jpg";
import tile4 from "../assets/tile-photo-4.jpg";
import tile3 from "../assets/tile-photo-3.jpg";
import About from "./About";

// 3 quadrants.
// 1. Top page explains the about.
// 2. Preview of search component. (styled example) What it looks like when you sign up. (styled example)
// 3. Sign up component.

const Home = () => {
  return (
    <Box
      m="0, auto"
      bg="gray.600"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <HomeNavbar />
      <Box
        position="relative" // Set the position property to relative
        h="70vh"
        w="100%"
      >
        <Image
          src={coverPhoto}
          alt="hero-image"
          h="70vh"
          w="100%"
          objectFit="cover"
          borderRadius="md"
          opacity=".3"
          mt="2"
        />
        <Box
          position="absolute"
          top="25%"
          left="32%"
          transform="translate(-50%, -50%)" // Center the text precisely
          color="white"
        >
          <Text fontSize="8xl">Reviews Now</Text>
          <Box ml="24">
            <Text as="i" ml="16" fontSize="4xl">
              It's all the rage in the salons.
            </Text>
          </Box>
          <Box position="absolute" top="120%" left="75%" w="33%">
            <Button
              colorScheme="teal"
              width="100%"
              h="50px"
              borderRadius="none"
            >
              Get Access
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="24" display="flex" ml="32" mb="20">
        <HomeCard
          imageSource={tile1}
          text="Browser through our database of hospitals and find the facility that's
          just right for you!"
        />
        <HomeCard
          imageSource={tile4}
          text="Browser through our database of hospitals and find the facility that's
          just right for you!"
        />
        <HomeCard
          imageSource={tile3}
          text="Browser through our database of hospitals and find the facility that's
          just right for you!"
        />
      </Box>
      <About />
    </Box>
  );
};

export default Home;
