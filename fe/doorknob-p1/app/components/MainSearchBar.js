import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const MainSearchBar = () => {
  return (
    <View style={{ flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        flex: 1,
        paddingHorizontal: 10,
        height:40}}>
            <Ionicons name="search" size={20} color="grey" style={{marginRight: 8,}} />
            <TextInput
                maxLength={30} // Set maximum character length
                style={{
                    flex: 1,
                    height:'100%'
                }} />
        </View>
  )
}

export default MainSearchBar

const styles = StyleSheet.create({})