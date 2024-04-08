import {combineReducers} from '@reduxjs/toolkit';
import loginSlice from './slice/loginSlice';
import HomeSlice from './slice/HomeSlice';

const rootReducer = combineReducers({
  loginDetails: loginSlice,
  homeDetails: HomeSlice,
});

export default rootReducer;
