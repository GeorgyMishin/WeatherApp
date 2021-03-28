import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import commonTextStyles from '../styles/text';

type LabelButtonProps = {
  title: string;
  onPress?: () => void;
};

const LabelButton: React.FC<LabelButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={[commonTextStyles.light, styles.text]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexShrink: 1,
  },
  text: {
    opacity: 0.6,
  },
});

export default LabelButton;
