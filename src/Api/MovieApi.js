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
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    return filteredMovies;
  } catch (error) {
    console.error("Error fetching movies by search:", error);
    throw error;
  }
};

// get getGenresFromData
const getGenresFromData = async () => {
  const response = await getAllMovies();
  const movies = response.data;
  const genres = new Set();

  movies.forEach((movie) => {
    const genreValue = movie.genres;

    if (Array.isArray(genreValue)) {
      genreValue.forEach((genre) => genres.add(genre.trim()));
    } else if (typeof genreValue === "string") {
      genreValue
        .split(",")
        .map((genre) => genre.trim())
        .forEach((genre) => genres.add(genre));
    }
  });

  return Array.from(genres);
};
// getLangFrom movies
const getLanguageFromData = async () => {
  const response = await getAllMovies();
  const movies = response.data;
  const movieByLang = new Set();
  movies.forEach((movie) => {
    const langMovie = movie.Language;
    if (Array.isArray(langMovie)) {
      langMovie.forEach((movie) => movieByLang.add(movie.trim()));
    } else if (typeof langMovie === "string") {
      langMovie
        .split(",")
        .map((movielan) => movielan.Trim())
        .forEach((movielan) => movieByLang.add(movielan.trim()));
    }
  });
  return Array.from(movieByLang);
};
const getMovieCount = async () => {
  const response = await getAllMovies();
  return response.data.length;
};
export {
  getAllMovies,
  getMovieById,
  addNewMovie,
  updateMovie,
  deleteMovie,
  getMovieBySearch,
  getGenresFromData,
  getLanguageFromData,
  getMovieCount,
};
