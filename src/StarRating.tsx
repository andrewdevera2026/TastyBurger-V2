import React from "react";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const clamped = Math.max(0, Math.min(5, rating));
  const percentage = (clamped / 5) * 100;

  return (
    <div className="star-rating">
      <div className="stars-empty">★★★★★</div>
      <div className="stars-filled" style={{ width: `${percentage}%` }}>
        ★★★★★
      </div>
    </div>
  );
};

export default StarRating;