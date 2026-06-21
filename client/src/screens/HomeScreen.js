import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Designers');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#F7F2FF', '#EEF7FF', '#FFF7EC']}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <LinearGradient
          colors={['#7C5CFF', '#B86BFF', '#F4B860']}
          style={styles.logoBox}
        >
          <MaterialCommunityIcons
            name="floor-plan"
            size={70}
            color="#fff"
          />
        </LinearGradient>
      </View>

      <Text style={styles.appName}>
        INTERIA
      </Text>

      <Text style={styles.subtitle}>
        Luxury Interior Designers
      </Text>

      <Text style={styles.description}>
        Design Your Dream Space
      </Text>

      <ActivityIndicator
        size="large"
        color="#7C5CFF"
        style={styles.loader}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    marginBottom: 30,
  },

  logoBox: {
    width: 150,
    height: 150,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#7C5CFF',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 15,
  },

  appName: {
    fontSize: 42,
    fontWeight: '900',
    color: '#1D1A2F',
    letterSpacing: 5,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#7C5CFF',
  },

  description: {
    marginTop: 8,
    fontSize: 15,
    color: '#777',
  },

  loader: {
    marginTop: 50,
  },
});