import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MoviesCard } from '../../components';
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
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : movies;

    return (
        <div>
            <div className="row m-auto p-0 mt-3 container">
                {loading && <Loading />}
                {error && <div className="text-center">{error}</div>}
                {!loading && !error && filteredMovies.length > 0 ? (
                    <>
                        <div className='my-sm-0 my-md-1  mx-3' style={{width:"fit-content"}}>
                            <p className='font text-light sec-color fs-2 fw-bold'>{category}</p>
                        </div>

                        <div className='my-3 p-3 rounded-4'>
                            <div className='mt-4 mb-3 mx-3 d-flex justify-content-between align-items-center px-4 py-3 rounded-4' style={{ backgroundColor: "#212121" }}>
                                <p className='font sec-color fs-5 mb-0'>Cover</p>
                                <p className='font sec-color fs-5 mb-0' style={{ marginLeft: "-50px" }}>Title</p>
                                <p className='font sec-color fs-5 mb-0'>Actions</p>
                            </div>

                            {filteredMovies.map((movie) => (
                                <MoviesCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </>
                ) : (
                    !loading && !error && filteredMovies.length === 0 && (
                        <div className="text-center text-white d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
                            <p className="alert w-75 fs-3 text-dark fw-medium" style={{ backgroundColor: "#3DD2CC" }}>No movies found</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
