import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import UserProfileIconAll from './UserProfileIconAll';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ConnectPressable from './ConnectPressable';
import { useNavigation } from 'expo-router';

const UserPosts = ({ item }) => {
  const { profileName, jobtitle, profileImage } = item;
  const shortText = 'ikjjnviknikvjnwnsjnvjksnvjsdnvjksnvjknsdjkvnsdjkvnsjnvjksnvjksnvjknsjknjabhcfashbcashbcjhasbcjhabc';
  const fullText = 'ikjjnviknikvjnwnsjnvjksnvjsdnvjksnvjknsdjkvnsdjkvnsjnvjksnvjksnvjknsjknjabhcfashbcashbcjhasbcjhabcsdgknsdongosdngvsdjvnsdjgvnsdjnvjksdnvjksdnvjksndvjksdvjnsdjkvnsdjkvnsjkdnvjksdnvjksdnvjsdbvjkbnsdvjkbnsdjkvsdvbshbvsbvsbvjhsdbhsdfghsfbsdfvbsdfvbsdvbsdhbserhb';

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  const router = useRouter();
  const navigation = useNavigation();
  return (
    
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection:'row'}}>
          <View style={styles.profileImage}>
            <UserProfileIconAll width={40} height={40} goTo={() => router.push('/userprofile/userpage')} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{profileName}</Text>
            <Text style={styles.jobTitle}>{jobtitle}</Text>
          </View>
          </View>
        </View>
        <Pressable onPress={() => router.push("/tabs/home/userPostsFull")}>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/image12.png")} style={styles.postImage} />
        </View>
        <View style={{ flex: 1, backgroundColor: "white", marginTop: 20 }}>
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
        </Pressable>
        <View style={{flex:1}}>
          <View style={styles.interactionBar}>
            <Text style={styles.interactionText}>10 likes</Text>
            <Text style={styles.interactionText}>14 Views</Text>
            <Text style={styles.interactionText}>3 days ago</Text>
          </View>
          <View style={styles.interactionIcons}>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text>6 Comments</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-social-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View >

  )
}

export default UserPosts

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  profileImage: {
    marginRight: 10,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontWeight: 'bold',
  },
  jobTitle: {
    color: 'grey',
  },
  imageContainer: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderColor: '#FFF'
  },
  actionButton: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#ddd',
    borderBottomColor: '#ddd',
  },
  interactionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  interactionText: {
    fontSize: 14
    // Add styles for interaction text
  },
})