import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function DesignerCard({
  designer,
  onViewDetails,
  onChat,
  isFav,
  onToggleFav,
}) {
  const image =
    designer.image ||
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900';

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />

        <LinearGradient
          colors={['transparent', 'rgba(29,26,47,0.88)']}
          style={styles.overlay}
        />

        <TouchableOpacity style={styles.favButton} onPress={onToggleFav}>
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={25}
            color={isFav ? '#FF4D6D' : '#fff'}
          />
        </TouchableOpacity>

        <View style={styles.badge}>
          <MaterialCommunityIcons name="sofa-outline" size={15} color="#7C5CFF" />
          <Text style={styles.badgeText} numberOfLines={1}>
            {designer.style || 'Interior Design'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {designer.name || 'Designer'}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="star" size={16} color="#F4B860" />
            <Text style={styles.metaText}>4.9</Text>
          </View>

          <View style={styles.metaItem}>
            <Ionicons name="briefcase-outline" size={16} color="#7C5CFF" />
            <Text style={styles.metaText}>
              {Array.isArray(designer.works) ? designer.works.length : 0} Projects
            </Text>
          </View>
        </View>

        <Text style={styles.about} numberOfLines={2}>
          {designer.about ||
            'מעצב פנים מקצועי המתמחה בעיצוב חללים יוקרתיים, מודרניים ומותאמים אישית.'}
        </Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.detailsButton} onPress={onViewDetails}>
            <Ionicons name="eye-outline" size={18} color="#7C5CFF" />
            <Text style={styles.detailsText}>פרטים</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatButton} onPress={onChat}>
            <LinearGradient
              colors={['#7C5CFF', '#B86BFF']}
              style={styles.chatGradient}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
              <Text style={styles.chatText}>שליחת הודעה</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 28,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#7C5CFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 9,
  },
  imageContainer: {
    width: '100%',
    height: 190,
    backgroundColor: '#F3EEFF',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 95,
  },
  favButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgba(29,26,47,0.42)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    maxWidth: '82%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    gap: 5,
  },
  badgeText: {
    color: '#1D1A2F',
    fontSize: 12,
    fontWeight: '800',
  },
  content: {
    padding: 16,
  },
  name: {
    textAlign: 'right',
    fontSize: 22,
    fontWeight: '900',
    color: '#1D1A2F',
  },
  metaRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 14,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#6E6A7C',
    fontSize: 13,
    fontWeight: '700',
  },
  about: {
    textAlign: 'right',
    color: '#7B7890',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  buttonsRow: {
    flexDirection: 'row-reverse',
    gap: 10,
    marginTop: 15,
  },
  detailsButton: {
    flex: 1,
    height: 48,
    borderRadius: 17,
    backgroundColor: '#F3EEFF',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  detailsText: {
    color: '#7C5CFF',
    fontSize: 15,
    fontWeight: '900',
  },
  chatButton: {
    flex: 1,
  },
  chatGradient: {
    height: 48,
    borderRadius: 17,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  chatText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
  },
});