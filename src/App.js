import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Hero from "./components/Hero";
import Search from "./components/Search";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="md:flex md:p-1 p-1 sm:p-1  md:bg-gray-600 bg-gray-600 flex flex-col h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
