import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';

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
    <TextInput {...props} autoCorrect={false} style={styles.textInput} />
    <TouchableOpacity onPress={onCompletePress}>
      <Text style={styles.completeTitle}>{completeTitle}</Text>
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
  textInput: {
    flex: 1,
  },
  completeTitle: {
    color: '#1086FF',
    fontSize: 15,
    textTransform: 'uppercase',
  },
});

export default SearchInput;
