import React from 'react';
import { Provider } from 'react-redux';
import { View, StatusBar } from 'react-native';

import Navigation from './navigation';
import store from './modules/rootStore';
import commonContainerStyles from './styles/containers';

const App: React.FC = () => (
  <View style={commonContainerStyles.flex}>
    <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
      translucent
    />
    <Provider store={store}>
      <Navigation />
    </Provider>
  </View>
);

export default App;
