import { StyleSheet, Text, View, FlatList, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react'
import MessageCard from '../components/MessageCard';
import { userData, messageData } from '../components/Database';
import UserPosts from '../components/UserPosts';
import ListingsPost from '../components/ListingsPost';
import authAxios from '../../config/getAuthToken';
import { localUrl } from '../../config/url';



const userpage = () => {
  const [selectedTab, setSelectedTab] = useState('Tab1');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };
  const shortText = 'ikjjnviknikvjnwnsjnvjksnvjsdnvjksnvjknsdjkvnsdjkvnsjnvjksnvjksnvjknsjknjabhcfashbcashbcjhasbcjhabc';
  const fullText = 'ikjjnviknikvjnwnsjnvjksnvjsdnvjksnvjknsdjkvnsdjkvnsjnvjksnvjksnvjknsjknjabhcfashbcashbcjhasbcjhabcsdgknsdongosdngvsdjvnsdjgvnsdjnvjksdnvjksdnvjksndvjksdvjnsdjkvnsdjkvnsjkdnvjksdnvjksdnvjsdbvjkbnsdvjkbnsdjkvsdvbshbvsbvsbvjhsdbhsdfghsfbsdfvbsdfvbsdvbsdhbserhb';

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  const combinedData = [...userData, ...messageData];
  const data = [{ id: '1', profilename: 'Yo', jobDescription: 'Liar' }, { id: '2', profilename: 'Idiot', jobDescription: 'Thief' }, { id: '3', profilename: 'Yoe', jobDescription: 'Liar' }];



  // GET API for the language details 
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authAxios.get(`${localUrl}/user_details/languages`);  // Make the API request
        setLanguages(response.data.languages);  // Assuming 'languages' is the correct data path
        setLoading(false);
      } catch (error) {
        console.error('Error fetching languages:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#EBEBEB" }}>
      <View style={{ width: "100%" }}>
        <Image resizeMode='cover' style={{ height: 228, width: "100%" }} source={require("../../assets/image12.png")} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image resizeMode='contain' style={{ height: 155, width: 155, borderRadius: 77.5, marginTop: -90 }} source={require("../../assets/image12.png")} />
        <Text>Yo</Text>
        <Text>Job</Text>
        <Text>Location</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row", paddingVertical: 8, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: "column", alignItems: "flex-start", marginHorizontal: 10 }}>
          <Text>10 connections</Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "flex-end", marginHorizontal: 10 }}>
          <Text>additional details</Text>
        </View>
      </View>

      {/* <View style={{ flex: 1, backgroundColor: "white", marginTop: 20 }}> 
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18 }}>Languages</Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text >• {languages}</Text>
        </View>
      </View> */}

      <View style={{flex: 1, backgroundColor: "white", marginTop: 20 }}>
        <Text style={{padding:10}}>Languages</Text>
        {loading ? (
          <Text>Loading languages...</Text>
        ) : (
          <View style={{padding: 10}}>
            {languages.map((language, index) => (
              <Text key={index} style={{padding: 10}}>• {language}</Text>
            ))}
          </View>
        )}
      </View>


      <View style={{ flex: 1, backgroundColor: "white", marginTop: 20 }}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18 }}>About Me</Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text>
            {showFullText ? fullText : shortText}
          </Text>
          {!showFullText && (
            <TouchableOpacity onPress={toggleText}>
              <Text style={{ color: 'blue', marginTop: 5 }}>Read More</Text>
            </TouchableOpacity>
          )}
        </View>
        {showFullText && (
          <TouchableOpacity onPress={toggleText}>
            <Text style={{ color: 'blue', marginLeft: 10, marginRight: 10, marginBottom: 10 }}>Read Less</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flexDirection: 'column', backgroundColor: 'white', marginTop: 20, padding: 10 }}>
        <View style={{ padding: 5 }}>
          <Text style={{ fontSize: 18 }}>Agency</Text>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 5 }}>
          <Image style={{ height: 90, width: 90 }} source={require('../../assets/image12.png')} />
          <View style={{ marginLeft: 10 }}>
            <Text>Agency name</Text>
            <Text>Agency location</Text>
          </View>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          marginTop: 10,
          padding: 10,
          marginBottom: 5,
          elevation: 5,
          backgroundColor: 'white',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Tab1' && styles.activeTabButton]}
          onPress={() => handleTabPress('Tab1')}
        >
          <Text style={[styles.buttonText, selectedTab === 'Tab1' && styles.activeButtonText]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Tab2' && styles.activeTabButton]}
          onPress={() => handleTabPress('Tab2')}
        >
          <Text style={[styles.buttonText, selectedTab === 'Tab2' && styles.activeButtonText]}>Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Tab3' && styles.activeTabButton]}
          onPress={() => handleTabPress('Tab3')}
        >
          <Text style={[styles.buttonText, selectedTab === 'Tab3' && styles.activeButtonText]}>Articles</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.tabContent}>
        {selectedTab === 'Tab1' && (
          <FlatList
            data={userData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <UserPosts item={item} />}
          />
        )}
        {selectedTab === 'Tab2' && (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ListingsPost item={item} />}
          />
        )}
        {selectedTab === 'Tab3' && (
          <FlatList
            data={userData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <UserPosts item={item} />}
          />
        )}
      </View>
    </ScrollView>
  )
}

export default userpage

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    width: '100%', // Ensure the tab content takes full width
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    elevation: 5,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 16,
  },
  activeTabButton: {
    borderBottomColor: '#007AFF',

  },
  activeButtonText: {
    fontWeight: 'bold', // Make active tab text bold
    color: '#007AFF', // iOS blue color for active tab text
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 2,
  },
})