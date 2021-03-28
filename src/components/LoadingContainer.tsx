import React from 'react';
import { View, ActivityIndicator, StyleSheet, Animated } from 'react-native';

import commonContainerStyles from '../styles/containers';

type LoadingContainerProps = {
  isLoading: boolean;
  children: (renderTransition: Animated.Value) => React.ReactElement | null;
  interpolator?: (transition: Animated.Value) => object;
};

const defaultInterpolator = (val: Animated.Value): object => {
  return {
    opacity: val.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };
};

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  isLoading,
  children,
  interpolator = defaultInterpolator,
}) => {
  const transition = React.useMemo(() => new Animated.Value(0), []);
  const renderStyles = React.useMemo(() => interpolator(transition), [
    interpolator,
    transition,
  ]);

  React.useEffect(() => {
    const animation = Animated.timing(transition, {
      useNativeDriver: true,
      toValue: isLoading ? 0 : 1,
      duration: isLoading ? 0 : 500,
      delay: 0,
    });

    animation.start();

    return () => {
      animation.stop();
      animation.reset();
    };
  }, [transition, isLoading]);

  return (
    <View
      style={[
        commonContainerStyles.flex,
        isLoading && commonContainerStyles.center,
      ]}>
      {isLoading ? (
        <ActivityIndicator style={styles.activityIndicator} color="#fff" />
      ) : (
        <Animated.View style={[commonContainerStyles.flex, renderStyles]}>
          {children(transition)}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    marginVertical: 'auto',
    marginHorizontal: 'auto',
  },
});

export default LoadingContainer;
