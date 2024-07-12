import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import axios from 'axios';
import config from '../config';

const UserChat = ({ item, userId }) => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = item?._id;
      const response = await axios.get(`${config.BASE_URL}/messages`, {
        params: { senderId, receiverId },
      });

      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch messages on initial load
  useEffect(() => {
    fetchMessages();
  }, []);

  // Fetch messages again when component refocuses
  useFocusEffect(
    React.useCallback(() => {
      fetchMessages();
    }, [])
  );

  // Function to get the last message
  const getLastMessage = () => {
    const n = messages.length;
    return messages[n - 1];
  };

  const lastMessage = getLastMessage();

  // Function to handle press event
  const handlePress = () => {
    if (router) {
      router.push({
        pathname: '/chat/chatroom',
        params: {
          image: item?.projectImages[0],
          name: item?.name,
          receiverId: item?._id,
          senderId: userId,
        },
      });
    } else {
      console.log('Router problem');
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginVertical: 12,
      }}>
      <View>
        <Image style={{ width: 60, height: 60, borderRadius: 35 }} source={{ uri: item?.projectImages[0] }} />
      </View>
      <View>
        <Text style={{ fontWeight: 'bold', color: '#662c65', fontSize: 15, fontFamily: 'monospace' }}>{item?.name}</Text>
        <Text style={{ fontSize: 15, fontWeight: '500', marginTop: 6, fontFamily: 'monospace' }}>
          {lastMessage ? lastMessage?.message : `Start Chat with ${item?.name}`}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
