import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  AdminView,
  Home,
  MovieForm,
  NotFound,
  Series,
  SeriesDetails,
  ViewAll,
} from "../pages/index";
import MovieDetails from "../pages/MovieDetails";
import Movies from "../pages/Movies";
import SharedLayout from "./SharedLayout";
import AdminLayout from "./AdminLayout";
import ActorsPage from "../pages/ActorsPage";

// import RegisterForm from "../components/Form/RegisterForm/RegisterForm";
// import LoginForm from "../components/Form/LoginForm/LoginForm";

export default function MainLayout() {
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
          <Route path="series/:id" element={<SeriesDetails />} />
        </Route>

        {/* Admin Routes */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminView />} />
          <Route path="movies/all" element={<ViewAll />} />
          <Route path="series/all" element={<ViewAll />} />
          <Route path="Actors" element={<ActorsPage />} />
          <Route path="movie/:id/edit" element={<MovieForm />} />
          <Route path="series/:id/edit" element={<MovieForm />} />
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
