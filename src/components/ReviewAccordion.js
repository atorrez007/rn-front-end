import { AccordionItem, AccordionPanel, Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const ReviewAccordion = ({ specialty, hospital }) => {
  return (
    <AccordionItem p="2">
      <h2>
        <Link>
          <Box as="span" flex="1" p="2" textAlign="left">
            <Text as="b">
              {hospital.name} - (<Text as="i">{specialty}</Text>)
            </Text>
          </Box>
        </Link>
      </h2>
      <AccordionPanel pb={4}></AccordionPanel>
    </AccordionItem>
  );
};

export default ReviewAccordion;
