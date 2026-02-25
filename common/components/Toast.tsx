import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

interface ToastProps {
  visible: boolean;
  message: string;
  duration?: number;
  onHide?: () => void;
}

/**
 * A simple toast message component.
 * Controlled by the parent via `visible` and `message` props.
 * Automatically hides after `duration` milliseconds and calls `onHide`.
 */
const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  duration = 2000,
  onHide,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      // animate in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (duration > 0) {
          timer.current = setTimeout(() => {
            Animated.parallel([
              Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(translateY, {
                toValue: 40,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start(() => {
              onHide && onHide();
            });
          }, duration);
        }
      });
    } else {
      // animate out immediately when visibility toggles off
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 40,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        { opacity, transform: [{ translateY }] },
      ]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Toast;
