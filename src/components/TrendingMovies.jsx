import React, { useEffect } from "react";
import { Shared_P, SharedText } from "../styledComponents/styledComponents";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../store/movieSlice";
import { Loading, MovieCard } from "../components/index";
export default function TrendingMovies() {
  const { movies, loading, error } = useSelector((store) => store.movieSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMoviesAction());
  }, []);

  return (
    <section className="TrendingMovies">
      <div className="row m-0 p-0 justify-content-between by-4">
        <SharedText className="col-lg-4">Trending Movies</SharedText>
        <Link to="/movies" className="text-decoration-none col-lg-2 text-end  ">
          <Shared_P>See All...</Shared_P>
        </Link>
      </div>
      <div className="row  m-0 p-0 mt-3">
        {loading && <Loading />}
        {error && <div className="text-center">{error}</div>}
        {movies &&
          movies.slice(0, 4).map((movie) => {
            return <MovieCard key={movie.id} movies={movie} />;
          })}
      </div>
    </section>
  );
}
