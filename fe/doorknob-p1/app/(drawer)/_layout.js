import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Drawer} from 'expo-router/drawer'
import CustomDrawerContent from '../components/CustomDrawerContent'
import MainHeader from '../components/MainHeader'


const _layout = () => {
  return (
    // <Drawer drawerContent={CustomDrawerContent} screenOptions={{headerStyle:{marginTop:10,marginHorizontal:10,backgroundColor:"blue",alignItems:"center",justifyContent:"space-around"}, headerLeft: () => <UserProfileIcon/>, headerTitle: () => <Textbox1/> ,headerRight: () => <MessageIcon/> }}>
    <Drawer drawerContent={CustomDrawerContent} screenOptions={{headerShown:false}}/>
  )
}

export default _layout

const styles = StyleSheet.create({})