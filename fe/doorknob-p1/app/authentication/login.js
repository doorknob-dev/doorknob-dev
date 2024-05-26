import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Image, Alert, ActivityIndicator } from 'react-native';
import Textbox1 from '../components/Textbox1';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { localUrl } from '../../config/url';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Login API Integration
  const handleLogin = async () => {
    setLoading(true);
    console.log(`Logging in with username: ${username}, password: ${password}`); // Debug log

    try {
      const response = await axios.post(`${localUrl}/login`, {
        username: username,
        password: password
      });
      await AsyncStorage.setItem('token', response.data.token);
    console.log("Token stored");


      setLoading(false);

      if (response.status === 200) {
        console.log(response.data.token); // Optionally handle token storage and navigation
        router.replace("/tabs/home");
      } else {
        throw new Error(response.data.message || "Authentication failed");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Login Failed", error.response?.data?.message || error.message || "Unknown Error");
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/iconO.png")} style={styles.logo} />
        <Text style={styles.title}>Doorknob</Text>
      </View>

      <KeyboardAvoidingView behavior="position">
        <Textbox1
          placeholder='Enter your email'
          backgroundColor='#A2AAC7'
          txtcolor='white'
          borderColor='#389CE4'
          onChangeText={setUsername}
          value={username}
        />
        <Textbox1
          placeholder='Enter your password'
          backgroundColor='#A2AAC7'
          txtcolor='white'
          borderColor='#389CE4'
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ marginRight: 50 }}>Keep me logged in</Text>
          <Text>Forgot my password</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#1EC1E4" />
        ) : (
          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginText}>Log In</Text>
          </Pressable>
        )}

        <Pressable onPress={() => router.replace("/authentication/register")} style={styles.registerButton}>
          <Text>Don’t have an account? Register here</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30475E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    color: '#F5F5F5',
    fontWeight: 'bold',
    marginTop: 10,
  },
  loginButton: {
    marginTop: 80,
    width: 200,
    backgroundColor: "#1EC1E4",
    borderRadius: 6,
    padding: 15,
    alignItems: 'center',
  },
  loginText: {
    color: '#FFF',
  },
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
  }
});
