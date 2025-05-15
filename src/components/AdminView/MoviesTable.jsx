import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMovieAction } from "../../store/movieSlice";
import { deleteSeriesAction } from "../../store/serieSlice";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function MoviesTable({ movie, category, onView }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // Animate once on first appearance

  const handleDelete = (movieId) => {
    if (category === "Movies") {
      dispatch(deleteMovieAction(movieId));
    } else if (category === "Series") {
      dispatch(deleteSeriesAction(movieId));
    }
  };

  const handleViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onView?.(movie);
  };

  return (
    <motion.tr
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-5 mx-0 mx-md-3 px-4 text-center"
      style={{ backgroundColor: "#212121" }}
    >
      <td className="card-title font sec-color fs-5 px-5 py-3 rounded-start-3">
        {movie.title}
      </td>
      <td className="card-title font sec-color fs-5 px-5 py-3 d-none d-sm-table-cell">
        {Array.isArray(movie.genres) ? movie.genres.join(", ") : "N/A"}
      </td>
      <td className="card-title font sec-color fs-5 px-5 py-3 d-none d-xl-table-cell">
        {movie.vote_average === "N/A" ? "No Rating" : `⭐${movie.vote_average}`}
      </td>
      <td className="rounded-end-3">
        <i
          className="bi bi-eye-fill fs-4 mx-2 text-warning"
          style={{ cursor: "pointer" }}
          onClick={handleViewClick}
        ></i>
        <Link
          to={`/admin/${
            category.toLowerCase() === "movies"
              ? "movie"
              : category.toLowerCase()
          }/${movie.id}/edit`}
        >
          <i
            className="bi bi-pencil-square fs-4 color mx-2"
            style={{ cursor: "pointer" }}
          ></i>
        </Link>
        <i
          className="bi bi-trash3 fs-4 mx-2"
          onClick={() => handleDelete(movie.id)}
          style={{ color: "brown", cursor: "pointer" }}
        ></i>
      </td>
    </motion.tr>
  );
}
