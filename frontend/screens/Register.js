/**
 * @file Register.js - Komponent obsługujący rejestrację użytkownika.
 * Wykorzystuje React, useState z 'react', Modal, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet, View z 'react-native',
 * Clipboard z 'expo-clipboard', registerUser z '../api'.
 * Odpowiada za interfejs rejestracji użytkownika, przetwarzanie danych rejestracji, wyświetlanie komunikatów, wyświetlanie i kopiowanie tajnego klucza.
 * 
 * @requires React
 * @requires useState
 * @requires Modal
 * @requires Text
 * @requires TouchableOpacity
 * @requires TextInput
 * @requires Button
 * @requires Alert
 * @requires StyleSheet
 * @requires View
 * @requires Clipboard
 * @requires registerUser
 */
import { useState } from 'react';
import { registerUser } from '../api';
import { Modal, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet, View } from 'react-native';
import * as Clipboard from "expo-clipboard"

/**
 * Komponent Register
 * @param {object} navigation - Obiekt nawigacji.
 * @returns {JSX.Element} - Zwraca interfejs rejestracji użytkownika.
 */
export default function Register({ navigation }) {
  // Stany przechowujące dane rejestracji
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [secretKey, setSecretKey] = useState('');

  // Tworzenie obiektu FormData z danymi rejestracji
  const formDataRegister = new FormData();
  formDataRegister.append('username', username);
  formDataRegister.append('email', email);
  formDataRegister.append('password1', password1);
  formDataRegister.append('password2', password2);

  // Obsługa rejestracji użytkownika
  const handleRegister = async () => {
    const response = await registerUser(formDataRegister);
    if (response) {
      if (response.status === 200) {
        if (response.secret) {
          setModalVisible(true);
          setSecretKey(response.secret);
        }
      } else if (response.status === 400) {
        Alert.alert('Passwords dont match!', response.error);
      } else if (response.status === 401) {
        Alert.alert("Username exists", response.error);
      }
    } else {
      Alert.alert('Registration failed', 'Unexpected response from the server');
    }
  };

  // Kopiowanie tajnego klucza do schowka
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(secretKey);
    Alert.alert('Secret key copied to clipboard');
  };

  // Renderowanie interfejsu
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={(text) => setUserName(text)}
        style={styles.input}
      />

      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />

      <TextInput
        secureTextEntry={true}
        placeholder="password"
        value={password1}
        onChangeText={(text) => setPassword1(text)}
        style={styles.input}
      />

      <TextInput
        secureTextEntry={true}
        placeholder="repeat password"
        value={password2}
        onChangeText={(text) => setPassword2(text)}
        style={styles.input}
      />

      <Button title="Register" 
      onPress={handleRegister} 
      style={styles.submit}/>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Your Secret Code for login is:</Text>
            <Text>{secretKey}</Text>
            <TouchableOpacity
              onPress={copyToClipboard}
              style={styles.copyButton}
            >
              <Text>Copy to Clipboard</Text>
            </TouchableOpacity>
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>


  );
};

// Style dla komponentu
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    backgroundColor: '#BCDEFA',
    shadowColor: 'black',
    paddingLeft: 4,
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 5,
    borderRadius: 4,
    elevation: 5,
    width: '75%',
    minHeight: 40,
    marginBottom: 15,
    textAlign:'center'
  },
  submit: {
    width: '75%',
    minHeight: 40,
    backgroundColor: '#519FE0',
    borderRadius: 5,
    justifyContent: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  copyButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});
