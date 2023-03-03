import { BrowserRouter } from "react-router-dom";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Hero />
    </BrowserRouter>
  );
}

export default App;
