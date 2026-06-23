import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

export default function EditDesignerProfileScreen({ navigation }) {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    specialization: user?.specialization || '',
    experience: user?.experience || '',
    about: user?.about || '',
    image: user?.image || '',
  });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission Required', 'Please allow gallery access');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        image: `data:image/jpeg;base64,${result.assets[0].base64}`,
      });
    }
  };

  const handleSave = async () => {
    if (!user?._id) {
      Alert.alert('Error', 'User ID not found');
      return;
    }

    try {
      setLoading(true);

      const response = await API.put(`/designers/${user._id}`, formData);

      if (setUser) {
        setUser(response.data);
      }

      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      console.log('================ API ERROR ================');
      console.log('STATUS:', error?.response?.status);
      console.log('DATA:', error?.response?.data);
      console.log('MESSAGE:', error?.message);
      console.log('URL:', error?.config?.url);
      console.log('BASE URL:', error?.config?.baseURL);
      console.log('===========================================');

      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          error?.message ||
          'Failed to update profile'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#F7F2FF', '#EEF7FF', '#FFF7EC']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Edit Profile</Text>
          <Text style={styles.subtitle}>Update your designer information</Text>
        </View>

        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {formData.image ? (
            <Image source={{ uri: formData.image }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="camera" size={40} color="#7C5CFF" />
            </View>
          )}

          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            keyboardType="phone-pad"
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />

          <Text style={styles.label}>Specialization</Text>
          <TextInput
            style={styles.input}
            value={formData.specialization}
            onChangeText={(text) =>
              setFormData({ ...formData, specialization: text })
            }
          />

          <Text style={styles.label}>Experience</Text>
          <TextInput
            style={styles.input}
            value={formData.experience}
            onChangeText={(text) =>
              setFormData({ ...formData, experience: text })
            }
          />

          <Text style={styles.label}>About</Text>
          <TextInput
            style={styles.aboutInput}
            multiline
            value={formData.about}
            onChangeText={(text) => setFormData({ ...formData, about: text })}
          />

          <TouchableOpacity onPress={handleSave} disabled={loading}>
            <LinearGradient
              colors={['#7C5CFF', '#B86BFF']}
              style={styles.saveButton}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', marginTop: 50 },
  title: { fontSize: 30, fontWeight: '900', color: '#1D1A2F' },
  subtitle: { color: '#7B7890', marginTop: 5 },
  imageContainer: { alignSelf: 'center', marginTop: 25 },
  profileImage: { width: 130, height: 130, borderRadius: 30 },
  placeholder: {
    width: 130,
    height: 130,
    borderRadius: 30,
    backgroundColor: '#F1ECFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#7C5CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 30,
    elevation: 8,
  },
  label: {
    fontWeight: '800',
    color: '#1D1A2F',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  aboutInput: {
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    padding: 15,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 25,
    height: 58,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '900',
  },
});