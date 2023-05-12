import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Pages = ({ handlePageChange, state }) => {
  const hospitalCount = useSelector((state) => state.hospitals.hospitals.count);
  const [currentPage, setCurrentPage] = useState(1);

  const numOfPages = Math.ceil(hospitalCount / 12);
  const pageNumbers = [];
  for (let i = 1; i <= numOfPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    handlePageChange(1);
    setCurrentPage(1);
  }, [state]);

  let listedPages;
  if (numOfPages <= 10) {
    // Display all pages if there are 10 or fewer
    listedPages = pageNumbers.map((page) => {
      return (
        <li
          key={page}
          onClick={() => {
            handlePageChange(page);
            setCurrentPage(page);
          }}
          className={`px-3 py-2 leading-tight border ${
            currentPage === page ? "bg-gray-200" : "bg-white"
          }`}
        >
          {page}
        </li>
      );
    });
  } else {
    // Display up to 10 pages, with ellipsis if there are more
    let startIndex = Math.max(currentPage - 5, 1);
    let endIndex = Math.min(startIndex + 9, numOfPages);
    if (endIndex === numOfPages) {
      startIndex = Math.max(endIndex - 9, 1);
    }

    const pagesToDisplay = pageNumbers.slice(startIndex - 1, endIndex);
    listedPages = pagesToDisplay.map((page) => {
      return (
        <li
          key={page}
          onClick={() => {
            handlePageChange(page);
            setCurrentPage(page);
          }}
          className={`px-3 py-2 leading-tight border ${
            currentPage === page ? "bg-gray-200" : "bg-white"
          }`}
        >
          {page}
        </li>
      );
    });

    if (startIndex > 1) {
      listedPages.unshift(
        <li key="ellipsis-start" className="px-3 py-2 leading-tight border">
          ...
        </li>
      );
    }
    if (endIndex < numOfPages) {
      listedPages.push(
        <li key="ellipsis-end" className="px-3 py-2 leading-tight border">
          ...
        </li>
      );
    }
  }

  return (
    <div className=" m-4 py-4 mr-4  text-center max-w-full">
      <nav aria-label="">
        <ul className="inline-flex items-center -space-x-px">
          <button
            onClick={() => {
              handlePageChange(currentPage - 1);
              setCurrentPage(currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            <p className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fillRule="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </p>
          </button>
          {listedPages}
          <li>
            <button
              // disabled={currentPage === numOfPages}
              onClick={() => {
                handlePageChange(currentPage + 1);
                setCurrentPage(currentPage + 1);
              }}
              disabled={currentPage === numOfPages}
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fillRule="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pages;
