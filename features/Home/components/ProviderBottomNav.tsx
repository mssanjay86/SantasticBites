import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { House, Package, UserRound, UtensilsCrossed } from 'lucide-react-native';
import { COLORS } from '../../../common/styles/colors';
import { SPACING } from '../../../common/styles/spacing';

type ProviderBottomTab = 'home' | 'manageFood' | 'orders' | 'profile';

interface ProviderBottomNavProps {
  activeTab?: ProviderBottomTab;
}

const TABS: Array<{
  key: ProviderBottomTab;
  label: string;
  Icon: React.ComponentType<{ color?: string; size?: number; strokeWidth?: number }>;
}> = [
  { key: 'home', label: 'Home', Icon: House },
  { key: 'manageFood', label: 'Manage Food', Icon: UtensilsCrossed },
  { key: 'orders', label: 'Orders', Icon: Package },
  { key: 'profile', label: 'Profile', Icon: UserRound },
];

export const ProviderBottomNav: React.FC<ProviderBottomNavProps> = ({ activeTab = 'home' }) => {
  return (
    <View style={styles.container}>
      {TABS.map(({ key, label, Icon }) => {
        const isActive = key === activeTab;
        const color = isActive ? COLORS.primary : '#6B7280';

        return (
          <Pressable key={key} style={styles.tabButton}>
            <Icon color={color} size={18} strokeWidth={2.2} />
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabLabelActive: {
    color: COLORS.primary,
  },
});
