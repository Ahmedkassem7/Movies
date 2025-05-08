import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Header,
  Banner,
  //   TrendingMovies,
  //   Upcoming,
  MainFilter,
  Loading,
  MovieCard,
} from "../components/index";
import { getAllMoviesAction, searchMovieAction } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Movies() {
  const { movies, loading, error } = useSelector((store) => store.movieSlice);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (searchTerm.trim() === "") {
      dispatch(getAllMoviesAction());
    } else {
      dispatch(searchMovieAction(searchTerm));
    }
  }, [searchTerm]);

  return (
    <div className="row p-0 m-0" style={{ backgroundColor: "#191919" }}>
      <Sidebar />
      <div className="col-lg-10 p-5 pt-4">
        <Header onSearch={setSearchTerm} />
        <div className="row m-0 p-0 justify-content-between">
          <div className="content mt-4 p-0  col-lg-9">
            <div className="row  m-0 p-0 mt-3">
              {loading && <Loading />}
              {error && <div className="text-center text-white">{error}</div>}
              {movies?.length === 0 && !loading && (
                <div className="text-center text-white">No results found.</div>
              )}
              {movies?.map((movie) => (
                <MovieCard key={movie.id} movies={movie} />
              ))}
            </div>
          </div>
          <MainFilter />
        </div>
      </div>
    </div>
  );
}
