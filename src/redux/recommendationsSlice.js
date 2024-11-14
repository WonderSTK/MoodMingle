import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRecommendations } from '../services/api';

export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async (mood, { rejectWithValue }) => {
    try {
      const recommendations = await getRecommendations(mood);
      return recommendations;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState: {
    movies: [],
    books: [],
    songs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.movies;
        state.books = action.payload.books;
        state.songs = action.payload.songs;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default recommendationsSlice.reducer;