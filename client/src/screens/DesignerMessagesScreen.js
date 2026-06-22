import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function DesignerMessagesScreen({
  navigation,
}) {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await API.get(
        `/messages/designer/${user._id}`
      );

      setMessages(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Chat', {
          customerId: item.senderId,
          name: item.senderName || 'Customer',
        })
      }
    >
      <View style={styles.avatar}>
        <Ionicons
          name="person"
          size={28}
          color="#7C5CFF"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>
          {item.senderName || 'Customer'}
        </Text>

        <Text
          style={styles.message}
          numberOfLines={1}
        >
          {item.text}
        </Text>
      </View>
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
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No messages yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2FF',
    paddingTop: 10,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 18,
    padding: 15,
    alignItems: 'center',
    elevation: 4,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#F1ECFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1A2F',
  },

  message: {
    marginTop: 4,
    color: '#777',
  },
});