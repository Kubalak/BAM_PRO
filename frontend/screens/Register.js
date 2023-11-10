import { useState} from 'react';
import { registerUser } from '../api';
import { Modal, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet, View} from 'react-native';
import * as Clipboard from "expo-clipboard"

export default function Register({ navigation }) {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [secretKey, setSecretKey] = useState('');

  const formDataRegister = new FormData();
  formDataRegister.append('username', username);
  formDataRegister.append('email', email);
  formDataRegister.append('password1', password1);
  formDataRegister.append('password2', password2);

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

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(secretKey);
    Alert.alert('Secret key copied to clipboard');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={(text) => setUserName(text)}
      />

      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        secureTextEntry={true}
        placeholder="password1"
        value={password1}
        onChangeText={(text) => setPassword1(text)}
      />

      <TextInput
        secureTextEntry={true}
        placeholder="password2"
        value={password2}
        onChangeText={(text) => setPassword2(text)}
      />

      <Button title="Register" onPress={handleRegister} />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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