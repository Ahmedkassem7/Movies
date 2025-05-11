import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./movieSlice";
import { peopleReducer } from "./peopleSlice";

export const store = configureStore({
  reducer: {
    movieSlice: movieReducer,
    peopleSlice: peopleReducer,
  }, // Add your reducers here
});
