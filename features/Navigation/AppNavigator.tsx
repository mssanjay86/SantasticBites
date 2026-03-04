import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../../common/screens/WelcomeScreen';
import { LoginScreen } from '../Login/screens/LoginScreen';
import { RootStackParamList } from './types';
import RegisterScreen from '../Login/screens/RegisterScreen';
import { ConsumerHome } from '../Home/screens/ConsumerHome';
import { ProviderHome } from '../Home/screens/ProviderHome';


const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ConsumerHome" component={ConsumerHome} />
        <Stack.Screen name="ProviderHome" component={ProviderHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
