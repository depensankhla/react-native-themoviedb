import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './language/en.json';
import ar from './language/ar.json';
import {LanguageType} from '../constants/App.constants';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translation: en},
    ar: {translation: ar},
  },
  lng: LanguageType.English,
  fallbackLng: LanguageType.English,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
