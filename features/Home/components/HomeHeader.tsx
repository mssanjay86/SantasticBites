import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../../common/styles/colors';
import { SPACING } from '../../../common/styles/spacing';

interface HomeHeaderProps {
  userName?: string;
}

/**
 * Simple header for home screen with greeting and subtext aligned left.
 */
const HomeHeader: React.FC<HomeHeaderProps> = ({ userName = 'User' }) => {

    
  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.greeting}>Hello, {userName}</Text>
        <Text style={styles.subtext}>What you want today</Text>
      </View>
      <Image
        // public placeholder avatar; can be replaced with user-specific URI later
        source={{ uri: 'https://i.pravatar.cc/40?u=default' }}
        style={styles.avatar}
      />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: 'transparent',
  },
  textGroup: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 12,
  },
});
