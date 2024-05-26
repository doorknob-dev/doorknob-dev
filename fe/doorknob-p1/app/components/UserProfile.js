import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native'
import React, {useEffect} from 'react'
import ConnectPressable from './ConnectPressable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { userData } from './Database';
import { useState } from 'react';
import { useRouter } from 'expo-router';


const UserProfile = ({ item }) => {
  const { profileName, jobtitle } = item;
  const router = useRouter();



  return (
    <TouchableOpacity onPress={() => router.push("/userprofile/userpage")}>        
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton}>
        <Ionicons name="close-circle" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={require("../../assets/image12.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.profileName}>{profileName}</Text>
        <Text style={styles.jobTitle}>{jobtitle}</Text>
      </View>
      <View style={styles.connectButtonContainer}>
        <ConnectPressable padding={6} fontSize={13} width={130} txtcolor='white' backgroundColor='blue' />
      </View>
    </View>
    </TouchableOpacity>

  )
}

export default UserProfile

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1
  },
  container: {
    padding: 15,
    borderRadius: 9,
    marginHorizontal: 16,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    marginVertical: 10,
    justifyContent: "center",
    height: Dimensions.get("window").height / 4,
    width: (Dimensions.get("window").width - 80) / 2,
    backgroundColor: '#ffffff',
    elevation: 2,
    alignItems: 'center',
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10, // Adjust this value to move the image up to overlap the card border
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "cover",
    borderWidth: 3,
    borderColor: 'white', // Adjust the color as needed
    elevation: 3,
  },
  textContainer: {
    marginTop: 10,
  },
  profileName: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold'
  },
  jobTitle: {
    textAlign: "center",
    fontSize: 16,
    color: 'grey',
    marginTop: 4, // Use marginTop to create space between text lines
  },
  connectButtonContainer: {
    marginTop: 8,
  },
})