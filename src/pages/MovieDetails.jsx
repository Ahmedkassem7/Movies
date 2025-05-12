import React from 'react';
import MovieTrailer from '../components/movies-details/MovieTrailer';
import MovieInfo from '../components/movies-details/MovieInfo';
import MovieCastInfo from '../components/movies-details/MovieCastInfo';
import { FaHeart, FaShareAlt, FaBookmark, FaStar } from 'react-icons/fa';
import { Header, Sidebar } from '../components';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovieByIdAction } from '../store/movieSlice';

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentMovie, loading, error } = useSelector(
    (state) => state.movieSlice
  );

  useEffect(() => {
    dispatch(getAllMovieByIdAction(id));
  }, [dispatch, id]);

  if (loading) return <p style={{ color: 'white' }}>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
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
      {/* <Sidebar /> */}
      <div className="col-lg-12 ">
        <Header />

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <MovieTrailer trailer={trailer_url} poster={backdrop_url} />

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
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
              <hr />
              {/* <MovieCastInfo
                data={{ poistions: 'Director', names: Director.join(', ') }}
              />
              <MovieCastInfo
                data={{
                  poistions: 'Writers',
                  names: Writer.join(', '),
                }}
              /> */}
              <MovieCastInfo
                data={{
                  poistions: 'Stars',
                  names: cast,
                }}
              />
            </div>

            {/* Right column - 360px */}
            <div style={{ width: '360px' }}>
              {/* Rating and icons */}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  color: '#fff',
                  marginBottom: '10px',
                }}
              >
                <FaHeart style={{ cursor: 'pointer', opacity: 0.8 }} />
                <FaShareAlt style={{ cursor: 'pointer', opacity: 0.8 }} />
                <FaBookmark style={{ cursor: 'pointer', opacity: 0.8 }} />
                <span style={{ fontSize: '24px', color: '#FFD700' }}>★</span>
                <span style={{ fontSize: '18px' }}>
                  {vote_average.toFixed(1)}
                </span>
                <span style={{ fontSize: '14px', color: '#aaa' }}>
                  | {vote_count}k
                </span>
              </div>

              {/* Buttons */}
              <button
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#3DD2CC',
                  color: '#fff',
                  border: 'none',
                  fontSize: '16px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                }}
              >
                🎟️ See Showtimes
              </button>
              <button
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                ☰ More watch options
              </button>

              {/* Scrollable movie thumbnails */}
              <div
                style={{
                  marginTop: '20px',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                }}
              >
                {[
                  'https://image.tmdb.org/t/p/w185/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
                  'https://image.tmdb.org/t/p/w185/lXR32JepFwD1UHkplWqtBP1K79z.jpg',
                  'https://image.tmdb.org/t/p/w185/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
                ].map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="movie"
                    style={{
                      width: '110px',
                      height: '160px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginRight: '10px',
                      display: 'inline-block',
                    }}
                  />
                ))}
              </div>

              {/* Footer label */}
              <p
                style={{
                  color: '#fff',
                  marginTop: '10px',
                  fontSize: '14px',
                  textAlign: 'center',
                  backgroundColor: '#2a2a2a',
                  padding: '6px 10px',
                  borderRadius: '6px',
                }}
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
