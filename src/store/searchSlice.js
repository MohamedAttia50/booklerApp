import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    search: "",
    country: "",
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = { search: "", country: "" };
    },
  },
});

export const { setFilters, clearFilters } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
