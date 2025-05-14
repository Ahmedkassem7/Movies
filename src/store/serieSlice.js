import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewSerie, deleteSerie, getAllSeries, getSerieById, getSerieBySearch, updateSerie } from "../Api/SeriesApi";

const initialState = {
  series: [],
  currentSerie:null,
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

export const getSeriesByIdAction = createAsyncThunk(
  "series/getSeriesByIdAction",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getSerieById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AddSeriesAction = createAsyncThunk(
  "series/AddSeriesAction",
  async (serie, { rejectWithValue }) => {
    try {
      const response = await addNewSerie(serie);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const UpdateSeriesAction = createAsyncThunk(
  "series/UpdateSeriesAction",
  async ({ id, serie }, { rejectWithValue }) => {
    try {
      const response = await updateSerie(id, serie);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSeriesAction = createAsyncThunk(
  "series/deleteSeriesAction",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteSerie(id);
      return response.data;
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

    builder.addCase(getSeriesByIdAction.fulfilled, (state, action) => {
      state.loading = false;
      state.currentSerie = action.payload;
    });
    builder.addCase(getSeriesByIdAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSeriesByIdAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(AddSeriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.series.push(action.payload);
    });
    builder.addCase(AddSeriesAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(AddSeriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(UpdateSeriesAction.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.series.findIndex(
        (serie) => serie.id === action.payload.id
      );
      if (index !== -1) {
        state.series[index] = action.payload;
      }
    });
    builder.addCase(UpdateSeriesAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(UpdateSeriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteSeriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.series = state.series.filter(
        (serie) => serie.id !== action.payload.id
      );
    });
    builder.addCase(deleteSeriesAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteSeriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  },
});

export const serieReducer = serieSlice.reducer;
