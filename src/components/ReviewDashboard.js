import React from "react";
import { Card, CardHeader, Accordion, Text } from "@chakra-ui/react";
import ReviewAccordion from "./ReviewAccordion";
import { useSelector } from "react-redux";

const ReviewDashboard = () => {
  const reviews = useSelector((state) => state.users.reviewsWritten);

  // const reviews = [1, 2, 3];
  return (
    <Card pt="2" w="33%">
      <CardHeader size="xl">Reviews Written</CardHeader>
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
    </Card>
  );
};

export default ReviewDashboard;
