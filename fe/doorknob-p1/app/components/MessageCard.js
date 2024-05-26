import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

const MessageCard = ({ item }) => {
  const router = useRouter();
  const { profile_image_url, first_name, last_name, message, receiver_user_id } = item;

  const handlePress = () => {
    console.log('Navigating to message/chatScreen with receiverUserId:', receiver_user_id); // Debugging line
    router.push(`/message/chatScreen?receiverUserId=${receiver_user_id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ flexDirection: "column", alignItems: "center", padding: 1 }}>
        <View style={{ width: 500 }} />
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, justifyContent: "space-between", padding: 10 }}>
          <Image source={{ uri: profile_image_url }} style={{ width: 55, height: 55, borderRadius: 50, marginRight: 10 }} />
          <View style={{ width: 300, flex: 1 }}>
            <Text style={{ marginBottom: 8, fontSize: 19, fontWeight: '400' }}>{`${first_name} ${last_name}`}</Text>
            <Text numberOfLines={2} style={{ fontSize: 16, color: "black" }}>{message}</Text>
          </View>
        </View>
        <View style={{ width: 500, borderBottomWidth: 1.4, borderColor: '#A4A4A4' }} />
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;

const styles = StyleSheet.create({});
