import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import NewService from '../components/NewService';
import Service from '../components/Service';
import { useState, useEffect } from 'react';
import api from '../api';
import EditService from './EditService';
import { StatusBar } from 'expo-status-bar';

export default function ManageApp({navigation}) {
  const [services, setServices] = useState(null);
  useEffect(() => {
    api.get('/main/services/list/')
    .then(response => {
      return response.data
    })
    .then(data => {
      setServices(data.services)
    })
    .catch(error => {
      console.error(error)
    })
  }, [])

  const handleLongPress = (item) => {
    console.log('Long Pressed item:', item);
    api.post(`/main/services/delete/${item.pk}/`)
    .then(response => {
      return response.data
    })
    .then(data => {
      Alert.alert(data.message);
    })
    .catch(error => {
      console.warn(error);
    })
  };

  const handlePress = (item) => {
    navigation.navigate('EditService', { serviceDetails: item });
    console.log('Pressed item:', item);
  };

  
  return (
    <View style={style.container}>
      <StatusBar>This is a status bar</StatusBar>
      <Text style={style.title}>Your saved data</Text>
      <View style={style.list}>
      <FlatList 
        data={services}
        renderItem={({item}) => (
          <Pressable
           delayLongPress={1000}
           onPress={() => handlePress(item)}
           onLongPress={() => handleLongPress(item)}>
           <Service details={item} key={item.name}/>
          </Pressable>)}/>
      </View>
      <NewService/>
    </View>
  );
};



const style = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center', 
  },
  list:{
    width: '100%',       
  },
  title:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  }
})