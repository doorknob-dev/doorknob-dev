import { View, Text, StyleSheet, ScrollView, Image} from 'react-native'
import React from 'react'
import { userData } from '../../../components/Database';

const listing = () => {
    const user = userData.find(user => user.id === 1);
  return (
    <ScrollView style={styles.container}>
      <Image source={require("../../../../assets/image12.png")} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{user.profileName}</Text>
        <Text style={styles.price}>10000</Text>
        <View style={styles.row}>
          <Text style={styles.info}>12 Beds</Text>
          <Text style={styles.info}>123 Baths</Text>
          <Text style={styles.info}>12 sqft</Text>
        </View>
        <Text style={styles.description}>Description of the property, amenities, etc.</Text>
      </View>
    </ScrollView>
  )
}

export default listing

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
        width: '100%',
        height: 300,
      },
      detailsContainer: {
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      price: {
        fontSize: 22,
        color: '#4CAF50',
        marginBottom: 10,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      info: {
        fontSize: 18,
      },
      description: {
        fontSize: 16,
        color: '#333',
      },
})