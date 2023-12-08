/**
 * @module App
 * @description Główny plik aplikacji zawierający konfigurację nawigacji.
 * @requires react-native-gesture-handler
 * @requires react
 * @requires @react-navigation/native
 * @requires ./api
 * @requires @react-navigation/stack
 * @requires @react-navigation/native
 * @requires @react-native-async-storage/async-storage
 * @requires ./screens/Register
 * @requires ./screens/Login
 * @requires ./screens/Home
 * @requires ./screens/PassManager
 * @requires ./screens/Authenticate
 * @requires ./screens/EditService
 */
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import api from './api';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import PassManager from './screens/PassManager';
import Authenticate from './screens/Authenticate';
import EditService from './screens/EditService';

const Stack = createStackNavigator();

/**
 * Funkcja konfigurująca stos nawigacyjny aplikacji.
 * @returns {React.Component} Komponent React z nawigacją.
 * @requires useNavigation
 * @requires AsyncStorage
 * @requires api
 */

function MyStack() {
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('local')
      .then(response => {
        if (response !== null && JSON.parse(response) === true)
          navigation.reset({
            routes: [{ name: 'PassManager' }]
          });
      })
      .catch(error => { }) // Obsługa błędu AsyncStorage

      console.info(`Using API URL: ${api.defaults.baseURL}`)
    api.get('/main/status')
      .then(response => {
        return response.data
      })
      .then(data => {
        console.log(data)
        if (data.authenticated === true)
          navigation.reset({
            routes: [{ name: 'PassManager' }]
          });
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="PassManager" component={PassManager} />
      <Stack.Screen name="Authenticate" component={Authenticate} />
      <Stack.Screen name="EditService" component={EditService} />
    </Stack.Navigator>
  );
}

/**
 * Główny komponent aplikacji, zawierający kontener nawigacji.
 * @returns {React.Component} Komponent React z kontenerem nawigacji.
 * @requires NavigationContainer
 * @requires MyStack
 */
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


