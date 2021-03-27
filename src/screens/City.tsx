import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  LabelButton,
  ContentRow,
  WeatherBlock,
  LoadingContainer,
} from '../components';
import { MetricsSwitcher, SearchCityInput } from '../components/city';
import { WeatherNavigation } from '../navigation';
import {
  getWeather,
  getWeatherError,
  getWeatherByUserCoords,
} from '../modules/weather';
import I18n from '../locales';

type CityProps = {
  route: RouteProp<WeatherNavigation, 'City'>;
};

const City: React.FC<CityProps> = () => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const error = useSelector(getWeatherError);
  const data = useSelector(getWeather);
  const dispatch = useDispatch();

  const onSearchComplete = React.useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const onChangeCityPress = React.useCallback(() => {
    setIsSearchOpen(true);
  }, []);

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
              <MetricsSwitcher />
            </View>
            <View style={styles.rowContent}>
              <LabelButton
                title={I18n.t('change_city')}
                onPress={onChangeCityPress}
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
              <ContentRow
                title={I18n.t('chance_of_rain')}
                value={I18n.t('chance_of_rain_output', weather)}
              />
            </View>
            <SearchCityInput
              isVisible={isSearchOpen}
              onComplete={onSearchComplete}
            />
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
