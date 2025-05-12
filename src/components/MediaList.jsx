import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading, MovieCard, Header, MainFilter } from "./index";

export default function MediaList({
  fetchAction,
  mediaSelector,
  //   title,
  enableFilters = true,
  enableSearch = true,
}) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(mediaSelector);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    dispatch(fetchAction(searchTerm));
  }, [searchTerm]);

  const filteredData = data?.filter((item) => {
    const matchGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some((genre) => item.genres?.includes(genre));
    const matchLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.some((lang) => item.Language?.includes(lang));
    return matchGenre && matchLanguage;
  });

  return (
    <div className="row p-0 m-0" style={{ backgroundColor: "#191919" }}>
      <div className="row m-0 p-0 justify-content-between">
        {enableSearch && <Header onSearch={setSearchTerm} />}
        <div className="content p-0 col-lg-9">
          <div className="row m-0 p-0">
            {loading && <Loading />}
            {error && <div className="text-white text-center">{error}</div>}
            {!loading && filteredData?.length === 0 && (
              <div className="text-white text-center">No results found.</div>
            )}
            {filteredData?.map((item) => (
              <MovieCard key={item.id} movies={item} />
            ))}
          </div>
        </div>
        {enableFilters && (
          <MainFilter
            selectedGenres={selectedGenres}
            selectedLanguages={selectedLanguages}
            onGenreChange={setSelectedGenres}
            onLanguageChange={setSelectedLanguages}
          />
        )}
      </div>
    </div>
  );
}
