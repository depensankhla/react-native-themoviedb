import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigation from './navigation/AppNavigator';
import store from './redux/store';
import styles from './style';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <AppNavigation  />
      </Provider>
    </SafeAreaView>
  );
}

export default App;
