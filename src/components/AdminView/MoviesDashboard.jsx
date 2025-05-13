import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoviesTable } from "../../components";
import { getAllMoviesAction } from "../../store/movieSlice";
import Loading from "../Loading";
import { getAllSeriesAction } from "../../store/serieSlice";

// export default function MoviesDashboard({ searchTerm, category }) {
export default function MoviesDashboard({ searchTerm, category }) {
  const { movies = [], series = [], loading, error } = useSelector((store) =>
    category === "Movies" ? store.movieSlice : store.seriesSlice
  );
  const dispatch = useDispatch();
  const data = category === "Movies" ? movies : series;

  useEffect(() => {
    if (category === "Movies") {
      dispatch(getAllMoviesAction());
    } else {
      dispatch(getAllSeriesAction());
    }
  }, [dispatch, category])

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
            {/* <div
              className="my-sm-0 mt-md-4  mx-3 mb-0"
              style={{ width: 'fit-content' }}
            >
              <p className="font text-light sec-color fs-1 fw-bold">
                {category}
              </p>
            </div> */}

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
                  {/* <th className='font sec-color fs-5 mb-0 px-4 pt-4 pb-3 d-none d-lg-table-cell'>Country</th> */}
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
                  <MoviesTable key={item.id} movie={item} category={category}/>
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
    </div>
  );
}
