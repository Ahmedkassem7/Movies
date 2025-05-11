import axios from "axios";
const baseUrl = "http://localhost:3001/movies";
const getAllMovies = async () => axios.get(baseUrl);

const getMovieById = async (id) => axios.get(`${baseUrl}/${id}`);

const addNewMovie = async (movie) => axios.post(baseUrl, movie);
const updateMovie = async (id, movie) => axios.put(`${baseUrl}/${id}`, movie);
const deleteMovie = async (id) => axios.delete(`${baseUrl}/${id}`);
//get movie by searchaxios.get(`${baseUrl}?q=${search}`
const getMovieBySearch = async (search) => {
  try {
    const response = await getAllMovies();
    const movies = response.data;
    const filteredMovies = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.overview.toLowerCase().includes(search.toLowerCase())
    );
    return filteredMovies;
  } catch (error) {
    console.error("Error fetching movies by search:", error);
    throw error;
  }
};
export {
  getAllMovies,
  getMovieById,
  addNewMovie,
  updateMovie,
  deleteMovie,
  getMovieBySearch,
};
