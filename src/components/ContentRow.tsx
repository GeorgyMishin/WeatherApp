import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import commonTextStyles from '../styles/text';

type ContentRowProps = {
  title: string;
  value: string;
};

const ContentRowDumb: React.FC<ContentRowProps> = ({ title, value }) => (
  <View style={styles.container}>
    <Text style={[commonTextStyles.light, styles.title]}>{title}</Text>
    <Text style={[commonTextStyles.light, styles.value]}>{value}</Text>
  </View>
);

const ContentRow = React.memo(ContentRowDumb);

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    opacity: 0.6,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ContentRow;
