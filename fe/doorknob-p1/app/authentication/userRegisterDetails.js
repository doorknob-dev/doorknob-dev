import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, Button} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router/src/hooks'

const userRegisterDetails = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter profile details</Text>
      <TouchableOpacity style={styles.imagePicker}>
        {/* Placeholder image */}
        <Image
          source={require('../../assets/image12.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="First Name"
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        style={styles.input}
      />
      <TextInput
        placeholder="User Handle"
        style={styles.input}
      />
      <TextInput
        placeholder="Occupation"
        style={styles.input}
      />
      <TextInput
        placeholder="Languages"
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        style={styles.input}
      />
      <Button title="Save" onPress={() => router.replace("/tabs/home")}/>
    </View>
  )
}

export default userRegisterDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4B4C72', // Adjust the color to match the provided screen
  },
  header: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray', // Adjust the border color to match the provided screen
    width: '80%',
    padding: 10,
    backgroundColor: 'white', // Adjust the background color to match the provided screen
    borderRadius: 20,
  },
  imagePicker: {
    marginBottom: 20,
    // Add styles for the image picker
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // Add styles for the profile image
  },
})