import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ConnectCard = ({ item}) => {
  const { profilename, jobDescription } = item;
  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={require("../../assets/image12.png")} />
      <View style={styles.detailsContainer}>
        <Text style={styles.profileName}>{profilename}</Text>
        <Text style={styles.jobDescription}>{jobDescription}</Text>
      </View>
      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 200,
    width: '45%',
    marginVertical: 8,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  connectButton: {
    backgroundColor: '#0073b1',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  connectButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ConnectCard;
