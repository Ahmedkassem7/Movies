import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home, Movies, NotFound } from "../pages/index";
import MovieDetails from "../pages/MovieDetails";
export default function MianLayout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="Movies" element={<Movies />} />
          <Route path="movieDetail" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
