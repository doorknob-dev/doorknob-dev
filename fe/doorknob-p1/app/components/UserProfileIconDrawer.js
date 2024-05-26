
import { StyleSheet, Text, View, Image, Pressable, Touchable } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';

const UserProfileIcon = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
      <View>
        <TouchableOpacity onPress={openDrawer}>
          <Image style={{ width: 45, height: 45, borderRadius: 45 }} source={require("../../assets/image12.png")} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserProfileIcon

const styles = StyleSheet.create({})