import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMovieAction } from '../../store/movieSlice';

export default function MoviesCard({ movie }) {
    const dispatch = useDispatch()
    const deleteMovie = (movieId) => {
        dispatch(deleteMovieAction(movieId))
    }
    return (
        <div className='mt-4 mb-3 mx-3 d-flex flex-column flex-md-row justify-content-between align-items-center px-4 py-3 rounded-4' style={{ backgroundColor: "#212121" }} >
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img rounded"
                alt={movie.title}
                style={{ width: "70px", height: "110px" }}
            />
            <p className='card-title font sec-color fs-5 mb-0'>{movie.title}</p>
            <div>
                <Link to={`/movieDetail/${movie.id}`} >
                    <i className="bi bi-eye-fill fs-4 mx-2 text-warning" style={{ cursor: "pointer" }}></i>
                </Link>
                <Link to={`/movieDetail/${movie.id}/edit`}>
                    <i className="bi bi-pencil-square fs-4 color mx-2" style={{ cursor: "pointer" }}></i>
                </Link>
                <i className="bi bi-trash3 fs-4 mx-2" onClick={() => deleteMovie(movie.id)} style={{ color: "brown", cursor: "pointer" }}></i>
            </div>
        </div>
    )
}
