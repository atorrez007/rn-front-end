import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Hero from "./components/Hero";
import Search from "./components/Search";
import Contact from "./components/Contact";
import HospitalDetails from "./components/HospitalDetails";
import Reviews from "./components/Reviews";
import ReviewDetails from "./components/ReviewDetails";
// import EvalForm from "./components/EvalForm";
import FormikEval from "./components/FormikEval";
import { Box } from "@chakra-ui/react";
import ProfilePage from "./components/ProfilePage";
function App() {
  return (
    <Box
      className="md:flex md:bg-gray-600 bg-gray-600 flex flex-col min-h-screen"
      height="100vh"
    >
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
  );
}

export default App;
