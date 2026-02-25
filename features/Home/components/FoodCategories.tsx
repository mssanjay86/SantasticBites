import React, { useState } from 'react';
import { SPACING } from '../../../common/styles/spacing';
import { COLORS } from '../../../common/styles/colors';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const categories = ['Pizza', 'Burger', 'Soft drinks', 'Meals'];

export const FoodCategories: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => {
          const isSelected = selected === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.item,
                isSelected && styles.itemSelected,
              ]}
              activeOpacity={0.7}
              onPress={() => setSelected(cat)}
            >
              <Text style={[
                styles.label,
                isSelected && styles.labelSelected,
              ]}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  item: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  itemSelected: {
    backgroundColor: COLORS.primary,
  },
  label: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  labelSelected: {
    color: COLORS.surface,
  },
});
