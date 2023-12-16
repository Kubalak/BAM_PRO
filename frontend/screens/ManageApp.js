/**
 * @file ManageApp.js - Komponent zarządzający aplikacją.
 * Wykorzystuje React, useState, useEffect z 'react', StatusBar z 'expo-status-bar',
 * View, Text, FlatList, StyleSheet, Pressable, Alert z 'react-native', Ionicons z '@expo/vector-icons',
 * AsyncStorage, SecureStore z 'expo-secure-store', NewService i Service z odpowiednich komponentów.
 * Odpowiada za zarządzanie usługami w aplikacji, wyświetlanie, dodawanie, usuwanie oraz edycję usług.
 * 
 * @requires React
 * @requires useState
 * @requires useEffect
 * @requires StatusBar
 * @requires View
 * @requires Text
 * @requires FlatList
 * @requires StyleSheet
 * @requires Pressable
 * @requires Alert
 * @requires Ionicons
 * @requires AsyncStorage
 * @requires SecureStore
 * @requires NewService
 * @requires Service
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, StyleSheet, Pressable, Alert, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import NewService from '../components/NewService';
import Service from '../components/Service';
import api from '../api';

/**
 * Komponent ManageApp
 * @param {object} navigation - Obiekt nawigacji.
 * @returns {JSX.Element} - Zwraca interfejs zarządzania aplikacją.
 */
export default function ManageApp({ navigation }) {
  // Stany komponentu
  const [services, setServices] = useState(null);
  const [local, setLocal] = useState(null);
  const [loading, setIsLoading] = useState(false);

  // Funkcja do wczytywania danych
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
        setIsLoading(true);
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
          setIsLoading(false)
      } else {
        setIsLoading(true)
        SecureStore.getItemAsync('credits')
          .then(value => {
            setServices(value === null ? [] : JSON.parse(value))
          })
          .catch(error => {
            console.error(error)
          })
          setIsLoading(false)
      }
    }
  }

  // Efekt wykonywany przy zmianie stanu lokalnego
  useEffect(() => {
    loadData()
  }, [local])

   // Funkcja obsługująca długie naciśnięcie na element
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

  // Funkcja obsługująca naciśnięcie na element
  const handlePress = (item) => {
    navigation.navigate('EditService', { serviceDetails: item, local: local });
  };

  // Renderowanie komponentu
  return (
    <View style={style.container}>
      <StatusBar>This is a status bar</StatusBar>
      <Text style={style.title}>Your saved data</Text>
      <View style={style.list}>
        {
          services && services.length !== 0 ? 
          <FlatList
          data={services}
          onRefresh={() => loadData()}
          refreshing={loading}
          renderItem={({ item }) => (
            <Pressable
              delayLongPress={1000}
              onPress={() => handlePress(item)}
              onLongPress={() => handleLongPress(item)}>
              <Service details={item} key={item.pk} />
            </Pressable>)} />
            :
            <Pressable onPress={() => loadData()}>
              <View style={style.reload}>
                <AntDesign name="reload1" size={24} color="black" />
              </View>
            </Pressable>
        }
        
      </View>
      <NewService />
    </View>
  );
};


// Style dla komponentu
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '100%',
    flex: 1,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  reload: {
    width: 30,
    alignSelf: 'center',
    padding: 2,
    paddingRight: 4,
    marginTop: 5,
    marginBottom: 15,
  }
})