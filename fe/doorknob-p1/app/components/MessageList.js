import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const MessageList = ({ messages, userId }) => {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => (item._id ? item._id.toString() : Math.random().toString())}
      renderItem={({ item }) => (
        <View style={item.sender_user_id === userId ? styles.sentMessage : styles.receivedMessage}>
          <Text>{item.text}</Text>
          <Text style={styles.timestamp}>{new Date(item.created_at).toLocaleTimeString()}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    maxWidth: '80%',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    maxWidth: '80%',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    alignSelf: 'flex-end',
  },
});

export default MessageList;
