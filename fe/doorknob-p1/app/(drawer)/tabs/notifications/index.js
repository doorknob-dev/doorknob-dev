import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import ShowNotifications from '../../../components/ShowNotifications'
import { notificationsData } from '../../../components/Database'


const index = () => {
  return (
    <View>
      <FlatList data={notificationsData} 
                keyExtractor={(item) => item.id} 
                renderItem={({item}) => <ShowNotifications item={item}/>} />
    </View>
  )
}

export default index

const styles = StyleSheet.create({})