import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router'

const Postheader = () => {
    const router = useRouter();
  return (
    <View>
      <View style={{flexDirection:"row",alignItems:"center"}}>  
      <Pressable style={{marginTop:10,marginHorizontal:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}} onPress={() => router.replace("/tabs/home")}>
        <AntDesign name="close" size={24} color="black"/>
      </Pressable>
      <Text>Share Post</Text>
      </View>
      <Pressable style={{flexDirection:"row",alignItems:"center"}}>
            <Text>Post</Text>
        </Pressable>
      <View style={{borderColor:"#FFFFFFF",borderWidth:2,marginVertical:10}}/>
    </View>
  )
}

export default Postheader

const styles = StyleSheet.create({})