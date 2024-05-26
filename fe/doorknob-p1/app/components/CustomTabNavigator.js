import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import MessageCard from './MessageCard';


const CustomTabNavigator = ({ chatData }) => {
  const [selectedTab, setSelectedTab] = useState('Tab1');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Tab1' && styles.activeTabButton]}
          onPress={() => handleTabPress('Tab1')}
        >
          <Text style={[styles.buttonText, selectedTab === 'Tab1' && styles.activeButtonText]}>Tab1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Tab2' && styles.activeTabButton]}
          onPress={() => handleTabPress('Tab2')}
        >
          <Text style={[styles.buttonText, selectedTab === 'Tab2' && styles.activeButtonText]}>Tab2</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContent}>
        {selectedTab === 'Tab1' && (
          <FlatList
            data={chatData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MessageCard item={item} />}
          />
        )}
        {selectedTab === 'Tab2' && (
          <FlatList
            data={chatData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MessageCard item={item} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',// Adjust the background color as needed
    
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    elevation:5,
    backgroundColor: 'white',
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
  activeTabButton: {
    borderBottomColor: '#007AFF', // iOS blue color for active tab underline
  },
  tabContent: {
    flex: 1,
    width: '100%', // Ensure the tab content takes full width
  },
  buttonText: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 16,
  },
  activeButtonText: {
    fontWeight: 'bold', // Make active tab text bold
    color: '#007AFF', // iOS blue color for active tab text
  },
});

export default CustomTabNavigator;
