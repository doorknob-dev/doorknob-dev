import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import MainSearchBar from './MainSearchBar';
import { useNavigation, useRouter } from 'expo-router';
import { userData } from '../components/Database';
import { FontAwesome } from '@expo/vector-icons';


const UserProfileHeader = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const user = userData.find(user => user.id === 1);
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#fff'
        }}>
            <TouchableOpacity onPress={() => navigation.goBack("/tabs/home")} style={{
                marginRight: 8,
            }}>
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <Text>{user.profileName}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Pressable onPress={() => router.push('/userprofile/editUserpage')}>
                    <FontAwesome name="edit" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    )
}

export default UserProfileHeader

const styles = StyleSheet.create({})