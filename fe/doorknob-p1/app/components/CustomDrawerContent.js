import { StyleSheet, Text, View, Image, Link } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CustomDrawerContent = (props) => {
    const router = useRouter();
    const filteredProps = {
        ...props,
        state: {
          ...props.state,
          // Filter out the 'tabs' route, or any other routes you don't want to show
          routes: props.state.routes.filter(route => route.name !== 'tabs'),
        },
      };
    return (
        <DrawerContentScrollView {...filteredProps}>
            <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => router.push('/userprofile/userpage')}>
                    <Image source={require("../../assets/image12.png")} style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 100 }} />
                </TouchableOpacity>
                <Text>Yo</Text>
            </View>
            <DrawerItemList {...filteredProps} />
            <DrawerItem label={'Logout'} onPress={() => router.replace('/')} />
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;

