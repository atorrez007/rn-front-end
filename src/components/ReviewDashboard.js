import React from "react";
import {
  Card,
  CardHeader,
  Accordion,
  Text,
  CardBody,
  Box,
} from "@chakra-ui/react";
import ReviewAccordion from "./ReviewAccordion";
import { useSelector } from "react-redux";

const ReviewDashboard = () => {
  const reviews = useSelector((state) => state.users.reviewsWritten);

  // const reviews = [1, 2, 3];
  return (
    <Box style={{ height: "600px", width: "1200px", overflow: "hidden" }}>
      <Card pt="2" w="33%" style={{ height: "100%", overflowY: "auto" }}>
        <CardHeader size="xl">
          <Text as="b">Your Reviews</Text>
        </CardHeader>
        <CardBody>
          <Accordion defaultIndex={[0]} allowMultiple>
            {reviews ? (
              reviews.map((review) => (
                <ReviewAccordion
                  key={review._id}
                  specialty={review.specialty}
                  hospital={review.hospital}
                />
              ))
            ) : (
              <Text>Loading...</Text>
            )}
          </Accordion>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ReviewDashboard;
