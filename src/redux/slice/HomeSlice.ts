import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BaseURL} from '../../constants/App.constants';
import {HomeDetails, RootState} from '../../types/Store.type';

export const fetchMoviesData = createAsyncThunk<
  any,
  void,
  {
    state: RootState;
  }
>('themoviedb/Movies', async (_, {getState}) => {
  const state: RootState = getState();
  const page: number = state.homeDetails?.page;
  const selectedLanguage: string = state.loginDetails?.selectedLanguage;
  try {
    const response = await fetch(
      `${BaseURL}/3/movie/popular?api_key=b836aab3bd57fb6dff4b046cce00391b&page=${page}&language=${selectedLanguage}`,
    );
    return await response.json();
  } catch (error) {
    throw error;
  }
});

const initialState: HomeDetails = {
  loading: false,
  page: 1,
  movies: [],
  error: undefined,
};

const dataSlice = createSlice({
  name: 'homeDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMoviesData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesData.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = [...state.movies, ...action.payload.results];
        state.page = state.page + 1;
      })
      .addCase(fetchMoviesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default dataSlice.reducer;
