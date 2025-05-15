import axios from "axios";
const baseUrl = "http://localhost:3001/series";
const getAllSeries = async () => axios.get(baseUrl);

const getSerieById = async (id) => axios.get(`${baseUrl}/${id}`);

const addNewSerie = async (Serie) => axios.post(baseUrl, Serie);
const updateSerie = async (id, Serie) => axios.put(`${baseUrl}/${id}`, Serie);
const deleteSerie = async (id) => axios.delete(`${baseUrl}/${id}`);
//get Serie by searchaxios.get(`${baseUrl}?q=${search}`
const getSerieBySearch = async (search) => {
  try {
    const response = await getAllSeries();
    const Series = response.data;
    const filteredSeries = Series.filter((Serie) =>
      Serie.title.toLowerCase().includes(search.toLowerCase())
    );
    return filteredSeries;
  } catch (error) {
    console.error("Error fetching Series by search:", error);
    throw error;
  }
};
const getSeriesCount = async () => {
  const response = await getAllSeries();
  return response.data.length;
};
// // get getGenresFromData
// const getGenresFromData = async () => {
//   const response = await getAllSeries();
//   const Series = response.data;
//   const genres = new Set();

//   Series.forEach((Serie) => {
//     const genreValue = Serie.genres;

//     if (Array.isArray(genreValue)) {
//       genreValue.forEach((genre) => genres.add(genre.trim()));
//     } else if (typeof genreValue === "string") {
//       genreValue
//         .split(",")
//         .map((genre) => genre.trim())
//         .forEach((genre) => genres.add(genre));
//     }
//   });

//   return Array.from(genres);
// };
// // getLangFrom Series
// const getLanguageFromData = async () => {
//   const response = await getAllSeries();
//   const Series = response.data;
//   const SerieByLang = new Set();
//   Series.forEach((Serie) => {
//     const langSerie = Serie.Language;
//     if (Array.isArray(langSerie)) {
//       langSerie.forEach((Serie) => SerieByLang.add(Serie.trim()));
//     } else if (typeof langSerie === "string") {
//       langSerie
//         .split(",")
//         .map((Serielan) => Serielan.Trim())
//         .forEach((Serielan) => SerieByLang.add(Serielan.trim()));
//     }
//   });
//   return Array.from(SerieByLang);
// };

export {
  getAllSeries,
  getSerieById,
  addNewSerie,
  updateSerie,
  deleteSerie,
  getSerieBySearch,
  // getGenresFromData,
  // getLanguageFromData,
  getSeriesCount,
};
