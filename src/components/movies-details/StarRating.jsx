import React, { useState } from 'react';

const StarRating = ({ rating, setRating, interactive = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="d-flex align-items-center gap-1">
      {[...Array(10)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={index}
            className={`btn p-0 border-0 bg-transparent fs-4 ${
              interactive ? 'hover-scale' : ''
            }`}
            onClick={() => interactive && setRating(starValue)}
            onMouseEnter={() => interactive && setHover(starValue)}
            onMouseLeave={() => interactive && setHover(0)}
            style={{ transition: 'transform 0.2s' }}
          >
            <span
              style={{
                color: (hover || rating) >= starValue ? '#FFD700' : '#6c757d',
              }}
            >
              ★
            </span>
          </button>
        );
      })}
      {interactive && (
        <span className="ms-2 text-muted small">
          {rating > 0 ? `${rating}/10` : 'Rate this movie'}
        </span>
      )}
    </div>
  );
};

export default StarRating;
