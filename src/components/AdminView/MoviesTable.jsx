import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMovieAction } from '../../store/movieSlice';
export default function MoviesTable({ movie }) {
    const dispatch = useDispatch();
    const deleteMovie = (movieId) => {
        dispatch(deleteMovieAction(movieId));
    };
    return (
        <tr
            className="mb-5 mx-0 mx-md-3 px-4 text-center"
            style={{ backgroundColor: '#212121' }}
        >
            <td className="card-title font sec-color fs-5 px-5 py-3 rounded-start-3">{movie.Title}</td>
            <td className="card-title font sec-color fs-5 px-5 py-3 d-none d-sm-table-cell">{movie.Genre.join(", ")}</td>
            <td className="card-title font sec-color fs-5 px-5 py-3 d-none d-lg-table-cell">{movie.Country.join(", ")}</td>
            <td className="card-title font sec-color fs-5 px-5 py-3 d-none d-xl-table-cell">{movie.imdbRating === "N/A"? "No Rating":`⭐${movie.imdbRating}`}</td>
            <td className='rounded-end-3'>
                <Link to={`/movie/${movie.id}`}>
                    <i
                        className="bi bi-eye-fill fs-4 mx-2 text-warning"
                        style={{ cursor: 'pointer' }}
                    ></i>
                </Link>
                <Link to={`/admin/movie/${movie.id}/edit`}>
                    <i
                        className="bi bi-pencil-square fs-4 color mx-2"
                        style={{ cursor: 'pointer' }}
                    ></i>
                </Link>
                <i
                    className="bi bi-trash3 fs-4 mx-2"
                    onClick={() => deleteMovie(movie.id)}
                    style={{ color: 'brown', cursor: 'pointer' }}
                ></i>
            </td>
        </tr>
    )
}
