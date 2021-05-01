import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { City } from '../screens';
import { WeatherNavigation } from './types';

const Stack = createStackNavigator<WeatherNavigation>();

const Weather: React.FC = () => (
  <Stack.Navigator
    headerMode="none"
    screenOptions={{ cardStyle: styles.screenOptions }}>
    <Stack.Screen name="City" component={City} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  screenOptions: {
    backgroundColor: '#7290b9',
  },
});

export default Weather;
