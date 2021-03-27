import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Switcher,
  LabelButton,
  ContentRow,
  WeatherBlock,
  LoadingContainer,
} from '../components';
import { WeatherNavigation } from '../navigation';
import {
  getWeather,
  getWeatherError,
  getCurrentMetrics,
  getWeatherByUserCoords,
  setMetrics,
  Metrics,
} from '../modules/weather';
import I18n from '../locales';
import { getWindOutput } from '../locales/outputs';

type CityProps = {
  route: RouteProp<WeatherNavigation, 'City'>;
};

const SWITCHER_ITEMS = [
  {
    id: Metrics.Celsius,
    title: 'C',
  },
  {
    id: Metrics.Fahrenheit,
    title: 'F',
  },
];

const City: React.FC<CityProps> = () => {
  const dispatch = useDispatch();

  const error = useSelector(getWeatherError);
  const data = useSelector(getWeather);
  const currentMetrics = useSelector(getCurrentMetrics);

  const onChangeMetrics = React.useCallback(
    (next: string) => {
      dispatch(setMetrics(next as Metrics));
    },
    [dispatch],
  );

  const onChangeCitiesPress = React.useCallback(() => {}, []);

  const onCurrentLocationPress = React.useCallback(() => {
    dispatch(getWeatherByUserCoords());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getWeatherByUserCoords());
  }, [dispatch]);

  return (
    <LoadingContainer isLoading={!data && !error}>
      {() => {
        const weather = data!;

        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.rowContent}>
              <Text style={styles.cityTitle}>{weather.name}</Text>
              <Switcher
                items={SWITCHER_ITEMS}
                initialItemId={currentMetrics}
                onStateChange={onChangeMetrics}
              />
            </View>
            <View style={styles.rowContent}>
              <LabelButton
                title={I18n.t('change_city')}
                onPress={onChangeCitiesPress}
              />
              <LabelButton
                title={I18n.t('my_location')}
                onPress={onCurrentLocationPress}
              />
            </View>
            <View style={styles.mainContent}>
              <WeatherBlock
                data={weather.weatherInfo[0]}
                temp={weather.main.temp}
              />
            </View>
            <View style={styles.rowContent}>
              <ContentRow
                title={I18n.t('wind')}
                value={I18n.t('wind_output', weather.wind)}
              />
              <ContentRow
                title={I18n.t('pressure')}
                value={I18n.t('pressure_output', weather.main)}
              />
            </View>
            <View style={[styles.rowContent, styles.rowContentMargin]}>
              <ContentRow
                title={I18n.t('humidity')}
                value={I18n.toPercentage(weather.main.humidity, {
                  precision: 0,
                })}
              />
              <ContentRow title={I18n.t('chance_of_rain')} value="Вероятно" />
            </View>
          </SafeAreaView>
        );
      }}
    </LoadingContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 19,
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContentMargin: {
    marginTop: 35,
  },
  cityTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 36,
  },
});

export default City;
