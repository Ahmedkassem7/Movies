import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import { getGenresFromData, getLanguageFromData } from "../../Api/MovieApi";

export default function MainFilter({
  selectedGenres,
  selectedLanguages,
  onGenreChange,
  onLanguageChange,
}) {
  const [filters, setFilters] = useState([]);
  const [filtersLang, setFiltersLan] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const result = await getGenresFromData();
      const LangResult = await getLanguageFromData();
      setFilters(result);
      setFiltersLan(LangResult);
    };
    fetchFilters();
  }, []);
  console.log("filters", filters);
  console.log("filtersLang", filtersLang);

  return (
    <div className="filters   col-lg-3 text-light">
      <div className="col-lg-12  ">
        <FilterSection
          title="Genre"
          options={filters}
          selected={selectedGenres}
          onChange={onGenreChange}
        />
        <FilterSection
          title="Language"
          options={filtersLang}
          selected={selectedLanguages}
          onChange={onLanguageChange}
        />
      </div>
    </div>
  );
}
