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
  const showBack = title !== 'Home';

  const handleBack = (e: GestureResponderEvent) => {
    if (onBack) {
      onBack(e);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {showBack && (
        <Pressable
          onPress={handleBack}
          android_ripple={{ color: 'rgba(0,0,0,0.1)', borderless: true }}
          style={styles.backButton}
        >
          <ArrowLeft color={COLORS.text} size={24} />
        </Pressable>
      )}
      <Text numberOfLines={1} style={[styles.title, showBack && styles.titleWithBack]}>
        {title}
      </Text>
    </View>
  );
};

export default MobileHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: SPACING.lg,
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
  },
  titleWithBack: {
    marginLeft: 8,
  },
});
