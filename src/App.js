import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Home from "./components/Home";
import About from "./components/About";
import Hero from "./components/Hero";
import Search from "./components/Search";
import Contact from "./components/Contact";
import HospitalDetails from "./components/HospitalDetails";
import Reviews from "./components/Reviews";
import ReviewDetails from "./components/ReviewDetails";
import FormikEval from "./components/FormikEval";
import ProfilePage from "./components/ProfilePage";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.600" height="100vh" display="flex" flexDirection="column">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:hospitalId" element={<HospitalDetails />} />
            <Route path="/search/:hospitalId/eval" element={<FormikEval />} />
            <Route path="/search/:hospitalId/reviews" element={<Reviews />} />
            <Route
              path="/search/:hospitalId/:reviewId"
              element={<ReviewDetails />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profilePage" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
