import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AdminView,
  Home,
  MovieForm,
  NotFound,
  Series,
  ViewAll,
} from "../pages/index";
import MovieDetails from "../pages/MovieDetails";
import Movies from "../pages/Movies";
import SharedLayout from "./SharedLayout";
import AdminLayout from "./AdminLayout";

export default function MianLayout() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="Movies" element={<Movies />} />
          <Route path="Series" element={<Series />} />
          <Route path="movie/:id" element={<MovieDetails />} />
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="dashboard" element={<AdminView />} />
          <Route path="dashboard/all" element={<ViewAll />} />
          <Route path="Actors" element={<ActorsPage />} />
          {/* <Route path="movie/:id" element={<MovieForm />} /> */}
          <Route path="movie/:id/edit" element={<MovieForm />} />
        </Route>

        {/* Auth Routes
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} /> */}

        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
