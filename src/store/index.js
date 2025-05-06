import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./movieSlice";

export const store = configureStore({
  reducer: {
    movieSlice: movieReducer,
  }, // Add your reducers here
});
