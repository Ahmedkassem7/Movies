import React, { useEffect } from "react";
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
import { getAllMoviesAction } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Movies() {
  const { movies, loading, error } = useSelector((store) => store.movieSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMoviesAction());
  }, []);
  return (
    <div className="row p-0 m-0" style={{ backgroundColor: "#191919" }}>
      <Sidebar />
      <div className="col-lg-10 p-5 pt-4">
        <Header />
        <div className="row m-0 p-0 justify-content-between">
          <div className="content mt-4 p-0  col-lg-9">
            <div className="row  m-0 p-0 mt-3">
              {loading && <Loading />}
              {error && <div className="text-center">{error}</div>}
              {movies &&
                movies.map((movie) => {
                  return <MovieCard key={movie.id} movies={movie} />;
                })}
            </div>
          </div>
          <MainFilter />
        </div>
      </div>
    </div>
  );
}
