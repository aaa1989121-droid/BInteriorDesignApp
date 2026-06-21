import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function RegistrationScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = async () => {
    if (
      !formData.fullName ||
      !formData.idNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Alert.alert('שגיאה', 'נא למלא את כל השדות');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('שגיאה', 'הסיסמאות אינן תואמות');
      return;
    }

    setIsLoading(true);

    try {
      await axios.post('http://10.69.2.12:5000/api/auth/register', {
        fullName: formData.fullName,
        idNumber: formData.idNumber,
        email: formData.email,
        password: formData.password,
      });

      Alert.alert('הצלחה', 'החשבון נוצר בהצלחה!');
      navigation.navigate('Designers');
    } catch (error) {
      Alert.alert(
        'שגיאה',
        error.response?.data?.message || 'אירעה שגיאה בהרשמה'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const InputBox = ({ icon, placeholder, name, secure, keyboardType }) => (
    <View style={styles.inputBox}>
      <Ionicons name={icon} size={22} color="#C9A646" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={secure}
        keyboardType={keyboardType || 'default'}
        value={formData[name]}
        onChangeText={(text) => handleChange(name, text)}
      />
    </View>
  );

  return (
    <LinearGradient colors={['#050505', '#101820', '#1C1C1C']} style={styles.bg}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="diamond" size={42} color="#D4AF37" />
          </View>
          <Text style={styles.title}>Luxury Interior</Text>
          <Text style={styles.subtitle}>Create your elegant account</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>הרשמה למשתמש חדש</Text>
          <Text style={styles.cardSubtitle}>בחרת מעצב? צור חשבון והמשך</Text>

          <InputBox
            icon="person-outline"
            placeholder="שם מלא"
            name="fullName"
          />

          <InputBox
            icon="card-outline"
            placeholder="מספר זהות"
            name="idNumber"
            keyboardType="numeric"
          />

          <InputBox
            icon="mail-outline"
            placeholder="אימייל"
            name="email"
            keyboardType="email-address"
          />

          <InputBox
            icon="lock-closed-outline"
            placeholder="סיסמה"
            name="password"
            secure
          />

          <InputBox
            icon="shield-checkmark-outline"
            placeholder="אימות סיסמה"
            name="confirmPassword"
            secure
          />

          <TouchableOpacity onPress={handleRegistration} disabled={isLoading}>
            <LinearGradient
              colors={['#D4AF37', '#B8860B']}
              style={styles.button}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>צור חשבון</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>
              כבר יש לך חשבון? <Text style={styles.loginBold}>התחבר</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 22,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(212,175,55,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    marginBottom: 15,
  },
  title: {
    color: '#fff',
    fontSize: 31,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#C9C9C9',
    fontSize: 15,
    marginTop: 6,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 12,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
  },
  cardSubtitle: {
    color: '#777',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 22,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#111',
    textAlign: 'right',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 18,
    color: '#555',
    fontSize: 14,
  },
  loginBold: {
    color: '#B8860B',
    fontWeight: 'bold',
  },
});