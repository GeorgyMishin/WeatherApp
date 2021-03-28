import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LabelButton from './LabelButton';

import commonContainerStyles from '../styles/containers';
import commonTextStyles from '../styles/text';
import I18n from '../locales';

type ErrorBlockProps = {
  onRestartPress?: () => void;
};

const ErrorBlock: React.FC<ErrorBlockProps> = ({ onRestartPress }) => (
  <View style={[commonContainerStyles.flex, commonContainerStyles.center]}>
    <Text style={[styles.title, commonTextStyles.light]}>
      {I18n.t('error')}
    </Text>
    <LabelButton title={I18n.t('restart')} onPress={onRestartPress} />
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});

export default ErrorBlock;
