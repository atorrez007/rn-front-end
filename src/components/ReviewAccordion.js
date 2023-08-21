import { AccordionItem, AccordionPanel, Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

// Review accordion appears under the user's profile page for submitted hospital reviews.

const ReviewAccordion = ({ specialty, hospital, reviewId }) => {
  return (
    <AccordionItem p="2">
      <h2>
        <Link to={`/search/${hospital.hospitalId}/${reviewId}`}>
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
