import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import { fetchDesigners } from '../services/api'; 
import { useNavigation } from '@react-navigation/native'; 

const DesignersList = () => {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getDesigners = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchDesigners();
        setDesigners(response.data);
      } catch (err) {
        console.error("API Error:", err);
        setError('Failed to load designers.');
        Alert.alert("Error", "Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };
    getDesigners();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#002244" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>מעצבים מקצועיים</Text>
      
      {error ? (
        <View style={styles.center}>
            <Text style={{color: 'red'}}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={designers}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text style={styles.emptyText}>לא נמצאו מעצבים.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              // تأكدي أن الاسم 'DesignerDetails' يطابق تماماً ما في Stack.Screen في App.js
              onPress={() => navigation.navigate('DesignerDetails', { designerId: item._id })}
            >
              {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.styleText}>{item.style || 'עיצוב פנים'}</Text>
                <Text style={styles.rating}>★ {item.rating || 'N/A'}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f9f9f9' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#002244', textAlign: 'right' },
  card: { 
    flexDirection: 'row-reverse', // جعل اتجاه الكارد من اليمين لليسار
    padding: 12, 
    marginVertical: 6, 
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  infoContainer: { marginRight: 15, justifyContent: 'center', alignItems: 'flex-end' },
  name: { fontSize: 18, fontWeight: '700', color: '#002244' },
  styleText: { color: '#777', marginVertical: 2 },
  rating: { color: '#ffa500', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});

export default DesignersList;