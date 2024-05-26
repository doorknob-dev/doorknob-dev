import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Textbox1 = ({ placeholder, backgroundColor,txtcolor,borderColor, onChangeText,value,secureTextEntry }) => {
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: backgroundColor,
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
            width: '100%',
            height: 50,
            paddingHorizontal: 10,
            borderWidth:2,
            borderColor:borderColor,
            color:txtcolor
        }} >
            <TextInput
                placeholder={placeholder}
                onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
                />
        </View>



    )
}

export default Textbox1

const styles = StyleSheet.create({})
