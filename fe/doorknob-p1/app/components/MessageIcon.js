import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';

const MessageIcon = () => {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity onPress={() => router.push("message/mainMessage")}>
        <MaterialIcons name="message" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default MessageIcon

const styles = StyleSheet.create({})