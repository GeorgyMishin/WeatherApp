import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

type SwitcherItem = {
  id: string;
  title: string;
};

type SwitcherProps = {
  items: SwitcherItem[];
  initialItemId?: string;
  onStateChange?: (id: string) => void;
};

const Switcher: React.FC<SwitcherProps> = ({
  items,
  initialItemId,
  onStateChange,
}) => {
  const [selectedItemId, setSelectedItemId] = React.useState<
    string | undefined
  >(initialItemId || items[0]?.id);

  const onItemPress = React.useCallback(
    (id: string) => {
      setSelectedItemId(id);

      if (id !== selectedItemId) {
        onStateChange?.(id);
      }
    },
    [selectedItemId, onStateChange],
  );

  return (
    <View style={styles.container}>
      {items.map(({ title, id }) => (
        <TouchableOpacity
          key={id}
          style={[styles.item, id === selectedItemId && styles.selectedItem]}
          onPress={() => onItemPress?.(id)}>
          <Text
            style={[
              styles.itemTitle,
              id === selectedItemId && styles.selectedItemTitle,
            ]}>
            {title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: 29,
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  selectedItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  itemTitle: {
    color: '#fff',
    fontSize: 18,
    opacity: 0.4,
  },
  selectedItemTitle: {
    opacity: 1,
    fontWeight: 'bold',
  },
});

export default Switcher;
