import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../interceptor/api";

// Async Thunk to fetch hotel list with filters
export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
   async (filters = {}, thunkAPI) => {
    try {
      const response = await api.get("hotels");
      let hotels = response.data;
      
      // Client-side filtering
      if (filters.search) {
        hotels = hotels.filter(hotel => 
          hotel.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.country) {
        hotels = hotels.filter(hotel => 
          hotel.address.countryIsoCode === filters.country
        );
      }
      
      return hotels;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async Thunk to fetch a single hotel by ID
export const fetchHotelById = createAsyncThunk(
  "hotels/fetchHotelById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/hotels/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  list: [],
  selectedHotel: null,
  loading: false,
  error: null,
};

// Slice
export const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    clearSelectedHotel: (state) => {
      state.selectedHotel = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchHotels
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // fetchHotelById
      .addCase(fetchHotelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.selectedHotel = action.payload;
        state.loading = false;
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { clearSelectedHotel } = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;
