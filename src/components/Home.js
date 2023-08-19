import React from "react";
import HomeNavbar from "./HomeNavbar";
import { Box } from "@chakra-ui/react";

// 3 quadrants.
// 1. Top page explains the about.
// 2. Preview of search component. (styled example) What it looks like when you sign up. (styled example)
// 3. Sign up component.

const Home = () => {
  return (
    <Box>
      <HomeNavbar />
    </Box>
  );
};

export default Home;
