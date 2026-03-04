import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { GlobalLayout } from '../../../common/components/GlobalLayout';
import { SPACING } from '../../../common/styles/spacing';
import { COLORS } from '../../../common/styles/colors';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/types';
import apiHelper from '../../../common/config/apihelper';
import Toast from '../../../common/components/Toast';

export const LoginScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [credentials, setCredentials] = React.useState({
    mobile: '',
    password: '',
  });
  const [showToast, setShowToast] = React.useState(false);
  const [showToastMessage, setShowToastMessage] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const login = async () => {
    Keyboard.dismiss();
    let res = await apiHelper(
      `/Auth/api/login?mobile=${credentials.mobile}&password=${credentials.password}`,
      'GET',
    );
    console.log('Login response:', res);
    setShowToast(true);
    setShowToastMessage(res.message);
    if (res.isSuccess) {
      if (res.userType.toLowerCase() === 'consumer') {
        setTimeout(() => {
          navigation.navigate('ConsumerHome');
        }, 500);
      } else if (res.userType.toLowerCase() === 'provider') {
        setTimeout(() => {
          navigation.navigate('ProviderHome');
        }, 500);
      }else{
        setShowToastMessage('Unknown user type');
      }
    }
  };

  return (
    <GlobalLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subtitle}>
            Login to continue enjoying delicious food
          </Text>

          {/* Username */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              placeholder="Enter your mobile number"
              placeholderTextColor={COLORS.textSecondary}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="phone-pad"
              value={credentials.mobile}
              onChangeText={text => {
                //console.log('Mobile number changed:', text);
                setCredentials(prev => ({ ...prev, mobile: text }));
              }}
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.textSecondary}
                style={[styles.input, styles.passwordInput]}
                value={credentials.password}
                onChangeText={text => {
                  setCredentials(prev => ({ ...prev, password: text }));
                }}
                secureTextEntry={!showPassword}
              />
              <Pressable
                onPress={() => setShowPassword(prev => !prev)}
                style={styles.eyeButton}
                android_ripple={{
                  color: 'rgba(255,255,255,0.1)',
                  borderless: true,
                }}
              >
                <Text style={styles.eye}>{showPassword ? '🙈' : '👁️'}</Text>
              </Pressable>
            </View>
          </View>

          {/* Submit */}
          <Pressable
            style={({ pressed }) => [
              credentials.mobile && credentials.password
                ? styles.button
                : { ...styles.button, opacity: 0.6 },
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            disabled={!credentials.mobile || !credentials.password}
            android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
            onPress={login}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Text style={styles.footerText}>
            Don’t have an account?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Register')}
            >
              Sign up
            </Text>
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {showToast && (
        <Toast
          message={showToastMessage}
          visible={showToast}
          onHide={() => setShowToast(false)}
        />
      )}
    </GlobalLayout>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderRadius: 24,
    padding: SPACING.xl,
    borderWidth: 1,
    // use theme border so the outline stays consistent and visible
    borderColor: COLORS.border,
    // constrain width for a narrower look
    width: '90%',
    maxWidth: 360,
    alignSelf: 'center',
    // removed shadow for cleaner flat appearance
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
    fontFamily: 'Inter-Regular',
  },
  input: {
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 16,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontFamily: 'Inter-Regular',
  },
  passwordWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
  },
  footerText: {
    marginTop: 18,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  link: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
