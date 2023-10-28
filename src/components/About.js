import React from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

const About = () => {
  return (
    <Box w="100%" h="45vh" bg="gray.500">
      <Box
        className="footer-container"
        maxW="1140px"
        margin="auto"
        display="grid"
        p="2"
        mt="8"
        gridTemplateColumns="1fr 2fr"
      >
        <Box
          className="right"
          display="flex"
          flexDirection="column"
          justifyContent="end"
          height="100%"
        >
          <Box>
            <Text fontSize="2xl" color="white">
              About
            </Text>
            <Text as="p" color="white">
              RN Reviews Now is a site by travel nurses for travel nurses.
            </Text>

            <Text as="p" color="white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget justo vel nunc vulputate suscipit. Fusce vel consequat est,
              id fermentum odio. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia Curae; Maecenas venenatis, arcu
              non efficitur interdum, justo ipsum pellentesque odio, vel
              tincidunt justo ligula sit amet mauris.
            </Text>
            <Box display="flex" mt="3">
              <Box fontSize="2xl" as="b"></Box>
              <FaLinkedin
                size={25}
                style={{ color: "white", marginRight: "1rem" }}
              />
              <Box fontSize="2xl" as="b">
                <FaTwitter
                  size={25}
                  style={{ color: "white", marginRight: "1rem" }}
                />
              </Box>
              <Box fontSize="2xl" as="b">
                <FaFacebook
                  size={25}
                  style={{ color: "white", marginRight: "1rem" }}
                />
              </Box>{" "}
              <Box fontSize="2xl" as="b">
                <FaInstagram
                  size={25}
                  style={{ color: "white", marginRight: "1rem" }}
                />
              </Box>{" "}
              <Box fontSize="2xl" as="b">
                <FaPinterest
                  size={25}
                  style={{ color: "white", marginRight: "1rem" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
