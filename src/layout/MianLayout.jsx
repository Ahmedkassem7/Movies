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
// import RegisterForm from "../components/Form/RegisterForm/RegisterForm";
// import LoginForm from "../components/Form/LoginForm/LoginForm";

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

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" index element={<AdminView />} />
          <Route path="dashboard/all" element={<ViewAll />} />
          <Route path="movie/:id" element={<MovieForm />} />
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
