import React from 'react';
import {View, TextInput, Button} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './LoginScreen.style';
import {LanguageType} from '../../constants/App.constants';
import {LoginScreenViewProps} from '../../types/Store.type';

const LoginScreenView = (props: LoginScreenViewProps) => {
  const {
    email,
    isEnglishSelected,
    password,
    setEmail,
    setPassword,
    validateEmail,
    validatePassword,
    handleLogin,
    changeLanguage,
  } = props;
  const {t} = useTranslation();
  const enableButtonColor = isEnglishSelected ? '#333' : '#ccc';
  const disableButtonColor = !isEnglishSelected ? '#333' : '#ccc';
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('login.email')}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder={t('login.password')}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title={t('login.loginButton')}
          disabled={!validateEmail(email) || !validatePassword(password)}
          onPress={handleLogin}
        />
      </View>
      <View style={styles.langContainer}>
        <Button
          title={t('login.english')}
          color={enableButtonColor}
          onPress={() => {
            changeLanguage(LanguageType.English);
          }}
        />
        <View style={styles.languageArabic}>
          <Button
            title={t('login.arabic')}
            color={disableButtonColor}
            onPress={() => {
              changeLanguage(LanguageType.Arabic);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreenView;
