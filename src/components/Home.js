import React from "react";

import Navbar from "./Navbar";

// 3 quadrants.
// 1. Top page explains the about.
// 2. Preview of search component. (styled example) What it looks like when you sign up. (styled example)
// 3. Sign up component.

const Home = () => {
  return (
    <div className="flex">
      <Navbar />
      <h1>Home Page Landing</h1>
    </div>
  );
};

export default Home;
