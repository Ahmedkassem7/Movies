import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  AdminView,
  Home,
  MovieForm,
  NotFound,
  Series,
  SeriesDetails,
  ViewAll,
  Login,
  Register,
} from "../pages/index";
import MovieDetails from "../pages/MovieDetails";
import Movies from "../pages/Movies";
import SharedLayout from "./SharedLayout";
import AdminLayout from "./AdminLayout";
import ActorsPage from "../pages/ActorsPage";
import { ProtectedRoute } from "../components";

export default function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminView />} />
            <Route path="movies/all" element={<ViewAll />} />
            <Route path="series/all" element={<ViewAll />} />
            <Route path="Actors" element={<ActorsPage />} />
            <Route path="movie/:id/edit" element={<MovieForm />} />
            <Route path="series/:id/edit" element={<MovieForm />} />
          </Route>
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
