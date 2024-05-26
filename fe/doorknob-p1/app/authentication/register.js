import { Pressable, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView  } from 'react-native'
import React from 'react'
import Textbox1 from '../components/Textbox1'
import { useRouter } from 'expo-router'

const register = () => {
  const router= useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColour: "white", alignItems: "center" }}>
      <View>
        <Text>Doornkob</Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text>Register an account</Text>
        </View>

        <View>
          <Textbox1 placeholder='Enter your email' />
        </View>

        <View>
          <Textbox1 placeholder='Enter your password' />
        </View>

        <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text>Keep me logged in</Text>
          <Text>Forgot my password</Text>
        </View>

        <View style={{ marginTop: 80 }} />

        <Pressable onPress={() => router.replace("/authentication/userRegisterDetails")}  style={{ width: 200, backgroundColor: "#0072b1", borderRadius: 6, marginLeft: "auto", marginRight: "auto", marginLeft: "auto", padding: 15 }}>
          <Text>Register</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/authentication/login")}>
          <Text>Have an account, Login Here</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default register

const styles = StyleSheet.create({})