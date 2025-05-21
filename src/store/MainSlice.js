import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk("mainSlice/getData", async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default mainSlice.reducer;
