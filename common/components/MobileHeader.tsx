import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/core';
// lucide-react-native provides vector icons compatible with React Native
import { ArrowLeft } from 'lucide-react-native';
import { SPACING } from '../styles/spacing';
import { COLORS } from '../styles/colors';


interface MobileHeaderProps {
  title: string;
  onBack?: (e: GestureResponderEvent) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ title, onBack }) => {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

  const handleBack = (e: GestureResponderEvent) => {
    if (onBack) {
      onBack(e);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleBack}
        android_ripple={{ color: 'rgba(0,0,0,0.1)', borderless: true }}
        style={styles.backButton}
      >
        <ArrowLeft color={COLORS.text} size={24} />
      </Pressable>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {/* spacer so title stays centered */}
      <View style={styles.spacer} />
    </View>
  );
};

export default MobileHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: -10,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: SPACING.lg,
    //backgroundColor: '#0B1020', // match GlobalLayout background
    borderBottomWidth: 0,
    //borderBottomColor: '#ccc',
    zIndex: 1000,
  },
  backButton: {
    //padding: SPACING.xs,
  },
  arrow: {
    fontSize: 24,
    color: COLORS.text,
  },
  title: {
    flex: 1,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
  },
  spacer: {
    width: 32, // same width as back button to center title
  },
});