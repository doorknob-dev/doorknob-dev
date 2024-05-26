import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const UserProfileIconAll = ({goTo,width,height}) => {
  return (
    <View>
        <TouchableOpacity onPress={goTo}>
          <Image style={{ width: width, height: height, borderRadius: 45 }} source={require("../../assets/image12.png")} />
        </TouchableOpacity>
      </View>
  )
}

export default UserProfileIconAll

const styles = StyleSheet.create({})