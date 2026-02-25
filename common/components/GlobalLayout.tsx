import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { SPACING } from '../styles/spacing';
import { COLORS } from '../styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GlobalLayoutProps {
  children: ReactNode;
}

export const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
      <SafeAreaView style={styles.container}>
        {/* Background glow accents */}
        <View style={styles.bgTopGlow} />
        <View style={styles.bgBottomGlow} />
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  bgTopGlow: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 200,
    backgroundColor: COLORS.primary,
    opacity: 0.24,
  },
  bgBottomGlow: {
    position: 'absolute',
    bottom: -140,
    right: -90,
    width: 320,
    height: 320,
    borderRadius: 200,
    backgroundColor: COLORS.accent,
    opacity: 0.20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.sm,
  },
});
