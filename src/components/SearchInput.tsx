import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

const SearchInput = React.forwardRef<TextInput, TextInputProps>(
  (props, ref) => (
    <View style={styles.container}>
      <TextInput {...props} ref={ref} style={styles.textInput} />
    </View>
  ),
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
