import React, {useEffect} from 'react';
import HomeScreenView from './HomeScreen.view';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMoviesData} from '../../redux/slice/HomeSlice';
import {AppDispatch, RootState} from '../../redux/store';

const HomeScreen = () => {
  const moviesList = useSelector(
    (state: RootState) => state?.homeDetails?.movies,
  );
  const dispatch = useDispatch<AppDispatch>();
  const callFetchMovies = () => {
    dispatch(fetchMoviesData());
  };

  useEffect(() => {
    callFetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    callFetchMovies();
  };

  return (
    <HomeScreenView moviesList={moviesList} handleLoadMore={handleLoadMore} />
  );
};

export default HomeScreen;
