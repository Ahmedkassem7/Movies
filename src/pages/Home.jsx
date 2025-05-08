import React from "react";
import {
  Sidebar,
  Header,
  Banner,
  // TrendingMovies,
  // Upcoming,
  MainFilter,
  MovieSection,
} from "../components/index";
import FilterSection from "../components/Filters/FilterSection";

export default function Home() {
  return (
    <div className="row p-0 m-0" style={{ backgroundColor: "#191919" }}>
      <Sidebar />
      <div className="col-lg-10 p-5 pt-4">
        <Header />
        <div className="row m-0 p-0 justify-content-between">
          <div className="content mt-4 p-0  col-lg-9">
            <Banner />
            <MovieSection
              title="Trending Movies"
              sliceStart={0}
              sliceEnd={4}
              linkPath="/Movies"
            />
            <MovieSection
              title="Upcoming"
              sliceStart={4}
              sliceEnd={8}
              linkPath="/Movies"
            />
          </div>
          <MainFilter />
        </div>
      </div>
    </div>
  );
}
