import { StyleSheet, Text, View, Button, Touchable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router/src/hooks'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Textbox1 from '../components/Textbox1';

const testModal1 = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => router.push("/tabs/listings/addListing")}>
                        <Text style={styles.buttonText}>Add a listing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => router.push("/tabs/home/addPost")}>
                        <Text style={styles.buttonText}>Add a post</Text>
                    </TouchableOpacity>
                </View>
                <Button title="Close" onPress={() => router.push("/tabs/home")} />
            </View>
        </View>
    )
}

export default testModal1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', // Aligns the modal view to the bottom
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: '100%', // Modal takes up full device width
        height: '50%', // Modal covers half of the screen height
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        backgroundColor: '#007bff', // Replace with your color
        padding: 15,
        width: '100%',
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff', // Text color
        textAlign: 'center',
        fontWeight: 'bold',
    },
})