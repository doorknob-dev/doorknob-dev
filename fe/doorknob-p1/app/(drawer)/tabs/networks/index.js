import { StyleSheet, Text, View,FlatList, ScrollView  } from 'react-native'
import React from 'react'
import SecondaryHeaders from '../../../components/SecondaryHeader'
import UserProfile from '../../../components/UserProfile'
import ConnectCard from '../../../components/NetworkCard'
import { userData } from '../../../components/Database'

const index = () => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <SecondaryHeaders placeholder="Manage My Network" />
            <SecondaryHeaders placeholder="Invitations (1)" />
            <FlatList columnWrapperStyle={{justifyContent:"space-between"}} 
                    numColumns={2} 
                    data={userData} 
                    keyExtractor={(item) => item.id} 
                    renderItem={({item}) => <UserProfile item={item}/>} />
        </ScrollView>
    )
}

export default index

const styles = StyleSheet.create({})