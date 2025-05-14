import MovieTrailer from "../components/movies-details/MovieTrailer";
import MovieInfo from "../components/movies-details/MovieInfo";
import MovieCastInfo from "../components/movies-details/MovieCastInfo";
import { FaHeart, FaShareAlt, FaBookmark } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieReviews } from "../components/movies-details/MovieReviews";
import { AddReviewForm } from "../components/movies-details/AddReviewForm";
import { getSeriesByIdAction } from "../store/serieSlice";
import { Loading } from "../components";

export default function SeriesDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentSerie, loading, error } = useSelector(
    (state) => state.seriesSlice
  );

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    dispatch(getSeriesByIdAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentSerie?.reviews) {
      setReviews(currentSerie.reviews);
    }
  }, [currentSerie]);

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

  if (loading) return <Loading />;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!currentSerie) return null;
  console.log("testseri", currentSerie);

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
  } = currentSerie;

  return (
    <div
      className="container-fluid p-0 m-0"
      style={{ backgroundColor: "#191919" }}
    >
      <div className="row mx-0">
        <div className="col-12 px-0">
          <MovieTrailer trailer={trailer_url} poster={backdrop_url} />
        </div>
      </div>

      <div className="row mx-0">
        {/* Main content area */}
        <div className="col-12">
          <div className="container py-4">
            <div className="row">
              {/* Left column - main content (stack on mobile, then 8 columns on md+) */}
              <div className="col-12 col-lg-9 order-2 order-lg-1">
                {/* Main content */}
                <MovieInfo
                  movieInfo={{
                    title,
                    category: genres,
                    year: release_date,
                    dureation: "2h:25m",
                    plot: overview,
                  }}
                />
                <hr style={{ borderColor: "#333" }} />

                <MovieCastInfo
                  data={{
                    poistions: "Stars",
                    names: cast,
                  }}
                />

                {/* Reviews Section */}
                <div className="text-white py-4 rounded">
                  <div className="mx-auto" style={{ maxWidth: "768px" }}>
                    <MovieReviews reviews={reviews} />
                    <AddReviewForm onSubmit={handleAddReview} />
                  </div>
                </div>
              </div>

              {/* Right column - sidebar */}
              <div className="col-12 col-lg-3 order-1 order-lg-2 mb-4 mb-md-0">
                <div className="sticky-md-top" style={{ top: "20px" }}>
                  {/* Sidebar content */}
                  <div className="d-flex align-items-center gap-3 text-white mb-3 flex-wrap">
                    <FaHeart style={{ cursor: "pointer", opacity: 0.8 }} />
                    <FaShareAlt style={{ cursor: "pointer", opacity: 0.8 }} />
                    <FaBookmark style={{ cursor: "pointer", opacity: 0.8 }} />
                    <span style={{ fontSize: "24px", color: "#FFD700" }}>
                      ★
                    </span>
                    <span style={{ fontSize: "18px" }}>
                      {vote_average.toFixed(1)}
                    </span>
                    <span style={{ fontSize: "14px", color: "white" }}>
                      | {vote_count}k
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
                      "https://image.tmdb.org/t/p/w185/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
                      "https://image.tmdb.org/t/p/w185/lXR32JepFwD1UHkplWqtBP1K79z.jpg",
                      "https://image.tmdb.org/t/p/w185/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
                    ].map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="movie"
                        className="me-2 rounded"
                        style={{
                          width: "33%",
                          height: "160px",
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>

                  <p
                    className="text-white text-center bg-secondary mt-2 p-2 rounded"
                    style={{ fontSize: "14px" }}
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
