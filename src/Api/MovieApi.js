import axios from "axios";
const baseUrl = "http://localhost:3001/movies";
const getAllMovies = async () => axios.get(baseUrl);

const getMovieById = async (id) => axios.get(`${baseUrl}/${id}`);

const addNewMovie = async (movie) => axios.post(baseUrl, movie);
const updateMovie = async (id, movie) => axios.put(`${baseUrl}/${id}`, movie);
const deleteMovie = async (id) => axios.delete(`${baseUrl}/${id}`);

export { getAllMovies, getMovieById, addNewMovie, updateMovie, deleteMovie };
