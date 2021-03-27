import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

const SearchInput: React.FC<TextInputProps> = props => (
  <View style={styles.container}>
    <TextInput {...props} autoCorrect={false} style={styles.textInput} />
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
  textInput: {
    flex: 1,
  },
});

export default SearchInput;
