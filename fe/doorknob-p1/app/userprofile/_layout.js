import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useNavigation } from 'expo-router'
import { userData } from '../components/Database';
import UserProfileHeader from '../components/UserProfileHeader';

const _layout = () => {
  const navigation = useNavigation();
  const user = userData.find(user => user.id === 1);
  return (
    <Stack>
      <Stack.Screen name="userpage" options={{
        title: 'userpage', header: () => <UserProfileHeader/>
      }} />
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})