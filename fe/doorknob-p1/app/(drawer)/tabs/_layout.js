import { Tabs } from "expo-router";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { View } from "react-native";
import MyModal from "../../components/Modal";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import DummyComponent from "../../components/DummyComponent";


const _layout = () => {
    const router = useRouter();
    return (
        <Tabs screenOptions={{ tabBarStyle: { height: 63 } }}>
            <Tabs.Screen name="home" options={{ tabBarLabel: "Home", tabBarLabelStyle: { color: "#S893S" }, headerShown: false, tabBarIcon: ({ focused }) => focused ? (<Ionicons name="home" size={28} color="black" />) : (<Ionicons name="home-outline" size={28} color="black" />) }} />
            <Tabs.Screen name="listings" options={{ tabBarLabel: "Listings", tabBarLabelStyle: { color: "#S893S" }, headerShown: false, tabBarIcon: ({ focused }) => focused ? (<FontAwesome name="list" size={28} color="grey" />) : (<FontAwesome name="list" size={28} color="black" />) }} />
            <Tabs.Screen name="post" options={{ tabBarLabel: "", tabBarLabelStyle: { color: "#S893S" }, headerShown: false, tabBarIcon: ({ focused }) => focused ? (<Ionicons name="add-circle" size={50} color="black" />) : (<Ionicons name="add-circle-outline" size={50} color="black" />), tabBarButton: (props) => (<TouchableOpacity {...props} onPress={() => router.push("/test/testModal1")}><Ionicons name="add-circle-outline" size={50} color="black" /></TouchableOpacity>)}} /> 
            <Tabs.Screen name="networks" options={{ tabBarLabel: "Networks", tabBarLabelStyle: { color: "#S893S" }, headerShown: false, tabBarIcon: ({ focused }) => focused ? (<Ionicons name="people" size={28} color="black" />) : (<Ionicons name="people-outline" size={28} color="black" />) }} />
            <Tabs.Screen name="notifications" options={{ tabBarLabel: "Notifications", tabBarLabelStyle: { color: "#S893S" }, headerShown: false, tabBarIcon: ({ focused }) => focused ? (<Ionicons name="notifications" size={28} color="black" />) : (<Ionicons name="notifications-outline" size={28} color="black" />) }} />
        </Tabs>
    )
}

export default _layout

