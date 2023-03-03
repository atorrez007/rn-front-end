import { BrowserRouter } from "react-router-dom";
import Hero from "./components/Hero";

import Navbar from "./components/Navbar";
import Polaroid from "./components/Polaroid";
function App() {
  return (
    <BrowserRouter>
      <div className="md:flex p-4">
        <Navbar />
        <div>
          <Hero />
          <Polaroid />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
