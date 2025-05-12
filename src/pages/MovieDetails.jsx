import React from 'react';
import MovieTrailer from '../components/movies-details/MovieTrailer';
import MovieInfo from '../components/movies-details/MovieInfo';
import MovieCastInfo from '../components/movies-details/MovieCastInfo';
import { FaHeart, FaShareAlt, FaBookmark } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovieByIdAction } from '../store/movieSlice';
import { MovieReviews } from '../components/movies-details/MovieReviews';
import { AddReviewForm } from '../components/movies-details/AddReviewForm';

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentMovie, loading, error } = useSelector(
    (state) => state.movieSlice
  );

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    dispatch(getAllMovieByIdAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentMovie?.reviews) {
      setReviews(currentMovie.reviews);
    }
  }, [currentMovie]);

  const handleAddReview = (newReview) => {
    const review = {
      id: Date.now().toString(),
      author: newReview.author,
      author_details: { rating: newReview.rating },
      content: newReview.content,
      created_at: new Date().toISOString(),
    };
    setReviews([review, ...reviews]);
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!currentMovie) return null;

  const {
    title,
    backdrop_url,
    genres,
    overview,
    cast,
    trailer_url,
    release_date,
    vote_count,
    vote_average,
  } = currentMovie;

  return (
    <div className="row p-0 m-0" style={{ backgroundColor: '#191919' }}>
      <div className="col-lg-12">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <MovieTrailer trailer={trailer_url} poster={backdrop_url} />

          <div className="d-flex gap-3 mt-3">
            {/* Left column */}
            <div style={{ width: '700px' }}>
              <MovieInfo
                movieInfo={{
                  title,
                  category: genres,
                  year: release_date,
                  dureation: '2h:25m',
                  plot: overview,
                }}
              />
              <hr style={{ borderColor: '#333' }} />

              <MovieCastInfo
                data={{
                  poistions: 'Stars',
                  names: cast,
                }}
              />

              {/* Reviews Section */}
              <div className=" text-white py-4 px-3 mt-4 rounded">
                <div
                  className="mx-auto"
                  style={{  maxWidth: '768px' }}
                >
                  <MovieReviews reviews={reviews} />
                  <AddReviewForm onSubmit={handleAddReview} />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ width: '360px' }}>
              <div className="d-flex align-items-center gap-3 text-white mb-3">
                <FaHeart style={{ cursor: 'pointer', opacity: 0.8 }} />
                <FaShareAlt style={{ cursor: 'pointer', opacity: 0.8 }} />
                <FaBookmark style={{ cursor: 'pointer', opacity: 0.8 }} />
                <span style={{ fontSize: '24px', color: '#FFD700' }}>★</span>
                <span style={{ fontSize: '18px' }}>
                  {vote_average.toFixed(1)}
                </span>
                <span className="text-muted" style={{ fontSize: '14px' }}>
                  | {vote_count}k
                </span>
              </div>

              <button className="btn btn-info w-100 mb-2 text-white">
                🎟️ See Showtimes
              </button>
              <button className="btn btn-secondary w-100">
                ☰ More watch options
              </button>

              <div className="mt-3 d-flex overflow-auto">
                {[
                  'https://image.tmdb.org/t/p/w185/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
                  'https://image.tmdb.org/t/p/w185/lXR32JepFwD1UHkplWqtBP1K79z.jpg',
                  'https://image.tmdb.org/t/p/w185/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
                ].map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="movie"
                    className="me-2 rounded"
                    style={{
                      width: '110px',
                      height: '160px',
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </div>

              <p
                className="text-white text-center bg-secondary mt-2 p-2 rounded"
                style={{ fontSize: '14px' }}
              >
                The Best Movies and Shows in September
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
