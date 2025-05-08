import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movies }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movies.id}`);
  };

  return (
    <div className="col-6 col-sm-4 col-md-3 mb-4" onClick={handleClick}>
      <div className="card bg-dark text-white border-0 position-relative movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
          className="card-img rounded"
          alt={movies.title}
        />
        <div className="position-absolute top-0 end-0 bg-dark px-2 py-1 rounded-start text-warning fw-bold">
          ⭐ {movies.vote_average.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
