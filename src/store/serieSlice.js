import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSeries, getSerieBySearch } from "../Api/SeriesApi";

const initialState = {
  series: [],
  loading: false,
  error: null,
};
export const getAllSeriesAction = createAsyncThunk(
  "serie/getAllSeriesAction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllSeries();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const searchSeriesAction = createAsyncThunk(
  "serie/searchSeriesAction",
  async (search, { rejectWithValue }) => {
    try {
      const response = await getSerieBySearch(search);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const serieSlice = createSlice({
  name: "serie",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllSeriesAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllSeriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.series = action.payload;
    });
    builder.addCase(getAllSeriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(searchSeriesAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchSeriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.series = action.payload;
    });
    builder.addCase(searchSeriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const serieReducer = serieSlice.reducer;
