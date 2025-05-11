import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MoviesTable } from '../../components';
import { getAllMoviesAction } from '../../store/movieSlice';
import Loading from '../Loading';

export default function MoviesDashboard({ searchTerm, category }) {
  const { movies, loading, error } = useSelector((store) => store.movieSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesAction());
  }, [dispatch]);

  const filteredMovies = searchTerm
    ? movies.filter((movie) =>
        movie.title?.toLowerCase().includes(searchTerm?.toLowerCase())
      )
    : movies;

  return (
    <div>
      <div className="row m-auto p-0 mt-3 container-md">
        {loading && <Loading />}
        {error && <div className="text-center">{error}</div>}
        {!loading && !error && filteredMovies.length > 0 ? (
          <>
            <div
              className="my-sm-0 mt-md-4  mx-3 mb-0"
              style={{ width: 'fit-content' }}
            >
              <p className="font text-light sec-color fs-1 fw-bold">
                {category}
              </p>
            </div>

            <table
              className="view-table"
              style={{ borderCollapse: 'separate', borderSpacing: '0 20px' }}
            >
              <thead>
                <tr
                  className="text-center"
                  style={{ backgroundColor: '#212121' }}
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
                {filteredMovies.map((movie) => (
                  <MoviesTable key={movie.id} movie={movie} />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          !loading &&
          !error &&
          filteredMovies.length === 0 && (
            <div
              className="text-center text-white d-flex align-items-center justify-content-center"
              style={{ height: '80vh' }}
            >
              <p
                className="alert w-75 fs-3 text-dark fw-medium"
                style={{ backgroundColor: '#3DD2CC' }}
              >
                No movies found
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
