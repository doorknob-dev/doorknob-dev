import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import authAxios from '../../config/getAuthToken'; // Ensure this module exports an axios instance
import { localUrl } from '../../config/url'; // Ensure this is the correct path

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const { receiverUserId } = useLocalSearchParams(); // Ensure this hook is properly implemented
  console.log("receiverUserId from URL:", receiverUserId);

  useEffect(() => {
    const initializeSocket = async () => {
      console.log("Fetching token and user ID from storage...");
      const token = await AsyncStorage.getItem('userToken');
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log('Token retrieved:', token);
      console.log('Stored User ID retrieved:', storedUserId);
      setUserId(storedUserId);

      if (!token || !storedUserId) {
        console.error("Token or Stored User ID is null");
      } else {
        setUserId(storedUserId);
        // Initialize your socket or other operations here
      };


      if (token && receiverUserId && storedUserId) {
        console.log("All data present. Initializing socket connection...");
        const socketUrl = localUrl; // Ensure localUrl is correct
        const newSocket = io(socketUrl, {
          query: { token },
        });
        setSocket(newSocket);

        newSocket.on('connect', () => {
          console.log("Socket connected. Emitting 'join-user' and 'fetchMessages'...");
          newSocket.emit('join-user', receiverUserId);
          newSocket.emit('fetchMessages', { senderUserId: storedUserId, receiverUserId });
        });

        newSocket.on('messages', (receivedMessages) => {
          console.log('Messages received:', receivedMessages);
          const formattedMessages = receivedMessages.map(msg => ({
            _id: msg._id,
            text: msg.text,
            createdAt: new Date(msg.createdAt),
            user: {
              _id: msg.user._id,
              name: msg.user.name, // Check if names are correctly being pulled
            },
          }));
          setMessages(formattedMessages);
        });

        newSocket.on('newMessage', (newMessage) => {
          console.log('New message received:', newMessage);
          const formattedMessage = {
            _id: newMessage._id,
            text: newMessage.text,
            createdAt: new Date(newMessage.createdAt),
            user: {
              _id: newMessage.user._id,
              name: newMessage.user.name,
            },
          };
          setMessages(previousMessages => GiftedChat.append(previousMessages, [formattedMessage]));
        });

        newSocket.on('error', (error) => {
          console.error('Socket error:', error);
        });

        return () => {
          console.log("Disconnecting socket...");
          newSocket.disconnect();
        };
      } else {
        console.error('Missing token, receiverUserId, or userId');
      }
    };

    initializeSocket();
  }, [receiverUserId]);

  const handleSend = useCallback(async (newMessages = []) => {
    console.log("handleSend called with:", newMessages);
    const message = newMessages[0];
    if (!message.text.trim() || !userId) {
      console.log('Message text is empty or userId is not set:', message.text, userId);
      return;
    }

    console.log('Attempting to send message:', message.text);
    try {
        const response = await authAxios.post(`${localUrl}/messages/send`, {
            receiver_user_id: receiverUserId,
            message: message.text
        });
        console.log('receiver_user_id value',receiverUserId)
        console.log('message value',message.text)
        console.log('Message sent successfully:', response.data);
    } catch (error) {
        console.error('Error while sending message:', error);
    }
  }, [receiverUserId, userId]);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => handleSend(messages)}
        user={{
          _id: userId,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ChatScreen;
