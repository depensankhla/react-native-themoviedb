import React, {useEffect} from 'react';
import {TouchableOpacity, Text, I18nManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import HomeScreen from '../screens/homeScreen/HomeScreen.container';
import LoginScreen from '../screens/loginScreen/LoginScreen.container';
import {logout} from '../redux/slice/loginSlice';
import styles from './AppNavigator.style';
import {LanguageType} from '../constants/App.constants';
import {RootState} from '../types/Store.type';

const Stack = createNativeStackNavigator();
function AppNavigation() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(
    (state: RootState) => state?.loginDetails?.email,
  );
  const selectedLanguage = useSelector(
    (state: RootState) => state?.loginDetails?.selectedLanguage,
  );

  const {t} = useTranslation();

  useEffect(() => {
    i18next.changeLanguage(selectedLanguage);
    if (selectedLanguage === LanguageType.Arabic) {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
  }, [selectedLanguage]);

  const headerRight = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(logout());
        }}>
        <Text style={styles.logoutStyle}>{t('home.logout')}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="HomePage"
              component={HomeScreen}
              options={{
                title: `${t('home.homeTitle')}`,
                headerTitleAlign: 'center',
                headerRight: headerRight,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoginPage"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
