import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../../store/movieSlice";
import { getAllSeriesAction } from "../../store/serieSlice";
import Loading from "../Loading";
import MoviesTable from "./MoviesTable";
import MovieModal from "./MovieModal";

export default function MoviesDashboard({ searchTerm, category }) {
  const {
    movies = [],
    series = [],
    loading,
    error,
  } = useSelector((store) =>
    category === "Movies" ? store.movieSlice : store.seriesSlice
  );

  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  const data = category === "Movies" ? movies : series;

  useEffect(() => {
    if (category === "Movies") {
      dispatch(getAllMoviesAction());
    } else {
      dispatch(getAllSeriesAction());
    }
  }, [dispatch, category]);

  const handleView = (item) => setSelectedItem(item);
  const handleClose = () => setSelectedItem(null);

  const filteredData = searchTerm
    ? data.filter((item) =>
        item.title?.toLowerCase().includes(searchTerm?.toLowerCase())
      )
    : data;

  return (
    <div>
      <div className="row m-auto p-0 mt-3 container-lg">
        {loading && <Loading />}
        {error && <div className="text-center">{error}</div>}
        {!loading && !error && filteredData.length > 0 ? (
          <>
            <table
              className="view-table"
              style={{ borderCollapse: "separate", borderSpacing: "0 20px" }}
            >
              <thead>
                <tr
                  className="text-center"
                  style={{ backgroundColor: "#212121" }}
                >
                  <th className="font sec-color fs-5 mb-0 px-4 pt-4 pb-3 rounded-start-3">
                    Title
                  </th>
                  <th className="font sec-color fs-5 mb-0 px-4 pt-4 pb-3 d-none d-sm-table-cell">
                    Genre
                  </th>
                  <th className="font sec-color fs-5 mb-0 px-4 pt-4 pb-3 d-none d-xl-table-cell">
                    imdbRating
                  </th>
                  <th className="font sec-color fs-5 mb-0 px-4 pt-4 pb-3 rounded-end-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <MoviesTable
                    key={item.id}
                    movie={item}
                    category={category}
                    onView={handleView}
                  />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          !loading &&
          !error &&
          filteredData.length === 0 && (
            <div
              className="text-center text-white d-flex align-items-center justify-content-center"
              style={{ height: "80vh" }}
            >
              <p
                className="alert w-75 fs-3 text-dark fw-medium"
                style={{ backgroundColor: "#3DD2CC" }}
              >
                No {category.toLowerCase()} found
              </p>
            </div>
          )
        )}
      </div>

      {selectedItem && <MovieModal item={selectedItem} onClose={handleClose} />}
    </div>
  );
}
