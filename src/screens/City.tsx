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
  AppearingComponent,
  ErrorBlock,
} from '../components';
import { MetricsSwitcher, SearchCityInput } from '../components/city';
import { WeatherNavigation } from '../navigation';
import {
  getIsLoading,
  getWeather,
  getWeatherByUserCoords,
  getWeatherError,
} from '../modules/weather';
import I18n from '../locales';

import commonContainerStyles from '../styles/containers';

type CityProps = {
  route: RouteProp<WeatherNavigation, 'City'>;
};

const City: React.FC<CityProps> = () => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const data = useSelector(getWeather);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getWeatherError);
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
    <View style={commonContainerStyles.flex}>
      <LoadingContainer isLoading={isLoading}>
        {() => {
          if (!data && error) {
            return <ErrorBlock onRestartPress={onCurrentLocationPress} />;
          }

          if (!data) {
            return null;
          }

          return (
            <SafeAreaView
              style={[commonContainerStyles.flex, styles.container]}>
              <AppearingComponent isVisible={!isSearchOpen}>
                <View style={styles.rowContent}>
                  <Text style={styles.cityTitle}>{data.name}</Text>
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
              </AppearingComponent>
              <View
                style={[
                  commonContainerStyles.flex,
                  commonContainerStyles.center,
                ]}>
                <WeatherBlock
                  data={data.weatherInfo[0]}
                  temp={data.main.temp}
                />
              </View>
              <View style={styles.rowContent}>
                <ContentRow
                  title={I18n.t('wind')}
                  value={I18n.t('wind_output', data.wind)}
                />
                <ContentRow
                  title={I18n.t('pressure')}
                  value={I18n.t('pressure_output', data.main)}
                />
              </View>
              <View style={[styles.rowContent, styles.rowContentMargin]}>
                <ContentRow
                  title={I18n.t('humidity')}
                  value={I18n.toPercentage(data.main.humidity, {
                    precision: 0,
                  })}
                />
                <ContentRow
                  title={I18n.t('chance_of_rain')}
                  value={I18n.t('chance_of_rain_output', data)}
                />
              </View>
            </SafeAreaView>
          );
        }}
      </LoadingContainer>
      <SearchCityInput isVisible={isSearchOpen} onComplete={onSearchComplete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 19,
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
