import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMovieAction } from '../../store/movieSlice';
import { deleteSeriesAction } from '../../store/serieSlice';

export default function MoviesCard({ item, category }) {
  const dispatch = useDispatch();
  if (!item) return null;

  const handleDelete = () => {
    if (category === "Movies") {
      dispatch(deleteMovieAction(item.id));
    } else {
      dispatch(deleteSeriesAction(item.id));
    }
  };

  return (
    <div
      className="mb-3 mx-3 d-flex flex-column flex-sm-row justify-content-between align-items-center px-4 rounded-4 py-2 py-sm-1"
      style={{ backgroundColor: '#212121' }}
    >
      <img
        src={item.poster_url}
        className="card-img rounded"
        alt={item.title}
        style={{ width: '70px', height: '110px' }}
      />
      <p className="card-title font sec-color fs-5 mb-0">{item.title}</p>
      <div>
        <Link to={`/${category === "Movies" ? "movie" : "series"}/${item.id}`}>
          <i
            className="bi bi-eye-fill fs-4 mx-2 text-warning"
            style={{ cursor: 'pointer' }}
          ></i>
        </Link>
        <Link to={`/admin/${category === "Movies" ? "movie" : "series"}/${item.id}/edit`}>
          <i
            className="bi bi-pencil-square fs-4 color mx-2"
            style={{ cursor: 'pointer' }}
          ></i>
        </Link>
        <i
          className="bi bi-trash3 fs-4 mx-2"
          onClick={handleDelete}
          style={{ color: 'brown', cursor: 'pointer' }}
        ></i>
      </div>
    </div>
  );
}
