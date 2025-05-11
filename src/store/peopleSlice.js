import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllActors } from "../Api/ActorsApi";

const initialState = {
  people: [],
  loading: false,
  error: null,
};
export const getAllActorsAction = createAsyncThunk(
  "people/getAllActorsAction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllActors();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const peopleSlice = createSlice({
  name: "people",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllActorsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllActorsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.people = action.payload;
      })
      .addCase(getAllActorsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const peopleReducer = peopleSlice.reducer;
