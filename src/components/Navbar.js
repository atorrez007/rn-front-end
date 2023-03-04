import React, { useEffect, useState } from "react";
import { NavButton } from "./NavButton";
import { useMediaQuery } from "react-responsive";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Navbar = () => {
  const pages = [
    { name: "Home", query: "" },
    { name: "About", query: "about" },
    { name: "Search Hospital", query: "search" },
    { name: "Contact", query: "contact" },
  ];
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [active, setActive] = useState(pages[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    isMobile ? setOpen(false) : setOpen(true);
  }, [isMobile]);

  return (
    <div className="md:flex">
      <div className="bg-blizzard-900 relative px-0 py-3 md:min-h-screen md:w-[250px] md:text-left text-center flex flex-col">
        {isMobile && (
          <button
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? (
              <XMarkIcon className=" hover:bg-blizzard-600 rounded-full mt-2 p-2 w-12 text-white absolute top-2 left-2" />
            ) : (
              <Bars3Icon className="hover:bg-blizzard-600 rounded-full mt-2 w-12 p-2 text-white absolute top-2 left-2" />
            )}
          </button>
        )}
        <div className="w-full">
          <h1 className="text-lg text-center mb-2 bg-blizzard-800   text-white font-bold p-4 md:text-center md:p-4 ">
            RN-RightNow
          </h1>
        </div>
        {open &&
          pages.map((page) => {
            return (
              <Link key={page.name} to={`/${page.query}`}>
                <NavButton
                  key={page.name}
                  page={page.name}
                  active={active}
                  setActive={setActive}
                  open={open}
                  setOpen={setOpen}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Navbar;
