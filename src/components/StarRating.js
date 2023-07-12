import Star from "./Star";
import { useEffect, useState } from "react";
function StarRating({ overallScore }) {
  const [rating, setRating] = useState(0);

  useEffect(() => setRating(overallScore / 2), [overallScore]);
  return (
    <span className="flex items-center ml-12">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star key={value} filled={value <= rating} />
      ))}
    </span>
  );
}
export default StarRating;
