import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import Polaroid from "./components/Polaroid";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="sm:bg-gray-600 md:bg-gray-600">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/polaroid" element={<Polaroid />} />
      </Routes>
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
