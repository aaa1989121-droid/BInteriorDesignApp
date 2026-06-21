import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const { width } = Dimensions.get('window');

export default function DesignerDetailsScreen({ route, navigation }) {
  const { designerId } = route.params;

  const [designer, setDesigner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('אודות');

  const { user, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const loadDesignerDetails = async () => {
      try {
        const response = await API.get(`/designers/${designerId}`);
        setDesigner(response.data);
      } catch (err) {
        Alert.alert('שגיאה', 'לא ניתן לטעון את פרטי המעצב.');
      } finally {
        setLoading(false);
      }
    };

    loadDesignerDetails();
  }, [designerId]);

  const handleStartChat = () => {
    if (user) {
      navigation.navigate('Chat', {
        designerId: designer._id,
        name: designer.name,
        image: designer.image,
      });
    } else {
      Alert.alert('כניסה נדרשת', 'עליך להתחבר כדי להתחיל שיחה.', [
        { text: 'ביטול', style: 'cancel' },
        { text: 'מעבר להתחברות', onPress: () => navigation.navigate('Auth') },
      ]);
    }
  };

  if (loading || isAuthLoading) {
    return (
      <LinearGradient colors={['#F7F2FF', '#EEF7FF', '#FFF7EC']} style={styles.center}>
        <ActivityIndicator size="large" color="#7C5CFF" />
        <Text style={styles.loadingText}>טוען פרטי מעצב...</Text>
      </LinearGradient>
    );
  }

  if (!designer) {
    return (
      <View style={styles.center}>
        <Text>המעצב לא נמצא</Text>
      </View>
    );
  }

  const galleryImages = designer.gallery?.length
    ? designer.gallery
    : [designer.image, designer.image, designer.image];

  const renderTabContent = () => {
    if (activeTab === 'אודות') {
      return designer.about || 'אין מידע זמין';
    }

    if (activeTab === 'תיק עבודות') {
      return designer.works?.length ? designer.works.join('\n\n') : 'אין פרויקטים';
    }

    return designer.reviews?.length ? designer.reviews.join('\n\n') : 'אין ביקורות';
  };

  return (
    <LinearGradient colors={['#F7F2FF', '#EEF7FF', '#FFF7EC']} style={styles.bg}>
      <SafeAreaView style={styles.bg}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <FlatList
              data={galleryImages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.heroImage} />
              )}
            />

            <LinearGradient
              colors={['rgba(29,26,47,0.15)', 'rgba(29,26,47,0.82)']}
              style={styles.heroOverlay}
            />

            <View style={styles.topActions}>
              <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={23} color="#fff" />
              </TouchableOpacity>

              <View style={styles.topBadge}>
                <Ionicons name="sparkles" size={16} color="#F4B860" />
                <Text style={styles.topBadgeText}>Premium</Text>
              </View>
            </View>

            <View style={styles.heroInfo}>
              <Image source={{ uri: designer.image }} style={styles.avatar} />

              <View style={styles.nameBox}>
                <Text style={styles.name}>{designer.name}</Text>
                <Text style={styles.styleText}>{designer.style || 'Luxury Interior Designer'}</Text>

                <View style={styles.onlineRow}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText}>Available for consultation</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.mainCard}>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Ionicons name="star" size={20} color="#F4B860" />
                <Text style={styles.statNumber}>{designer.rating || '4.9'}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons name="briefcase-outline" size={20} color="#7C5CFF" />
                <Text style={styles.statNumber}>{designer.works?.length || 0}</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons name="chatbubbles-outline" size={20} color="#00A6A6" />
                <Text style={styles.statNumber}>{designer.reviews?.length || 0}</Text>
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
            </View>

            <View style={styles.quickInfo}>
              <View style={styles.quickItem}>
                <MaterialCommunityIcons name="palette-outline" size={22} color="#7C5CFF" />
                <Text style={styles.quickText}>{designer.style || 'Interior Style'}</Text>
              </View>

              <View style={styles.quickItem}>
                <Ionicons name="shield-checkmark-outline" size={22} color="#28C76F" />
                <Text style={styles.quickText}>Verified Designer</Text>
              </View>
            </View>

            <View style={styles.tabContainer}>
              {['ביקורות', 'תיק עבודות', 'אודות'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tabButton,
                    activeTab === tab && styles.activeTabButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.contentBox}>
              <Text style={styles.contentTitle}>{activeTab}</Text>
              <Text style={styles.paragraphText}>{renderTabContent()}</Text>
            </View>

            <TouchableOpacity onPress={handleStartChat} activeOpacity={0.9}>
              <LinearGradient
                colors={['#7C5CFF', '#B86BFF']}
                style={styles.chatButton}
              >
                <Ionicons name="chatbubble-ellipses" size={22} color="#fff" />
                <Text style={styles.chatButtonText}>התחל שיחה</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#1D1A2F',
    fontWeight: '900',
  },

  hero: {
    height: 360,
    position: 'relative',
  },
  heroImage: {
    width,
    height: 360,
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  topActions: {
    position: 'absolute',
    top: 18,
    left: 18,
    right: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
    gap: 6,
  },
  topBadgeText: {
    color: '#1D1A2F',
    fontWeight: '900',
    fontSize: 13,
  },
  heroInfo: {
    position: 'absolute',
    bottom: 28,
    left: 20,
    right: 20,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameBox: {
    flex: 1,
    marginRight: 14,
    alignItems: 'flex-end',
  },
  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'right',
  },
  styleText: {
    color: 'rgba(255,255,255,0.86)',
    marginTop: 5,
    fontWeight: '700',
    textAlign: 'right',
  },
  onlineRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 8,
  },
  onlineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#28C76F',
    marginLeft: 6,
  },
  onlineText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },

  mainCard: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    marginTop: -22,
    marginHorizontal: 16,
    borderRadius: 34,
    padding: 18,
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 28,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '31%',
    backgroundColor: '#F8F6FF',
    borderRadius: 22,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7DEFF',
  },
  statNumber: {
    color: '#1D1A2F',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 5,
  },
  statLabel: {
    color: '#8D88A6',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '800',
  },
  quickInfo: {
    marginTop: 16,
    gap: 10,
  },
  quickItem: {
    minHeight: 50,
    borderRadius: 20,
    backgroundColor: '#FBFAFF',
    borderWidth: 1,
    borderColor: '#EEE7FF',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  quickText: {
    flex: 1,
    textAlign: 'right',
    color: '#1D1A2F',
    fontWeight: '800',
    marginRight: 10,
  },

  tabContainer: {
    flexDirection: 'row-reverse',
    backgroundColor: '#F0ECFF',
    borderRadius: 22,
    padding: 6,
    marginTop: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 17,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#1D1A2F',
  },
  tabText: {
    color: '#7B7890',
    fontWeight: '900',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
  },
  contentBox: {
    backgroundColor: '#FBFAFF',
    borderRadius: 24,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#EEE7FF',
  },
  contentTitle: {
    color: '#7C5CFF',
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'right',
    marginBottom: 8,
  },
  paragraphText: {
    fontSize: 15.5,
    color: '#3A354F',
    textAlign: 'right',
    lineHeight: 27,
    fontWeight: '600',
  },

  chatButton: {
    marginTop: 20,
    borderRadius: 24,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    gap: 9,
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
});