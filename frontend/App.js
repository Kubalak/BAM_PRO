
import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { registerUser, loginUser } from './api';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';

const MyForm = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const formDataRegister = new FormData();
        formDataRegister.append('username', username);
        formDataRegister.append('email', email);
        formDataRegister.append('password1', password1);
        formDataRegister.append('password2', password2);
        
        const handleRegister = async () => {
            const response = await registerUser(formDataRegister);
            if (response) {
              if (response.status === 200) {
                Alert.alert('Registration successful', response.message);
              } else if (response.status === 400) {
                Alert.alert('Passwords dont match!', response.error);
              } else if (response.status === 401){
                Alert.alert("Username exists", response.error);
              }
            } else {
              Alert.alert('Registration failed', 'Unexpected response from the server');
            }
        };
  
  return (
    <View>
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
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <MyForm/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
