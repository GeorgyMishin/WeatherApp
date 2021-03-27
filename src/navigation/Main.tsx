import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Weather from './Weather';
import { Initialize } from '../screens';
import { getIsAppInitializing } from '../modules/app';

const Main: React.FC = () => {
  const isInitializing = useSelector(getIsAppInitializing);

  if (isInitializing) {
    return <Initialize />;
  }

  return (
    <NavigationContainer>
      <Weather />
    </NavigationContainer>
  );
};

export default Main;
