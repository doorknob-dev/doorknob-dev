import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import MessageCard from '../components/MessageCard'
import CustomTabNavigator from '../components/CustomTabNavigator'
import authAxios from '../../config/getAuthToken';
import { localUrl } from '../../config/url';

const mainMessage = () => {
  // const data = [{ id: '1',username:'yo', message:'Liar is trying to reach out to you.Beware of this guy.' },{id:'2',username:'sup', message:"It is Thief's birthda. Wish him good luck on his adventures"}];
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authAxios.get(`${localUrl}/messages/details`);  // Make the API request
        setChatData(response.data);  // Set chatData to the response data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <View style={{flex:1}}>
      <CustomTabNavigator chatData={chatData}/>
    </View>
  )
}

export default mainMessage

const styles = StyleSheet.create({})