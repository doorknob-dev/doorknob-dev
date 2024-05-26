import { StyleSheet, Text, View, Image,ScrollView, FlatList } from 'react-native'
import React from 'react'
import UserPosts from '../../../components/UserPosts'
import { userData } from '../../../components/Database'

const index = () => {
  return (
    <ScrollView style={{padding:3}}>
      <FlatList data={userData} 
                keyExtractor={(item) => item.id} 
                renderItem={({item}) => <UserPosts item={item}/>} />
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})