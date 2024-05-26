import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const addPost = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/tabs/home")}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/tabs/home")} style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.titleInput}
        placeholder="Title of the post"
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Write some content..."
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Adjust as needed
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  postButton: {
    backgroundColor: 'maroon', // Adjust as needed
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  titleInput: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: 16,
    fontSize: 18,
  },
  contentInput: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    textAlignVertical: 'top',
    height: 150, // Adjust as needed
  },
  // ... additional styles as needed
});

export default addPost;
