import React from "react";
import Navbar from "./Navbar";

export const Hero = () => {
  return (
    <div className="md:flex p-1">
      <Navbar />
      <div className="bg-gray-600 w-screen p-4 ">
        <p className="text-white font-bold text-lg">Welcome to my Homepage</p>
        <div className=" text-white font-bold text-lg bg-wetfloor-600">
          <h3>Content</h3>
        </div>
      </div>
    </div>
  );
};

export default Hero;
