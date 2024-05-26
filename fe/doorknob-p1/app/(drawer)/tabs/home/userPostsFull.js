import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { userData } from '../../../components/Database';
import UserProfileIconAll from '../../../components/UserProfileIconAll';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import CommentSection from '../../../components/PostCommentSection';

const userPostsFull = () => {
  const user = userData.find(user => user.id === 1);
  const fullText = 'ikjjnviknikvjnwnsjnvjksnvjsdnvjksnvjknsdjkvnsdjkvnsjnvjksnvjksnvjknsjknjabhcfashbcashbcjhasbcjhabcsdgknsdongosdngvsdjvnsdjgvnsdjnvjksdnvjksdnvjksndvjksdvjnsdjkvnsdjkvnsjkdnvjksdnvjksdnvjsdbvjkbnsdvjkbnsdjkvsdvbshbvsbvsbvjhsdbhsdfghsfbsdfvbsdfvbsdvbsdhbserhb';
  return (
    <View>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.profileImage}>
            <UserProfileIconAll width={40} height={40} goTo={() => router.push('/userprofile/userpage')} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.profileName}</Text>
            <Text style={styles.jobTitle}>{user.jobtitle}</Text>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={user.profileImage} style={styles.postImage} />
      </View>
      <View>
        <Text>
          {fullText}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.interactionBar}>
          <Text style={styles.interactionText}>10 likes</Text>
          <Text style={styles.interactionText}>14 Views</Text>
          <Text style={styles.interactionText}>3 days ago</Text>
        </View>
        <View style={styles.interactionIcons}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <CommentSection/>
        </View>
      </View>
    </View>
  )
}

export default userPostsFull

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
    height: 300,
    resizeMode: 'cover',
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