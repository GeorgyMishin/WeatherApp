import React from 'react';
import { Provider } from 'react-redux';
import { View, StatusBar, StyleSheet } from 'react-native';

import Navigation from './navigation';
import store from './modules/rootStore';

const App: React.FC = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <Provider store={store}>
      <Navigation />
    </Provider>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
