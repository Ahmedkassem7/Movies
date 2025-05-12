import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MoviesCard } from "../components";
import { getAllMoviesAction } from "../store/movieSlice";

export default function SharedList({ category }) {
  const { movies, loading, error } = useSelector((store) => store.movieSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesAction());
  }, []);

  return (
    // <div className='m-3 p-3 rounded-4' style={{ backgroundColor: "#3dd2cdc5" }}>
    <div className="m-3 p-3 rounded-4" style={{ backgroundColor: "#25272a" }}>
      <div className="d-flex justify-content-between my-3 mx-4">
        <p className="font text-light sec-color fs-4 fw-bold">
          Recent {category}
        </p>
        <Link to={`/admin/movie/0/edit`}>
          <button className="btn add-movie px-3">
            Add New <i className="bi bi-plus"></i>
          </button>
        </Link>
      </div>
      <div
        className="d-none d-sm-flex mt-4 mb-3 mx-3 d-flex justify-content-between align-items-center px-4 py-3 rounded-4"
        style={{ backgroundColor: "#212121" }}
      >
        <p className="font sec-color fs-5 mb-0">Cover</p>
        <p
          className="font sec-color fs-5 mb-0 card-title"
          style={{ marginLeft: "-50px" }}
        >
          Title
        </p>
        <p className="font sec-color fs-5 mb-0">Actions</p>
      </div>
      {movies.slice(0, 4).map((movie) => {
        return <MoviesCard key={movie.id} movie={movie}></MoviesCard>;
      })}
      <Link to={"all"} style={{ textDecoration: "none" }}>
        <button
          className="btn add-movie mx-auto d-block px-4 py-2 rounded-4"
          style={{ fontSize: "18px" }}
        >
          View all...
        </button>
      </Link>
    </div>
  );
}
