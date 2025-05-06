import React from "react";
import {
  Sidebar,
  Header,
  Banner,
  TrendingMovies,
  Upcoming,
  MainFilter,
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
            <TrendingMovies />
            <Upcoming />
          </div>
          <MainFilter />
        </div>
      </div>
    </div>
  );
}
