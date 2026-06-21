import React, { useState, memo } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const InputField = memo(function InputField({
  icon,
  placeholder,
  value,
  onChangeText,
  secure,
  keyboardType,
}) {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={20} color="#7C5CFF" />
      </View>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8D8A9B"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        keyboardType={keyboardType || 'default'}
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit={false}
        textAlign="right"
      />
    </View>
  );
});

export default function AuthScreen({ navigation }) {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    password: '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAuth = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    if (mode === 'register' && (!formData.fullName || !formData.idNumber)) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      let response;

      if (mode === 'register') {
        response = await API.post('/auth/register', {
          fullName: formData.fullName,
          idNumber: formData.idNumber,
          email: formData.email,
          password: formData.password,
        });

        Alert.alert('Success', 'Registration successful');
      } else {
        response = await API.post('/auth/login', {
          email: formData.email,
          password: formData.password,
        });
      }

      console.log('SERVER RESPONSE:', response.data);

      if (response.data.user) {
        await login({
          ...response.data.user,
          token: response.data.token,
        });
      }

      navigation.replace('Designers');
    } catch (error) {
      console.log('AUTH ERROR:', error.response?.data || error.message);

      Alert.alert(
        'Error',
        error.response?.data?.message ||
          error.response?.data?.error ||
          'Server Error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#F7F2FF', '#EEF7FF', '#FFF7EC']}
      style={styles.screen}
    >
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topDecoration} />

          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#7C5CFF', '#B86BFF', '#F4B860']}
              style={styles.logo}
            >
              <MaterialCommunityIcons name="floor-plan" size={42} color="#fff" />
            </LinearGradient>
          </View>

          <Text style={styles.appName}>INTERIA</Text>

          <Text style={styles.mainTitle}>
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </Text>

          <Text style={styles.subtitle}>
            עיצוב פנים חכם, יוקרתי ומותאם אישית
          </Text>

          <View style={styles.formCard}>
            <View style={styles.modeBox}>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  mode === 'login' && styles.activeMode,
                ]}
                onPress={() => setMode('login')}
              >
                <Text
                  style={[
                    styles.modeText,
                    mode === 'login' && styles.activeModeText,
                  ]}
                >
                  התחברות
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modeButton,
                  mode === 'register' && styles.activeMode,
                ]}
                onPress={() => setMode('register')}
              >
                <Text
                  style={[
                    styles.modeText,
                    mode === 'register' && styles.activeModeText,
                  ]}
                >
                  הרשמה
                </Text>
              </TouchableOpacity>
            </View>

            {mode === 'register' && (
              <>
                <InputField
                  icon="person-outline"
                  placeholder="שם מלא"
                  value={formData.fullName}
                  onChangeText={(v) => updateField('fullName', v)}
                />

                <InputField
                  icon="id-card-outline"
                  placeholder="תעודת זהות"
                  value={formData.idNumber}
                  keyboardType="numeric"
                  onChangeText={(v) => updateField('idNumber', v)}
                />
              </>
            )}

            <InputField
              icon="mail-outline"
              placeholder="אימייל"
              value={formData.email}
              keyboardType="email-address"
              onChangeText={(v) => updateField('email', v)}
            />

            <InputField
              icon="lock-closed-outline"
              placeholder="סיסמה"
              value={formData.password}
              secure
              onChangeText={(v) => updateField('password', v)}
            />

            <TouchableOpacity onPress={handleAuth} disabled={loading}>
              <LinearGradient
                colors={['#7C5CFF', '#B86BFF']}
                style={styles.primaryButton}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    {mode === 'login' ? 'התחבר עכשיו' : 'צור חשבון'}
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => navigation.navigate('Designers')}
            >
              <Ionicons name="sparkles-outline" size={20} color="#7C5CFF" />
              <Text style={styles.guestText}>כניסה כאורח וצפייה במעצבים</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            Find your perfect designer with style
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  topDecoration: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: 'rgba(124,92,255,0.18)',
  },
  logoContainer: {
    alignSelf: 'center',
    marginBottom: 14,
  },
  logo: {
    width: 92,
    height: 92,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 12,
    transform: [{ rotate: '-6deg' }],
  },
  appName: {
    textAlign: 'center',
    color: '#7C5CFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 4,
    marginTop: 8,
  },
  mainTitle: {
    textAlign: 'center',
    color: '#1D1A2F',
    fontSize: 34,
    fontWeight: '900',
    marginTop: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#6E6A7C',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 26,
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 34,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.2,
    shadowRadius: 22,
    elevation: 14,
  },
  modeBox: {
    flexDirection: 'row-reverse',
    backgroundColor: '#F0ECFF',
    borderRadius: 22,
    padding: 6,
    marginBottom: 22,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 17,
    alignItems: 'center',
  },
  activeMode: {
    backgroundColor: '#1D1A2F',
  },
  modeText: {
    color: '#7B7890',
    fontWeight: '800',
    fontSize: 15,
  },
  activeModeText: {
    color: '#fff',
  },
  inputWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: 14,
    minHeight: 58,
    borderWidth: 1,
    borderColor: '#EFEAFB',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#F1ECFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1D1A2F',
    paddingHorizontal: 12,
  },
  primaryButton: {
    height: 58,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '900',
  },
  guestButton: {
    height: 54,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#CFC3FF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    gap: 8,
    marginTop: 14,
    backgroundColor: '#FBFAFF',
  },
  guestText: {
    color: '#5A42C9',
    fontSize: 15,
    fontWeight: '800',
  },
  footerText: {
    textAlign: 'center',
    color: '#8D8A9B',
    marginTop: 22,
    fontSize: 13,
    fontWeight: '600',
  },
});