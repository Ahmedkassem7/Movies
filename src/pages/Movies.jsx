import { useEffect, useState } from "react";
import { Header, MainFilter, Loading, MovieCard } from "../components/index";
import { getAllMoviesAction, searchMovieAction } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Movies() {
  const { movies, loading, error } = useSelector((store) => store.movieSlice);
  const dispatch = useDispatch();
  // search term state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  useEffect(() => {
    if (searchTerm.trim() === "") {
      dispatch(getAllMoviesAction());
    } else {
      dispatch(searchMovieAction(searchTerm));
    }
  }, [searchTerm]);
  const filteredMovies = movies?.filter((movie) => {
    const matchGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some((genre) => movie.Genre?.includes(genre));
    const matchLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.some((lang) => movie.Language?.includes(lang));
    return matchGenre && matchLanguage;
  });
  return (
    <div className="row p-0 m-0" style={{ backgroundColor: "#191919" }}>
      <div className="row m-0 p-0 justify-content-between">
        <Header onSearch={setSearchTerm} />

        <div className="content  p-0  col-lg-9">
          <div className="row  m-0 p-0 ">
            {loading && <Loading />}
            {error && <div className="text-center text-white">{error}</div>}
            {filteredMovies?.length === 0 && !loading && (
              <div className="text-center text-white">No results found.</div>
            )}
            {console.log(movies[0])}
            {filteredMovies?.map((movie) => (
              <MovieCard key={movie.id} movies={movie} />
            ))}
          </div>
        </div>
        <MainFilter
          selectedGenres={selectedGenres}
          selectedLanguages={selectedLanguages}
          onGenreChange={setSelectedGenres}
          onLanguageChange={setSelectedLanguages}
        />
      </div>
    </div>
  );
}
