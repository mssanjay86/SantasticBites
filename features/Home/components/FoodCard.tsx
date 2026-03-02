import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { SPACING } from '../../../common/styles/spacing';
import { COLORS } from '../../../common/styles/colors';

interface FoodCardProps {
  image: ImageSourcePropType;
  name: string;
  price: string | number;
  style?: any;
}

export const FoodCard: React.FC<FoodCardProps> = ({ image, name, price, style }) => {
  return (
    <View style={[styles.container, style]}>  
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>₹{typeof price === 'number' ? price.toFixed(2) : price}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 260,          // slightly smaller card
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginRight: SPACING.md,
    justifyContent: 'space-between', // spread items to top and bottom
    paddingBottom: SPACING.sm,
  },
  image: {
    width: '70%',        // make the image fill top portion
    height: 120,
    alignSelf: 'center',
    marginTop: SPACING.sm,
  },
  name: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: SPACING.xs,
    marginHorizontal: SPACING.xs,
    marginLeft: SPACING.lg, // align name slightly left of center

},
  price: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
    marginVertical: SPACING.xs,
    marginHorizontal: SPACING.xs,
    marginLeft: SPACING.lg, // align price with name
  },
  buttonText: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING.xs,
    marginHorizontal: SPACING.xs,
    // ensure it sits above bottom edge
    marginBottom: SPACING.xs,
  },
});
