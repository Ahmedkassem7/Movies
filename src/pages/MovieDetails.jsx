import React from 'react';
import MovieTrailer from '../components/movies-details/MovieTrailer';
import MovieInfo from '../components/movies-details/MovieInfo';
import MovieCastInfo from '../components/movies-details/MovieCastInfo';
import { FaHeart, FaShareAlt, FaBookmark } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllMovieByIdAction,
  editMovieAction,
  updateCurrentMovieReviews,
} from '../store/movieSlice';
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
    currentMovie?.reviews && setReviews(currentMovie.reviews);
  }, [currentMovie]);

  const handleAddReview = async (newReview) => {
    try {
      const review = {
        id: Date.now().toString(),
        author: newReview.author,
        author_details: { rating: newReview.rating },
        content: newReview.content,
        created_at: new Date().toISOString(),
      };
      const updatedMovie = { ...currentMovie, reviews: [review, ...reviews] };
      setReviews(updatedMovie.reviews);
      dispatch(updateCurrentMovieReviews(updatedMovie.reviews));
      const result = await dispatch(
        editMovieAction({ id: currentMovie.id, movie: updatedMovie })
      ).unwrap();
      setReviews(result.reviews);
      dispatch(updateCurrentMovieReviews(result.reviews));
    } catch (error) {
      setReviews(currentMovie?.reviews || []);
      alert('Failed to save review: ' + error.message);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!currentMovie) return null;

  return (
    <div
      className="container-fluid p-0 m-0"
      style={{ backgroundColor: '#191919' }}
    >
      <div className="row mx-0">
        <div className="col-12 px-0">
          <MovieTrailer
            trailer={currentMovie.trailer_url}
            poster={currentMovie.backdrop_url}
          />
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-12">
          <div className="container py-4">
            <div className="row">
              <div className="col-12 col-lg-9 order-2 order-lg-1">
                <MovieInfo
                  movieInfo={{
                    title: currentMovie.title,
                    category: currentMovie.genres,
                    year: currentMovie.release_date,
                    dureation: '2h:25m',
                    plot: currentMovie.overview,
                  }}
                />
                <hr style={{ borderColor: '#333' }} />
                <MovieCastInfo
                  data={{
                    poistions: 'Stars',
                    names: currentMovie.cast,
                  }}
                />
                <div className="text-white py-4 rounded">
                  <div className="mx-auto" style={{ maxWidth: '768px' }}>
                    <MovieReviews reviews={reviews} />
                    <AddReviewForm onSubmit={handleAddReview} />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 order-1 order-lg-2 mb-4 mb-md-0">
                <div className="sticky-md-top" style={{ top: '20px' }}>
                  <div className="d-flex align-items-center gap-3 text-white mb-3 flex-wrap">
                    <FaHeart style={{ cursor: 'pointer', opacity: 0.8 }} />
                    <FaShareAlt style={{ cursor: 'pointer', opacity: 0.8 }} />
                    <FaBookmark style={{ cursor: 'pointer', opacity: 0.8 }} />
                    <span style={{ fontSize: '24px', color: '#FFD700' }}>
                      ★
                    </span>
                    <span style={{ fontSize: '18px' }}>
                      {currentMovie.vote_average.toFixed(1)}
                    </span>
                    <span style={{ fontSize: '14px', color: 'white' }}>
                      | {currentMovie.vote_count}k
                    </span>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-info text-white">
                      🎟️ See Showtimes
                    </button>
                    <button className="btn btn-secondary">
                      ☰ More watch options
                    </button>
                  </div>
                  <div className="mt-3 d-flex">
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
                          width: '33%',
                          height: '160px',
                          objectFit: 'cover',
                          flexShrink: 0,
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
      </div>
    </div>
  );
}
