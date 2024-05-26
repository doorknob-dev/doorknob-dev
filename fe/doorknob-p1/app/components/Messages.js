import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const Messages = ({senderName, messageText, time}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.senderImage} source={require("../../assets/image12.png")} />
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{senderName}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.messageText}>{messageText}</Text>
      </View>
    </View>
  );
  
}

export default Messages

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
      },
      header: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      senderImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      senderInfo: {
        justifyContent: 'center',
      },
      senderName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      time: {
        fontSize: 14,
        color: '#555',
      },
      messageText: {
        fontSize: 16,
        color: '#333',
      },
})