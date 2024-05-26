import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ConnectPressable = ({ padding, fontSize, width, height, txtcolor, backgroundColor }) => {
    return (
        <TouchableOpacity style={{
            borderRadius: 30, alignItems: 'center', justifyContent: 'center', padding: padding, width: width, height: height,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor:backgroundColor
        }}>
            <Text style={{ fontSize: fontSize, color: txtcolor }}>Connect</Text>
        </TouchableOpacity>
    )
}

export default ConnectPressable

const styles = StyleSheet.create({})