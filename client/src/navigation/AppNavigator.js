import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; // إضافة ضرورية
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

// استيراد الشاشات
import DesignersScreen from '../screens/DesignersScreen';
import AdminLogin from '../screens/AdminLogin';
import ProfileScreen from './screens/ProfileScreen';
const Stack = createStackNavigator();

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    // NavigationContainer هو الحاوية الأساسية التي كانت مفقودة
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Designers" component={DesignersScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={AdminLogin} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}