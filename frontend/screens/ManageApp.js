import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import NewService from '../components/NewService';
import Service from '../components/Service';
import { useState, useEffect } from 'react';
import api from '../api';

const ManageApp = () => {
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
  return (
    <View style={style.container}>
      <Text style={style.title}>Your saved data</Text>
      <View style={style.list}>
      <FlatList 
        data={services}
        renderItem={({item}) => <Service details={item} key={item.name}/>}
      />
      </View>
      <NewService/>
    </View>
  );
};

export default ManageApp;

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