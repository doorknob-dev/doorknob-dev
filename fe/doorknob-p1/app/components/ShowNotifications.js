import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const ShowNotifications = ({item}) => {
    const { profileName,profileImage,notificationMessage } = item;
  return (
    <View style={{flexDirection:"row",alignItems:"center",marginVertical:10, justifyContent:"space-between",padding:10,}}>
      <Image style={{height:50,width:50,borderRadius:100}} source={profileImage}/>
        <View>
            <Text style={{fontSize:16, color:"black", width:240, marginRight:5}}>{notificationMessage}</Text>
        </View> 
        <View>
            <Text style={{fontSize:13, marginBottom:10}}>1d</Text>
            <TouchableOpacity onPress={() => {}}>
                <FontAwesome name="ellipsis-v" size={24} color="black" />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ShowNotifications

const styles = StyleSheet.create({})