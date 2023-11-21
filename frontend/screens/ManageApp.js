import React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import NewService from '../components/NewService';
import Service from '../components/Service';
import api from '../api';


export default function ManageApp({ navigation }) {
  const [services, setServices] = useState(null);
  const [local, setLocal] = useState(null);

  const loadData = () => {
    if (local === null) {
      AsyncStorage.getItem('local')
      .then(value => {
        setLocal(value !== null ? true : false)
      }).catch(e => {
        console.error(e);
        setLocal(false);
      })
    } else {
      if (!local) {
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
      } else {
        SecureStore.getItemAsync('credits')
          .then(value => {
            setServices(value === null ? [] : JSON.parse(value))
          })
          .catch(error => {
            console.error(error)
          })
      }
    }
  }
  useEffect(() => {
    loadData()
  }, [local])

  const handleLongPress = (item) => {
    console.log('Long Pressed item:', item);
    if (!local) {
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
    } else {
      console.log("Using local")
      SecureStore.getItemAsync('credits')
        .then(result => {
          let items = JSON.parse(result);
          SecureStore.setItemAsync('credits', JSON.stringify(items.filter((elem) => elem.pk !== item.pk)))
            .then(() => { Alert.alert('Item deleted!') })
            .catch(error => console.warn(error))
        })
        .catch(error => {
          console.error(error);
        })
    }
  };

  const handlePress = (item) => {
    navigation.navigate('EditService', { serviceDetails: item, local: local });
    console.log('Pressed item:', item);
  };


  return (
    <View style={style.container}>
      <StatusBar>This is a status bar</StatusBar>
      <Text style={style.title}>Your saved data</Text>
      <View style={style.list}>
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <Pressable
              delayLongPress={1000}
              onPress={() => handlePress(item)}
              onLongPress={() => handleLongPress(item)}>
              <Service details={item} key={item.pk} />
            </Pressable>)} />
      </View>
      <NewService />
      <Pressable style={style.reload} onPress={() => loadData()}><Ionicons name="reload" size={24} color="black" /><Text> Refresh</Text></Pressable>
    </View>
  );
};



const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  reload: {
    backgroundColor: '#BCDEFA',
    flexDirection: 'row',
    padding: 2,
    paddingRight: 4,
    borderRadius: 5,
    marginTop: 5,
  }
})