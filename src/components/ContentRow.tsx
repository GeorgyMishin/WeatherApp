import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type ContentRowProps = {
  title: string;
  value: string;
};

const ContentRowDumb: React.FC<ContentRowProps> = ({ title, value }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const ContentRow = React.memo(ContentRowDumb);

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.6,
  },
  value: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ContentRow;
