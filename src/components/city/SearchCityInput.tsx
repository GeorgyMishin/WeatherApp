import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppearingComponent from '../AppearingComponent';
import SearchInput from '../SearchInput';
import { getWeatherRequest } from '../../modules/weather';

const SearchCityInputDumb: React.FC<{
  isVisible: boolean;
  onComplete: () => void;
}> = ({ isVisible, onComplete }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const onCompleteSearch = React.useCallback(() => {
    dispatch(getWeatherRequest({ q: searchValue }));
    onComplete();
  }, [dispatch, searchValue, onComplete]);

  return (
    <AppearingComponent
      isVisible={isVisible}
      style={[styles.container, { top: insets.top + 27 }]}>
      <SearchInput
        value={searchValue}
        onChangeText={setSearchValue}
        onSubmitEditing={onCompleteSearch}
        autoFocus
      />
    </AppearingComponent>
  );
};

const SearchCityInput = React.memo(SearchCityInputDumb);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 53,
    left: 21,
    right: 21,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOpacity: 0.15,
    borderRadius: 4,
  },
});

export default SearchCityInput;
