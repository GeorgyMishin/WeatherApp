import React from 'react';
import { Animated, ViewStyle } from 'react-native';

const defaultInterpolator = (val: Animated.Value): object => {
  return {
    opacity: val.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };
};

type AppearingComponentProps = {
  interpolator?: typeof defaultInterpolator;
  isVisible?: boolean;
  style?: ViewStyle | ViewStyle[];
  children: any;
};

const AppearingComponentDumb: React.FC<AppearingComponentProps> = ({
  isVisible,
  interpolator = defaultInterpolator,
  style,
  children,
  ...props
}) => {
  const [rendering, setRendering] = React.useState(isVisible);
  const transition = React.useMemo(
    () => new Animated.Value(isVisible ? 1 : 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const interpolatedStyles = React.useMemo(() => interpolator(transition), [
    transition,
    interpolator,
  ]);

  React.useEffect(() => {
    if (isVisible) {
      setRendering(true);
    }

    Animated.timing(transition, {
      toValue: isVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !isVisible) {
        setRendering(false);
      }
    });
  }, [isVisible, transition]);

  return rendering ? (
    <Animated.View style={[style, interpolatedStyles]} {...props}>
      {children}
    </Animated.View>
  ) : null;
};

const AppearingComponent = React.memo(AppearingComponentDumb);

export default AppearingComponent;
