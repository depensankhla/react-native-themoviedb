import {createSlice} from '@reduxjs/toolkit';
import {LanguageType} from '../../constants/App.constants';
import {LoginDetails} from '../../types/Store.type';

const initialState: LoginDetails = {
  email: '',
  password: '',
  selectedLanguage: LanguageType.English,
};

const loginSlice = createSlice({
  name: 'loginDetails',
  initialState,
  reducers: {
    saveDetails(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    saveLanguage(state, action) {
      state.selectedLanguage = action.payload;
    },
    logout(state) {
      state.email = '';
      state.password = '';
    },
  },
});

export const {saveDetails, logout, saveLanguage} = loginSlice.actions;
export default loginSlice.reducer;
