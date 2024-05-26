import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'

const testModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text>Helloe</Text>
        </View>
        <Pressable onPress={() => setModalVisible(!modalVisible)} style={[styles.button,styles.buttonClose]}>
          <Text>close</Text>
        </Pressable>
      </View>
      </Modal>
    </View>
  )
}

export default testModal

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  modalView:{
    margin:20,
    backgroundColor:'red',
    borderRadius:20,
    padding:35,
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:2
    },
    shadowOpacity:0.25,
  shadowRadius:4,
  elevation:5,
  },
  button:{
    borderRadius:20,
    padding:10,
    elevation:2,
  },
  buttonClose:{
    backgroundColor:'green',
  },
  modalText:{
    marginBottom:15,
    textAlign:'center',
  }  

})