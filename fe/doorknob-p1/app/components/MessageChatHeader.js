import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Textbox1 from './Textbox1'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import MainSearchBar from './MainSearchBar';
import { useNavigation } from 'expo-router';

const MessageChatHeader = () => {
    const navigation = useNavigation();
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#fff'
        }}>
            <TouchableOpacity onPress={() => navigation.goBack("/tabs/home")} style={{ marginRight: 8,
 }}>
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
            <MainSearchBar/>
        </View>
    )
}

export default MessageChatHeader

const styles = StyleSheet.create({})