import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

type LabelButtonProps = {
  title: string;
  onPress?: () => void;
};

const LabelButton: React.FC<LabelButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexShrink: 1,
  },
  text: {
    color: '#fff',
    opacity: 0.6,
  },
});

export default LabelButton;
