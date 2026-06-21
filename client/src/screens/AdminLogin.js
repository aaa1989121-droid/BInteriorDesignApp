import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api'; // استيراد الـ instance مباشرة

const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("שגיאה", "אנא מלא את כל השדות");
      return;
    }

    setLoading(true);
    try {
      // إرسال طلب تسجيل الدخول
      const response = await API.post('/auth/login', { email, password });
      
      // حفظ التوكين والبيانات في ذاكرة الهاتف
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      
      Alert.alert("הצלחה", "התחברת בהצלחה!");
      navigation.replace('Designers'); // التأكد من اسم الشاشة الصحيح في الـ Navigator
    } catch (error) {
      const errorMsg = error.response?.data?.error || "פרטי התחברות שגויים או שהשרת אינו זמין";
      Alert.alert("שגיאה", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>התחברות מנהל</Text>
      
      <TextInput 
        placeholder="אימייל" 
        onChangeText={setEmail} 
        value={email} 
        style={styles.input} 
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="סיסמה" 
        secureTextEntry 
        onChangeText={setPassword} 
        value={password} 
        style={styles.input} 
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>התחבר</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#f9f9f9' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 30, 
    color: '#002244' 
  },
  input: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    textAlign: 'right', 
    borderWidth: 1, 
    borderColor: '#ddd' 
  },
  button: { 
    backgroundColor: '#002244', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});

export default AdminLogin;