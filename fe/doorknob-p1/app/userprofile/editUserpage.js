import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router';

const editUserpage = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  // Additional state hooks...
  const [language, setLanguage] = useState(null);
  const [openLanguageDropdown, setOpenLanguageDropdown] = useState(false);
  const [languages, setLanguages] = useState([
    { label: 'English', value: 'english' },
    { label: 'Spanish', value: 'spanish' },
    // Add other languages...
  ]);

  // Similar setup for agency if needed...

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleChoosePhoto}>
        {profileImage ? (
          <Image source={require("../../assets/image12.png")} style={styles.profileImage} />
        ) : (
          <Text>Select a Profile Image</Text>
        )}
      </TouchableOpacity>

      {/* Text Inputs for first name, last name, etc... */}

      <TextInput
        placeholder="First Name"
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        style={styles.input}
      />
      <TextInput
        placeholder="Job Title"
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        style={styles.input}
      />
      <DropDownPicker
        open={openLanguageDropdown}
        value={language}
        items={languages}
        setOpen={setOpenLanguageDropdown}
        setValue={setLanguage}
        setItems={setLanguages}
        zIndex={3000}
        placeholder="Select Language"
        style={styles.dropdownPicker}
        containerStyle={styles.dropdownContainer}
        dropDownDirection="AUTO"
      />
      <TextInput
        placeholder="About Me"
        style={styles.input}
        multiline
      />
      <TextInput
        placeholder="Agency"
        style={styles.input}
      />
      <Button title="Save Profile" onPress={() => router.replace("/userprofile/userpage")} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dropdownPicker: {
    // Customize your dropdown picker style
  },
  dropdownContainer: {
    marginBottom: 15,
    // Adjust container style if needed
  },
  // Add or adjust styles as needed
});

export default editUserpage;
