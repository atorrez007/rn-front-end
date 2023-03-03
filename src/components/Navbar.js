import React, { useEffect, useState } from "react";
import { NavButton } from "./NavButton";
import { useMediaQuery } from "react-responsive";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Hero from "./Hero";

const Navbar = () => {
  const pages = ["Home", "Search Hospitals", "About", "Contact"];
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [active, setActive] = useState(pages[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    isMobile ? setOpen(false) : setOpen(true);
  }, [isMobile]);

  return (
    <div className="md:flex ">
      <div className="bg-blizzard-900 relative p-3 md:min-h-screen md:w-[250px] md:text-left text-center flex flex-col">
        {isMobile && (
          <button
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? (
              <XMarkIcon className=" hover:bg-blizzard-600 rounded-full p-2 w-12 text-white absolute top-2 left-2" />
            ) : (
              <Bars3Icon className="hover:bg-blizzard-600 rounded-full w-12 p-2 text-white absolute top-2 left-2" />
            )}
          </button>
        )}
        <h1 className="text-lg text-center text-white font-bold  md:text-left md:p-4 ">
          RN-RightNow
        </h1>
        {open &&
          pages.map((page) => {
            return (
              <NavButton
                key={page}
                page={page}
                active={active}
                setActive={setActive}
                open={open}
                setOpen={setOpen}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Navbar;
