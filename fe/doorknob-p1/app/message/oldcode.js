import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import authAxios from '../../config/getAuthToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { localUrl } from '../../config/url';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const { receiverUserId } = useLocalSearchParams();

  useEffect(() => {
    const initializeSocket = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const storedUserId = await AsyncStorage.getItem('userId'); // Assuming user ID is stored here
      setUserId(storedUserId);
      const hardcodedIpAddress = '127.0.0.1'; // Replace with actual IP

      if (token && receiverUserId && storedUserId && hardcodedIpAddress) {
        const socketUrl = `http://${hardcodedIpAddress}:5001`;
        const newSocket = io(socketUrl, {
          query: { token },
        });
        setSocket(newSocket);

        newSocket.on('connect', () => {
          newSocket.emit('join-user', receiverUserId);
          newSocket.emit('get-messages', { senderUserId: storedUserId, receiverUserId });
        });

        newSocket.on('messages', (receivedMessages) => {
          // Ensure all messages have an _id property
          const formattedMessages = receivedMessages.map(msg => ({
            ...msg,
            _id: msg._id || Math.random().toString(),
          }));
          setMessages(formattedMessages);
        });

        newSocket.on('new-message', (newMessage) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              ...newMessage,
              _id: newMessage._id || Math.random().toString(),
            },
          ]);
        });

        newSocket.on('error', (error) => {
          console.error('Socket error:', error);
        });

        return () => {
          newSocket.disconnect();
        };
      } else {
        console.error('Missing token, receiverUserId, userId, or IP address');
      }
    };

    initializeSocket();
  }, [receiverUserId]);

  const handleSend = useCallback(async (text) => {
    if (text.trim().length === 0 || !userId) {
      return;
    }

    const newMessage = {
      sender_user_id: userId,
      receiver_user_id: receiverUserId,
      text,
      created_at: new Date().toISOString(),
      _id: Math.random().toString(), // Ensure the new message has an _id
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    authAxios.post(`http://${localUrl}:5001/messages/send`, {
      receiver_user_id: receiverUserId,
      message: text,
    })
    .then(response => {
      console.log('Message sent successfully:', response.data);
    })
    .catch(error => {
      console.error('There was a problem sending the message:', error);
    });

    if (socket) {
      socket.emit('message', newMessage);
    }
  }, [receiverUserId, socket, userId]);

  return (
    <View style={styles.container}>
      <MessageList messages={messages} userId={userId} />
      <MessageInput onSend={handleSend} />
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
