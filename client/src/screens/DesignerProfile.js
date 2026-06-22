import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

export default function DesignerProfile({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.replace('Auth');
  };

  return (
    <LinearGradient
      colors={['#F7F2FF', '#EEF7FF', '#FFF7EC']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{
              uri:
                user?.image ||
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {user?.name || 'Designer'}
          </Text>

          <Text style={styles.email}>
            {user?.email}
          </Text>

          <View style={styles.ratingContainer}>
            <Ionicons
              name="star"
              size={18}
              color="#F4B860"
            />
            <Text style={styles.rating}>
              {user?.rating || 5}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>
            Designer Information
          </Text>

          <InfoRow
            icon="color-palette-outline"
            title="Style"
            value={user?.style}
          />

          <InfoRow
            icon="briefcase-outline"
            title="Specialization"
            value={user?.specialization}
          />

          <InfoRow
            icon="time-outline"
            title="Experience"
            value={user?.experience}
          />

          <InfoRow
            icon="call-outline"
            title="Phone"
            value={user?.phone}
          />

          <InfoRow
            icon="location-outline"
            title="Address"
            value={user?.address}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>About</Text>

          <Text style={styles.about}>
            {user?.about ||
              'No information added yet'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate(
              'EditDesignerProfile'
            )
          }
        >
          <Ionicons
            name="create-outline"
            size={22}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('AddWork')
          }
        >
          <Ionicons
            name="images-outline"
            size={22}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Add Work
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.messageButton}
          onPress={() =>
            navigation.navigate(
              'DesignerMessages'
            )
          }
        >
          <Ionicons
            name="chatbubbles-outline"
            size={22}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Customer Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

function InfoRow({
  icon,
  title,
  value,
}) {
  return (
    <View style={styles.row}>
      <Ionicons
        name={icon}
        size={22}
        color="#7C5CFF"
      />

      <View style={{ marginLeft: 10 }}>
        <Text style={styles.rowTitle}>
          {title}
        </Text>

        <Text style={styles.rowValue}>
          {value || 'Not Added'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#fff',
  },

  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#1D1A2F',
  },

  email: {
    color: '#666',
    marginTop: 5,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  rating: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1D1A2F',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  rowTitle: {
    fontWeight: 'bold',
    color: '#555',
  },

  rowValue: {
    color: '#888',
  },

  about: {
    lineHeight: 24,
    color: '#555',
  },

  button: {
    backgroundColor: '#7C5CFF',
    height: 55,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  messageButton: {
    backgroundColor: '#28C76F',
    height: 55,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButton: {
    backgroundColor: '#E04F5F',
    height: 55,
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});