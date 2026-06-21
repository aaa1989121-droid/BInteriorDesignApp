import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUploader({ onImagePicked }) {
  const openCamera = async () => {
    // בקשת הרשאת גישה למצלמה
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("שגיאה", "דרושה הרשאת גישה למצלמה כדי להמשיך");
      return;
    }

    // פתיחת המצלמה
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Button title="צלם תמונה" onPress={openCamera} />
    </View>
  );
}