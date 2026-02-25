import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export const WelcomeScreen = () => {
  const navigation = useNavigation();

  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const titleTranslate = useRef(new Animated.Value(40)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  const glowAnim1 = useRef(new Animated.Value(0)).current;
  const glowAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();

    // Title animation
    Animated.parallel([
      Animated.timing(titleTranslate, {
        toValue: 0,
        duration: 900,
        delay: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 900,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Background glowing circles animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim1, {
          toValue: 20,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim1, {
          toValue: -20,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim2, {
          toValue: -30,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim2, {
          toValue: 30,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      navigation.navigate('Login' as never);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>

      {/* Glowing Background Circles */}
      <Animated.View
        style={[
          styles.glowCircleLarge,
          { transform: [{ translateY: glowAnim1 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.glowCircleSmall,
          { transform: [{ translateY: glowAnim2 }] },
        ]}
      />

      {/* Logo */}
      <Animated.Image
        source={require('../images/welcome-image.png')}
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
        resizeMode="contain"
      />

      {/* Title */}
      <Animated.View
        style={{
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslate }],
        }}
      >
        <Text style={styles.title}>Santastic Bites</Text>
        <Text style={styles.subtitle}>
          Delicious food delivered fresh
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Dark premium background
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 170,
    height: 170,
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#CBD5E1',
    marginTop: 8,
    textAlign: 'center',
  },

  glowCircleLarge: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width,
    backgroundColor: 'rgba(255,107,107,0.15)',
    top: -width * 0.5,
  },

  glowCircleSmall: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width,
    backgroundColor: 'rgba(255,140,80,0.12)',
    bottom: -width * 0.4,
  },
});