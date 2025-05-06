import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, NotFound } from '../pages/index';
import MovieDetails from '../pages/MovieDetails';
export default function MianLayout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="movieDetail" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
