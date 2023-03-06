import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Hero from "./components/Hero";
import Search from "./components/Search";
import Contact from "./components/Contact";
import HospitalDetails from "./components/HospitalDetails";
import Reviews from "./components/Reviews";

function App() {
  return (
    <div className="md:flex md:bg-gray-600 bg-gray-600 flex flex-col h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:hospitalId" element={<HospitalDetails />} />
          <Route path="/search/:hospitalId/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
