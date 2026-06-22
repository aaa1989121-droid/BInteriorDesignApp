import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// استيراد الـ Contexts
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

// استيراد الشاشات التي عدلناها
import DesignersScreen from './src/screens/DesignersScreen';
import DesignerDetailsScreen from './src/screens/DesignerDetailsScreen';
import ChatScreen from './src/screens/ChatScreen';
import AuthScreen from './src/screens/AuthScreen';
import AdminLogin from './src/screens/AdminLogin';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from './src/screens/HomeScreen';
import DesignProfile from './src/screens/DesignerProfile';
import DesignerMessagesScreen from './src/screens/DesignerMessagesScreen';

const Stack = createStackNavigator();


export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen 
              name="Designers" 
              component={DesignersScreen} 
              options={{ title: 'מעצבים' }} 
            />
            <Stack.Screen 
              name="DesignerDetails" 
              component={DesignerDetailsScreen} 
              options={{ title: 'פרטי מעצב' }} 
            />
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen} 
              options={{ title: 'שיחה' }} 
            />
            <Stack.Screen 
              name="Auth" 
              component={AuthScreen} 
              options={{ title: 'התחברות/הרשמה' }} 
            />
            <Stack.Screen 
              name="AdminLogin" 
              component={AdminLogin} 
              options={{ title: 'כניסת מנהל' }} 
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ title: 'פרופיל' }} 
            />
            <Stack.Screen 
              name="Splash" 
              component={SplashScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="DesignProfile" 
              component={DesignProfile} 
              options={{ title: 'פרופיל מעצב' }} 
            />
            <Stack.Screen 
              name="DesignerMessages" 
              component={DesignerMessagesScreen} 
              options={{ title: 'הודעות' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}