import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { WeatherInfo } from '../models/types';

type WeatherBlockProps = {
  data: WeatherInfo;
  temp: number;
};

const WeatherBlock: React.FC<WeatherBlockProps> = ({ data, temp }) => (
  <View style={styles.container}>
    <View style={styles.mainContent}>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${data.icon}@2x.png`,
        }}
        style={styles.iconMock}
      />
      <Text style={styles.value} numberOfLines={1}>
        {Math.round(temp)} º
      </Text>
    </View>
    <Text style={styles.description}>{data.description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {},
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMock: {
    width: 100,
    height: 100,
  },
  value: {
    flexShrink: 1,
    fontSize: 80,
    fontWeight: '200',
    color: '#fff',
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default WeatherBlock;
