import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../store/movieSlice";
import { Loading, MovieCard } from "../components/index";
import { Shared_P, SharedText } from "../styledComponents/styledComponents";
import { Link } from "react-router-dom";
export default function MovieSection({
  title,
  sliceStart,
  sliceEnd,
  linkPath,
}) {
  const { movies, loading, error } = useSelector((store) => store.movieSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesAction());
  }, [dispatch]);

  return (
    <section className="TrendingMovies">
      <div className="row m-0 p-0 justify-content-between by-4">
        <SharedText className="col-lg-4">{title}</SharedText>
        <Link to={linkPath} className="text-decoration-none col-lg-2 text-end">
          <Shared_P>See All...</Shared_P>
        </Link>
      </div>
      <div className="row m-0 p-0 mt-3">
        {/* {loading && <Loading />} */}
        {loading && <p className="text-light text-center">Loading...</p>}
        {error && <div className="text-center">{error}</div>}
        {movies &&
          movies
            .slice(sliceStart, sliceEnd)
            .map((movie) => (
              <MovieCard key={movie.id} movies={movie} type="movie" />
            ))}
      </div>
    </section>
  );
}
