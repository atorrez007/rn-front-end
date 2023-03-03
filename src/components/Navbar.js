import React, { useState } from "react";
import { NavButton } from "./NavButton";

const Navbar = () => {
  const pages = ["Home", "Search Hospitals", "About", "Contact"];
  const [active, setActive] = useState(pages[0]);

  return (
    <div className="bg-blizzard-900 flex justify-center">
      {/* <div className="p-3 bg-blizzard-900 flex justify-center">
        <img className="" src="" alt="RN logo"></img>
      </div> */}
      <div className="bg-blizzard-900 p-3 w-full mb-2 flex justify-center text-lg">
        {pages.map((page) => {
          return (
            <NavButton
              key={page}
              page={page}
              active={active}
              setActive={setActive}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
