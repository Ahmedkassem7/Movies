import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./movieSlice";
import { peopleReducer } from "./peopleSlice";
import { serieReducer } from "./serieSlice";

export const store = configureStore({
  reducer: {
    movieSlice: movieReducer,
    peopleSlice: peopleReducer,
    seriesSlice: serieReducer,
  }, // Add your reducers here
});
