import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import i18next from 'i18next';
import LoginScreenView from './LoginScreen.view';
import {saveDetails, saveLanguage} from '../../redux/slice/loginSlice';
import {LanguageType} from '../../constants/App.constants';
import {RootState} from '../../redux/store';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const selectedLanguage = useSelector(
    (state: RootState) => state?.loginDetails?.selectedLanguage,
  );
  const dispatch = useDispatch();
  const changeLanguage = (lng: string) => {
    if (selectedLanguage !== lng) {
      try {
        i18next.changeLanguage(lng);
        if (lng === LanguageType.Arabic) {
          I18nManager.forceRTL(true);
        } else {
          I18nManager.forceRTL(false);
        }
        dispatch(saveLanguage(lng));
        RNRestart.Restart();
      } catch (error) {
        console.log('Change Language error', error);
      }
    }
  };

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const validatePassword = (text: string) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z\d])(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,15}$/;
    return passwordRegex.test(text);
  };

  const handleLogin = () => {
    if (validateEmail(email) && validatePassword(password)) {
      dispatch(saveDetails({email, password}));
    }
  };

  const isEnglishSelected = selectedLanguage === LanguageType.English;

  return (
    <LoginScreenView
      email={email}
      password={password}
      isEnglishSelected={isEnglishSelected}
      setEmail={setEmail}
      setPassword={setPassword}
      validateEmail={validateEmail}
      validatePassword={validatePassword}
      handleLogin={handleLogin}
      changeLanguage={changeLanguage}
    />
  );
};

export default LoginPage;
