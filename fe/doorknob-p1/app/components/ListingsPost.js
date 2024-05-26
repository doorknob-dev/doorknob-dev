import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const ListingsPost = ({ item }) => {
  const { profilename} = item; // Assuming these fields are available in item
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profileImage} source={require("../../assets/image12.png")} />
        <View style={styles.userInfo}>
          <Text style={styles.profileName}>{profilename}</Text>
        </View>
      </View>
      <Pressable onPress={() => router.push("/tabs/listings/listing")}>
      <Image source={require("../../assets/image12.png")} style={styles.postImage}/>
      <View style={styles.detailsContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>123123123123</Text>
        </View>
        <View style={styles.propertyDetails}>
          <Text style={styles.propertyText}>10 Beds</Text>
          <Text style={styles.propertyText}>12 Baths</Text>
          <Text style={styles.propertyText}>13999 sqft</Text>
        </View>
      </View>
      <Text style={styles.address}>qwerffasfas</Text>
      </Pressable>
    </View>
  )
}

export default ListingsPost;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center', // Align items vertically
  },
  profileImage: {
    width: 50, // Adjusted size
    height: 50, // Adjusted size
    borderRadius: 25, // Circular shape
    marginRight: 10,
  },
  userInfo: {
    justifyContent: 'center',
  },
  profileName: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 10, // Add space between image and details
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Spread out details and price
    alignItems: 'center', // Align items vertically
    marginBottom: 5, // Space before the address
  },
  priceContainer: {
    backgroundColor: '#000', // Black background for price
    padding: 5,
    borderRadius: 5,
  },
  price: {
    color: 'gold', // Gold color for price text
    fontWeight: 'bold',
  },
  propertyDetails: {
    // Container for beds, baths, sqft
    alignItems: 'flex-end', // Align items to the right
  },
  propertyText: {
    color: '#555', // Darker text color for property details
  },
  address: {
    fontSize: 12,
    color: '#555', // Darker text color for address
  },
});
