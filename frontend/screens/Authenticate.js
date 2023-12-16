/**
 * @file Authenticate.js - Komponent do uwierzytelniania użytkownika przez drugi etap uwierzytelniania dwuetapowego.
 * Wykorzystuje React, TextInput, Button, Alert, StyleSheet i komponenty React Native.
 * Obsługuje uwierzytelnianie użytkownika z wykorzystaniem drugiego czynnika (np. kodu TOTP).
 * 
 * @requires React
 * @requires useState
 * @requires useEffect
 * @requires TextInput
 * @requires Button
 * @requires Alert
 * @requires StyleSheet
 * @requires View
 * @requires authenticate2FA
 * @requires loginUser
 * @requires api
 */
import React from 'react';
import { useState, useEffect } from 'react';
import api from '../api';
import { TextInput, Button, Alert, StyleSheet, View} from 'react-native';

/**
 * Komponent Authenticate
 * @param {object} route - Obiekt zawierający parametry przekazane do nawigacji.
 * @param {object} navigation - Obiekt nawigacji.
 * @returns {JSX.Element} - Zwraca widok uwierzytelniania użytkownika przez drugi etap uwierzytelniania dwuetapowego.
 */
export default function Authenticate({route, navigation}) {
    // Stan komponentu
    const [password2FA, setPassword2FA] = useState('');

    // Tworzenie formularza z danymi dla drugiego czynnika uwierzytelniania
    const formData2FA = new FormData();
    formData2FA.append('username', route.params.usernameParam);
    formData2FA.append('password', route.params.passParam);
    formData2FA.append('password2FA', password2FA);

    // Obsługa uwierzytelniania przez drugi etap
    const handle2FA = () => {
        api.post('/main/authenticate/', formData2FA, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
                navigation.reset({
                    routes: [{ name: 'PassManager' }]
                });
            })
        .catch(error => {
            if(error.response && error.response.status === 400){
                Alert.alert('Wrong 2FA code!', error.response.data ? error.response.data.error : '');
            }
            else {
                Alert.alert('Login Failed!', 'Unexpected response from the server');
                console.error(error);
            }
        })
    }

    // Renderowanie komponentu
    return (
        <View style={styles.container}>
            <TextInput
                secureTextEntry={true}
                placeholder="TOTP CODE"
                value={password2FA}
                onChangeText={(text) => setPassword2FA(text)}
                style={styles.input}
            />

            <Button title="Validate" onPress={handle2FA} />
        </View>
    );
};

// Style dla komponentu
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    header: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 5,
        marginBottom: 5
    },
    form:{
        alignItems: 'center',
        width: '100%',
    },
    input:{
        backgroundColor: '#BCDEFA',
        shadowColor: 'black',
        paddingLeft: 4,
        shadowOffset: {width: -2, height: 4},
        shadowRadius: 5,
        borderRadius: 4,
        elevation: 5,
        width: '75%',
        minHeight: 40,
        marginBottom: 15,
        textAlign:'center'
    },
    submit:{
        width: '75%',
        minHeight: 40,
        backgroundColor: '#519FE0',
        borderRadius: 5,
        justifyContent: 'center'
    },
    submitText: {
        textAlign: 'center',
    },
});