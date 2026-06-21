import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import DesignerCard from '../components/DesignerCard';
import { useAuth } from '../context/AuthContext';
import { fetchDesigners } from '../services/api';

const categories = [
  'הכל',
  'מועדפים',
  'עיצוב קלאסי',
  'עיצוב מודרני',
  'עיצוב נורדי/סקנדינבי',
  'עיצוב תעשייתי',
  'עיצוב בוהו-שיק',
  'עיצוב אקלטי',
  'עיצוב כפרי (רוסטיק)',
  'עיצוב מינימליסטי',
];

export default function DesignersScreen({ navigation }) {
  const [designers, setDesigners] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('הכל');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const { user, logout } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const loadDesigners = async () => {
      try {
        setLoading(true);
        const response = await fetchDesigners();
        setDesigners(response.data || []);
      } catch (err) {
        console.error('Error loading designers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDesigners();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    return designers.filter((d) => {
      const name = d.name?.toLowerCase() || '';
      const text = search.toLowerCase();

      const categoryMatch =
        selectedCategory === 'הכל' ||
        d.style === selectedCategory ||
        (selectedCategory === 'מועדפים ❤️' && favorites.includes(d._id));

      return categoryMatch && name.includes(text);
    });
  }, [designers, search, selectedCategory, favorites]);

  if (loading) {
    return (
      <LinearGradient
        colors={['#F7F2FF', '#EEF7FF', '#FFF7EC']}
        style={styles.center}
      >
        <ActivityIndicator size="large" color="#7C5CFF" />
        <Text style={styles.loadingText}>טוען מעצבים...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#F7F2FF', '#EEF7FF', '#FFF7EC']}
      style={styles.screen}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topRow}>
           <TouchableOpacity
  style={styles.profileBtn}
  onPress={() =>
    user
      ? navigation.navigate('Profile')
      : navigation.navigate('Auth')
  }
>
  <Ionicons
    name="person-circle-outline"
    size={28}
    color="#7C5CFF"
  />
</TouchableOpacity>
            <View style={styles.brand}>
              <Text style={styles.logoText}>INTERIA</Text>
              <Text style={styles.logoSub}>Luxury Interior Designers</Text>
            </View>

            <LinearGradient colors={['#7C5CFF', '#B86BFF']} style={styles.logoBox}>
              <MaterialCommunityIcons name="sofa-outline" size={30} color="#fff" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>מעצבי פנים</Text>
          <Text style={styles.desc}>בחרי מעצב, צפי בפרטים והתחילי שיחה</Text>

          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={22} color="#7C5CFF" />
            <TextInput
              style={styles.searchInput}
              placeholder="חיפוש לפי שם מעצב..."
              placeholderTextColor="#9A94B5"
              value={search}
              onChangeText={setSearch}
              textAlign="right"
            />
          </View>
        </View>

        <View style={styles.filtersWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.filterBtn,
                  selectedCategory === cat && styles.activeFilter,
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.filterText,
                    selectedCategory === cat && styles.activeFilterText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultText}>{filtered.length} מעצבים נמצאו</Text>
          <Ionicons name="sparkles" size={18} color="#F4B860" />
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <DesignerCard
              designer={item}
              isFav={favorites.includes(item._id)}
              onToggleFav={() => toggleFavorite(item._id)}
              onViewDetails={() =>
                navigation.navigate('DesignerDetails', { designerId: item._id })
              }
           onChat={() =>
  user
    ? navigation.navigate('Chat', {
        designerId: item._id,
        name: item.name,
        image: item.image,
      })
    : navigation.navigate('Auth')
}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="search-outline" size={44} color="#7C5CFF" />
              <Text style={styles.emptyText}>לא נמצאו מעצבים</Text>
            </View>
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#1D1A2F', fontWeight: '800' },

  header: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
    padding: 18,
    borderRadius: 32,
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallBtn: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: '#F2ECFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1D1A2F',
    letterSpacing: 3,
  },
  logoSub: {
    fontSize: 12,
    color: '#8D88A6',
    marginTop: 2,
  },
  logoBox: {
    width: 52,
    height: 52,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'right',
    fontSize: 31,
    fontWeight: '900',
    color: '#1D1A2F',
    marginTop: 20,
  },
  desc: {
    textAlign: 'right',
    color: '#6E6A7C',
    marginTop: 6,
    marginBottom: 16,
  },
  searchBox: {
    height: 56,
    borderRadius: 20,
    backgroundColor: '#F8F6FF',
    borderWidth: 1,
    borderColor: '#E7DEFF',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    color: '#1D1A2F',
    fontSize: 15,
    paddingHorizontal: 10,
  },

  filtersWrapper: {
    height: 56,
    marginBottom: 6,
  },
  filters: {
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  filterBtn: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#E7DEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#1D1A2F',
    borderColor: '#1D1A2F',
  },
  filterText: {
    color: '#6E6A7C',
    fontWeight: '800',
    fontSize: 13,
  },
  activeFilterText: {
    color: '#fff',
  },

  resultRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  resultText: {
    color: '#1D1A2F',
    fontWeight: '900',
    fontSize: 14,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 45,
  },
  emptyText: {
    marginTop: 10,
    color: '#6E6A7C',
    fontWeight: '800',
    fontSize: 16,
  },
  profileBtn: {
  width: 50,
  height: 50,
  borderRadius: 18,
  backgroundColor: '#F2ECFF',
  justifyContent: 'center',
  alignItems: 'center',
},
});