import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addNewMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  getMovieBySearch,
  updateMovie,
} from '../Api/MovieApi';

const initialState = {
  movies: [],
  currentMovie: null,
  loading: false,
  error: null,
};

export const getAllMoviesAction = createAsyncThunk(
  'movie/getAllMoviesAction',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllMovies();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllMovieByIdAction = createAsyncThunk(
  'movie/getAllMovieByIdAction',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getMovieById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMovieAction = createAsyncThunk(
  'movie/addMovieAction',
  async (movie, { rejectWithValue }) => {
    try {
      const response = await addNewMovie(movie);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editMovieAction = createAsyncThunk(
  'movie/editMovieAction',
  async ({ id, movie }, { rejectWithValue }) => {
    try {
      const response = await updateMovie(id, movie);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMovieAction = createAsyncThunk(
  'movie/deleteMovieAction',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteMovie(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchMovieAction = createAsyncThunk(
  'movie/searchMovieAction',
  async (search, { rejectWithValue }) => {
    try {
      const response = await getMovieBySearch(search);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    updateCurrentMovieReviews: (state, action) => {
      if (state.currentMovie) {
        state.currentMovie.reviews = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMoviesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMoviesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getAllMoviesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllMovieByIdAction.pending, (state) => {
        state.loading = true;
        state.currentMovie = null;
      })
      .addCase(getAllMovieByIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(getAllMovieByIdAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addMovieAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMovieAction.fulfilled, (state, action) => {
        state.loading = false;
        state.movies.push(action.payload);
      })
      .addCase(addMovieAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editMovieAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(editMovieAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.movies.findIndex(
          (movie) => movie.id === action.payload.id
        );
        if (index !== -1) state.movies[index] = action.payload;
        if (state.currentMovie?.id === action.payload.id)
          state.currentMovie = action.payload;
      })
      .addCase(editMovieAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMovieAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMovieAction.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload.id
        );
      })
      .addCase(deleteMovieAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchMovieAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovieAction.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMovieAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateCurrentMovieReviews } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
