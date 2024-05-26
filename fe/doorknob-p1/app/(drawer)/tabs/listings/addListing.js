import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, TextInput, Button, View } from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

const AddListing = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'House', value: 'house' },
    { label: 'Apartment', value: 'apartment' },
  ]);

  const [openDistribution, setOpenDistribution] = useState(false);
  const [valueDistribution, setValueDistribution] = useState(null);
  const [itemsDistribution, setItemsDistribution] = useState([
    { label: 'For Sale', value: 'sale' },
    { label: 'For Rent', value: 'rent' },
  ]);


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add a House Listing</Text>

      <View style={[styles.pickerContainer, open && { marginBottom: 200 }]}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          zIndex={open ? 3000 : 2} // Adjust zIndex based on its open state
          containerStyle={{ height: open ? 5 : 50 }} // Adjust container height dynamically
          listMode="SCROLLVIEW"
          placeholder="Select Property Type"
          style={styles.picker}
        />
      </View>

      {/* Second DropdownPicker for Distribution (Sale or Rent) */}
      <View style={[styles.pickerContainer, openDistribution && { marginBottom: 300 }]}>
        <DropDownPicker
          open={openDistribution}
          value={valueDistribution}
          items={itemsDistribution}
          setOpen={setOpenDistribution}
          setValue={setValueDistribution}
          setItems={setItemsDistribution}
          zIndex={openDistribution ? 2000 : 1} // Adjust zIndex based on its open state
          containerStyle={{ height: openDistribution ? 5 : 50 }} // Adjust container height dynamically
          listMode="SCROLLVIEW"
          placeholder="Sale or Rent"
          style={styles.picker}
        />
      </View>

      <Button title="Upload Images" onPress={() => { /* Function to upload images */ }} />
      <TextInput placeholder="Address" style={styles.input} />
      <TextInput placeholder="Price" keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Bedrooms" keyboardType="number-pad" style={styles.input} />
      <TextInput placeholder="Bathrooms" keyboardType="number-pad" style={styles.input} />
      <TextInput placeholder="Square Feet" keyboardType="number-pad" style={styles.input} />
      <Button title="Add Listing" onPress={() => router.replace("/tabs/listings")} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16, // This marginBottom might be adjusted or removed based on your layout needs
  },
  picker: {
    // If you have any specific styles for the DropDownPicker itself
  },
});

export default AddListing;
