import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Flex } from "@chakra-ui/react";

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
        <Button
          key={page}
          onClick={() => {
            handlePageChange(page);
            setCurrentPage(page);
          }}
          px={3}
          py={2}
          mt={1}
          mr={1}
          rounded="md"
          colorScheme={currentPage === page ? "gray" : "blue"}
          size="sm"
        >
          {page}
        </Button>
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
        <Button
          key={page}
          onClick={() => {
            handlePageChange(page);
            setCurrentPage(page);
          }}
          px={3}
          py={2}
          mt={1}
          mr={1}
          rounded="md"
          colorScheme={currentPage === page ? "gray" : "blue"}
          size="sm"
        >
          {page}
        </Button>
      );
    });

    if (startIndex > 1) {
      listedPages.unshift(
        <Button
          key="ellipsis-start"
          px={3}
          py={2}
          mt={1}
          mr={1}
          rounded="md"
          size="sm"
          disabled
        >
          ...
        </Button>
      );
    }
    if (endIndex < numOfPages) {
      listedPages.push(
        <Button
          key="ellipsis-end"
          px={3}
          py={2}
          mt={1}
          mr={1}
          rounded="md"
          size="sm"
          disabled
        >
          ...
        </Button>
      );
    }
  }

  return (
    <Flex justify="center" mt={4}>
      <Box>
        <Button
          onClick={() => {
            handlePageChange(currentPage - 1);
            setCurrentPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
          px={3}
          py={2}
          mr={1}
          rounded="md"
          colorScheme="gray"
          size="sm"
        >
          Previous
        </Button>
        {listedPages}
        <Button
          onClick={() => {
            handlePageChange(currentPage + 1);
            setCurrentPage(currentPage + 1);
          }}
          disabled={currentPage === numOfPages}
          px={3}
          py={2}
          ml={1}
          rounded="md"
          colorScheme="gray"
          size="sm"
        >
          Next
        </Button>
      </Box>
    </Flex>
  );
};

export default Pages;
