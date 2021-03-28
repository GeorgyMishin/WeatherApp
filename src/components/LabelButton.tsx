import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
  Image,
} from 'react-native';

import commonTextStyles from '../styles/text';

type LabelButtonProps = {
  title: string;
  icon?: ImageSourcePropType;
  onPress?: () => void;
};

const LabelButton: React.FC<LabelButtonProps> = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    {icon && <Image source={icon} />}
    <Text style={[commonTextStyles.light, styles.text]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    opacity: 0.6,
  },
});

export default LabelButton;
