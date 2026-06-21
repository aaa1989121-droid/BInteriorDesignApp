import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await logout();
            navigation.replace('Auth');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9pUIZ9wcE5XUFNh8wvD3NwSPBslE6-20D8F0cA8RCQ&s',
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {user?.fullName || 'User'}
        </Text>

        <Text style={styles.email}>
          {user?.email || 'No Email'}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons
            name="person-outline"
            size={22}
            color="#7C5CFF"
          />

          <View style={styles.info}>
            <Text style={styles.label}>
              Full Name
            </Text>

            <Text style={styles.value}>
              {user?.fullName || '-'}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Ionicons
            name="mail-outline"
            size={22}
            color="#7C5CFF"
          />

          <View style={styles.info}>
            <Text style={styles.label}>
              Email
            </Text>

            <Text style={styles.value}>
              {user?.email || '-'}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Ionicons
            name="card-outline"
            size={22}
            color="#7C5CFF"
          />

          <View style={styles.info}>
            <Text style={styles.label}>
              ID Number
            </Text>

            <Text style={styles.value}>
              {user?.idNumber || '-'}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color="#fff"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2FF',
    paddingHorizontal: 20,
  },

  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#7C5CFF',
  },

  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1D1A2F',
    marginTop: 15,
  },

  email: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  info: {
    marginLeft: 15,
    flex: 1,
  },

  label: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D1A2F',
  },

  separator: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: 5,
  },

  logoutButton: {
    marginTop: 30,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#7C5CFF',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    marginLeft: 8,
  },
});