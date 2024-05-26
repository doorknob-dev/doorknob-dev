import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';

const CommentSection = () => {
  // State for the list of comments
  const [comments, setComments] = useState([
    { id: '1', text: 'This is a great post!' },
    { id: '2', text: 'Thanks for sharing!' },
    // ...more comments
  ]);

  // State for the current comment being entered
  const [currentComment, setCurrentComment] = useState('');

  // Function to add a new comment
  const addComment = () => {
    if (currentComment.trim().length > 0) {
      const newComment = { id: Date.now().toString(), text: currentComment };
      setComments([...comments, newComment]);
      setCurrentComment(''); // Clear the input after submission
    }
  };

  return (
    <View style={styles.container}>
      {/* Comment input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={currentComment}
          onChangeText={setCurrentComment}
          placeholder="Write a comment..."
          style={styles.input}
        />
        <Button title="Post" onPress={addComment} />
      </View>

      {/* Comments list */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20, // Added padding at the bottom for better spacing
    backgroundColor: '#f0f0f0', // Match the background with the rest of the section
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white', // Slightly offset the input container with a different background
    borderWidth: 1,
    borderColor: '#ddd', // Light border to distinguish the input area
    borderRadius: 5, // Rounded corners for the input area
    marginBottom: 10, // Space between input container and comment list
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: '#fff', // Ensure input background is white for contrast
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white', // Comment background to ensure readability
    borderRadius: 5, // Rounded corners for comment items
    marginBottom: 5, // Spacing between comments
    shadowColor: '#000', // Adding shadow for depth (optional, can adjust based on preference)
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // Elevation for Android shadow
  },
  commentText: {
    fontSize: 16,
  },

});

export default CommentSection;
