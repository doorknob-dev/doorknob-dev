import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserProfileIcon from './UserProfileIconDrawer'
import Textbox1 from './Textbox1'
import MessageIcon from './MessageIcon'
import MainSearchBar from './MainSearchBar'

const MainHeader = () => {
    return (
        <View style={styles.header}>
          <UserProfileIcon style={styles.icon} />
          <MainSearchBar/>
          <MessageIcon style={styles.icon} />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      header: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
      },
      icon: { 
        aspectRatio: 1,
        marginHorizontal: 10,
      },
    });

export default MainHeader