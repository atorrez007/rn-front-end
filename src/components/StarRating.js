import { Box } from "@chakra-ui/react";
import Star from "./Star";
import { useEffect, useState } from "react";
function StarRating({ overallScore }) {
  const [rating, setRating] = useState(0);

  useEffect(() => setRating(overallScore / 2), [overallScore]);
  return (
    <Box as="span" display="flex" className="flex items-center ml-12">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star key={value} filled={value <= rating} />
      ))}
    </Box>
  );
}
export default StarRating;
