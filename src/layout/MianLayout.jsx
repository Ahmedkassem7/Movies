import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminView, Home, MovieForm, NotFound, ViewAll } from '../pages/index';
import MovieDetails from '../pages/MovieDetails';
import Movies from "../pages/Movies";


export default function MianLayout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="Movies" element={<Movies />} />
          <Route path="movieDetail" element={<MovieDetails />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="adminDashboard" element={<AdminView />} />
          <Route path="/adminDashboard/all" element={<ViewAll/>} />
          <Route path="/movieDetail/:id" element={<MovieForm/>} />
          <Route path="/movieDetail/:id/edit" element={<MovieForm/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
