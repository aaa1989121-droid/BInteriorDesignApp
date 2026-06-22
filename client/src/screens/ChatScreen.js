import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ChatScreen({ route, navigation }) {
  const { designerId, customerId, name, image } = route.params || {};
  const { user, isLoading } = useAuth();

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [sending, setSending] = useState(false);

  const flatListRef = useRef(null);

  const currentUserId = user?._id || user?.id;
  const currentRole = user?.role;

  const otherUserId =
    currentRole === 'designer' ? customerId : designerId;

  const otherRole =
    currentRole === 'designer' ? 'customer' : 'designer';

  useEffect(() => {
    if (!isLoading && !user) {
      Alert.alert('Login Required', 'Please login first');
      navigation.replace('Auth');
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (currentUserId && otherUserId) {
      loadMessages();
    }
  }, [currentUserId, otherUserId]);

  const loadMessages = async () => {
    try {
      setLoadingMessages(true);

      const response = await API.get(
        `/messages/${currentUserId}/${otherUserId}`
      );

      setChatMessages(response.data || []);
    } catch (error) {
      console.log(
        'LOAD MESSAGES ERROR:',
        error.response?.data || error.message
      );
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    if (!currentUserId || !otherUserId) {
      Alert.alert('Error', 'Missing chat user data');
      return;
    }

    try {
      setSending(true);

      const response = await API.post('/messages', {
        senderId: currentUserId,
        senderRole: currentRole,

        receiverId: otherUserId,
        receiverRole: otherRole,

        text: message.trim(),
      });

      setChatMessages((prev) => [...prev, response.data]);
      setMessage('');
    } catch (error) {
      console.log(
        'SEND MESSAGE ERROR:',
        error.response?.data || error.message
      );

      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to send message'
      );
    } finally {
      setSending(false);
    }
  };

  const formatTime = (date) => {
    if (!date) return '';

    const d = new Date(date);

    return d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMessage = ({ item }) => {
    const sender =
      typeof item.senderId === 'object'
        ? item.senderId._id
        : item.senderId;

    const isMe = sender === currentUserId;

    return (
      <View
        style={[
          styles.messageRow,
          isMe ? styles.myRow : styles.otherRow,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isMe ? styles.myBubble : styles.otherBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isMe ? styles.myText : styles.otherText,
            ]}
          >
            {item.text}
          </Text>

          <Text
            style={[
              styles.timeText,
              isMe ? styles.myTime : styles.otherTime,
            ]}
          >
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7C5CFF" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#F7F2FF', '#EEF7FF', '#FFF7EC']}
      style={styles.screen}
    >
      <SafeAreaView style={styles.screen}>
        <KeyboardAvoidingView
          style={styles.screen}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#1D1A2F" />
            </TouchableOpacity>

            <Image
              source={{
                uri:
                  image ||
                  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600',
              }}
              style={styles.avatar}
            />

            <View style={styles.headerTextBox}>
              <Text style={styles.designerName}>
                {name || 'Chat'}
              </Text>

              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online now</Text>
              </View>
            </View>
          </View>

          {loadingMessages ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#7C5CFF" />
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={chatMessages}
              keyExtractor={(item) => item._id || item.id}
              renderItem={renderMessage}
              contentContainerStyle={styles.chatList}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: true })
              }
              ListEmptyComponent={
                <View style={styles.emptyBox}>
                  <Ionicons
                    name="chatbubbles-outline"
                    size={46}
                    color="#7C5CFF"
                  />
                  <Text style={styles.emptyTitle}>
                    No messages yet
                  </Text>
                  <Text style={styles.emptyText}>
                    Start your conversation now
                  </Text>
                </View>
              }
            />
          )}

          <View style={styles.inputArea}>
            <View style={styles.inputBox}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={21}
                color="#7C5CFF"
              />

              <TextInput
                style={styles.input}
                placeholder="כתוב הודעה..."
                placeholderTextColor="#9A94B5"
                value={message}
                onChangeText={setMessage}
                multiline
                textAlign="right"
              />
            </View>

            <TouchableOpacity
              style={styles.sendWrapper}
              onPress={sendMessage}
              disabled={sending}
            >
              <LinearGradient
                colors={['#7C5CFF', '#B86BFF']}
                style={styles.sendButton}
              >
                {sending ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Ionicons name="send" size={21} color="#fff" />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#F2ECFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 20,
    marginHorizontal: 12,
    borderWidth: 2,
    borderColor: '#E4D8FF',
  },

  headerTextBox: {
    flex: 1,
    alignItems: 'flex-end',
  },

  designerName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1D1A2F',
    textAlign: 'right',
  },

  onlineRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 5,
  },

  onlineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#28C76F',
    marginLeft: 6,
  },

  onlineText: {
    color: '#7B7890',
    fontSize: 12,
    fontWeight: '700',
  },

  chatList: {
    padding: 16,
    paddingBottom: 20,
  },

  messageRow: {
    marginVertical: 6,
    flexDirection: 'row',
  },

  myRow: {
    justifyContent: 'flex-end',
  },

  otherRow: {
    justifyContent: 'flex-start',
  },

  bubble: {
    maxWidth: '78%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 22,
  },

  myBubble: {
    backgroundColor: '#7C5CFF',
    borderBottomRightRadius: 7,
  },

  otherBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 7,
    borderWidth: 1,
    borderColor: '#ECE6FA',
  },

  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },

  myText: {
    color: '#FFFFFF',
    textAlign: 'right',
  },

  otherText: {
    color: '#1D1A2F',
    textAlign: 'right',
  },

  timeText: {
    fontSize: 10,
    marginTop: 5,
    fontWeight: '700',
  },

  myTime: {
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'left',
  },

  otherTime: {
    color: '#9A94B5',
    textAlign: 'left',
  },

  emptyBox: {
    alignItems: 'center',
    marginTop: 80,
  },

  emptyTitle: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '900',
    color: '#1D1A2F',
  },

  emptyText: {
    marginTop: 4,
    color: '#7B7890',
    fontWeight: '700',
  },

  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopWidth: 1,
    borderColor: '#EFE7FF',
  },

  inputBox: {
    flex: 1,
    minHeight: 52,
    maxHeight: 110,
    borderRadius: 22,
    backgroundColor: '#F8F6FF',
    borderWidth: 1,
    borderColor: '#E7DEFF',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#1D1A2F',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  sendWrapper: {
    marginLeft: 10,
  },

  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
});