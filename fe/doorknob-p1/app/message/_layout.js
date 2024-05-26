import { Stack } from 'expo-router';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MessageChatHeader from '../components/MessageChatHeader';
import UserProfileIconAll from '../components/UserProfileIconAll';
import { useRouter } from 'expo-router';

const _layout = () => {
  const router = useRouter();
  
  return (
    <Stack>
      <Stack.Screen 
        name="mainMessage"
        options={{ header: () => <MessageChatHeader /> }}
      />
      <Stack.Screen 
        name="chatScreen"
        options={{
          title: 'Chat',
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => router.push('/message/mainMessage')}>
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => <UserProfileIconAll />
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 10,
  },
});
