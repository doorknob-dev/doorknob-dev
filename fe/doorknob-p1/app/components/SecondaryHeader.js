import { Pressable, StyleSheet, Text, View } from 'react-native'
import {AntDesign} from '@expo/vector-icons'; 
import React from 'react'

const SecondaryHeaders = ({placeholder}) => {
  return (
    <View>
      <Pressable style={{marginTop:10,marginHorizontal:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Text>{placeholder}</Text>
        <AntDesign name="arrowright" size={24} color="black"/>
      </Pressable>

      <View style={{borderColor:"#FFFFFFF",borderWidth:2,marginVertical:10}}/>
    </View>
  )
}

export default SecondaryHeaders

const styles = StyleSheet.create({})