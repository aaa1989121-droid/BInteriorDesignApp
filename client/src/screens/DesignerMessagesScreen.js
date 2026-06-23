import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function DesignerMessagesScreen({ navigation }) {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?._id) {
      loadMessages();
    }
  }, [user]);

  const loadMessages = async () => {
    try {
      const response = await API.get(
        `/messages/designer/${user._id}`
      );

      setMessages(response.data || []);
    } catch (error) {
      console.log(
        'LOAD DESIGNER MESSAGES:',
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadMessages();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('Chat', {
          customerId:
            typeof item.senderId === 'object'
              ? item.senderId._id
              : item.senderId,
          name: item.senderName || 'Customer',
        })
      }
    >
      <Image
        source={{
          uri:
            item.senderImage ||
            'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
        }}
        style={styles.avatar}
      />

      <View style={styles.content}>
       <Text style={styles.name}>
  {item.senderName || 'Unknown User'}
</Text>

        <Text
          style={styles.message}
          numberOfLines={1}
        >
          {item.text}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#7C5CFF"
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#7C5CFF"
        />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#F7F2FF', '#EEF7FF', '#FFF7EC']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          Customer Messages
        </Text>

        <Text style={styles.subtitle}>
          View and reply to customer chats
        </Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons
              name="chatbubbles-outline"
              size={60}
              color="#7C5CFF"
            />

            <Text style={styles.emptyTitle}>
              No Messages Yet
            </Text>

            <Text style={styles.emptyText}>
              Customers messages will appear here
            </Text>
          </View>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1D1A2F',
  },

  subtitle: {
    marginTop: 5,
    color: '#7B7890',
    fontSize: 14,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 15,
    borderRadius: 24,

    shadowColor: '#7C5CFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 18,

    elevation: 8,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E4D8FF',
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: '900',
    color: '#1D1A2F',
  },

  message: {
    marginTop: 5,
    color: '#7B7890',
    fontSize: 14,
  },

  emptyBox: {
    alignItems: 'center',
    marginTop: 120,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: '900',
    color: '#1D1A2F',
  },

  emptyText: {
    marginTop: 8,
    color: '#7B7890',
  },
});