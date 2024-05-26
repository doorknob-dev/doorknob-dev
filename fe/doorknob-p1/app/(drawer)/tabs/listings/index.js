import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import ListingsPost from '../../../components/ListingsPost'

const index = () => {
  const data = [{ id: '1', profilename: 'Yo', jobDescription:'Liar' },{id:'2', profilename: 'Idiot', jobDescription:'Thief'},{ id: '3', profilename: 'Yoe', jobDescription:'Liar' }];
  return (
    <View>
      <FlatList data={data} 
                keyExtractor={(item) => item.id} 
                renderItem={({item}) => <ListingsPost item={item}/>} />
    </View>
  )
}

export default index

const styles = StyleSheet.create({})