import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AccessToken, BaseURL} from '../../constants/App.constants';
import {HomeDetails} from '../../types/Store.type';
import {RootState} from '../store';

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
      `${BaseURL}/3/movie/popular?page=${page}&language=${selectedLanguage}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${AccessToken}`,
        },
      },
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
