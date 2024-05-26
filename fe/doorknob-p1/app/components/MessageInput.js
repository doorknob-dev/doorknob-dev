import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    onSend(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 10,
  },
});

export default MessageInput;
