import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';

import commonTextStyles from '../styles/text';
import commonContainerStyles from '../styles/containers';

type SearchInputProps = TextInputProps & {
  completeTitle: string;
  onCompletePress?: () => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  completeTitle,
  onCompletePress,
  ...props
}) => (
  <View style={styles.container}>
    <TextInput
      {...props}
      autoCorrect={false}
      style={commonContainerStyles.flex}
    />
    <TouchableOpacity onPress={onCompletePress}>
      <Text style={[styles.completeTitle, commonTextStyles.link]}>
        {completeTitle}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 18,
    marginRight: 16,
  },
  completeTitle: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
});

export default SearchInput;
