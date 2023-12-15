/**
 * @file Login.js - Komponent odpowiedzialny za proces logowania.
 * Wykorzystuje React, useState, useEffect, loginUser z '../api', TextInput, Button, Alert, StyleSheet, View, Text z 'react-native'.
 * Umożliwia użytkownikowi logowanie się do aplikacji poprzez API.
 * 
 * @requires React
 * @requires useState
 * @requires useEffect
 * @requires loginUser
 * @requires TextInput
 * @requires Button
 * @requires Alert
 * @requires StyleSheet
 * @requires View
 * @requires Text
 */
import React from 'react';
import { useState, useEffect } from 'react';
import api from '../api';
import { TextInput, Button, Alert, StyleSheet, View, Text } from 'react-native';



/**
 * Komponent Login
 * @param {object} navigation - Obiekt nawigacji.
 * @returns {JSX.Element} - Zwraca widok logowania.
 */
export default function Login({ navigation }) {
    // Stany komponentu
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // Tworzenie formularza danych logowania
    const formDataLogin = new FormData();
    formDataLogin.append('username', username);
    formDataLogin.append('password', password);

    // Obsługa procesu logowania
    const handleLogin = () => {
        //const response = await loginUser(formDataLogin);
        api.post('/main/login/', formDataLogin,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            navigation.navigate('Authenticate', { usernameParam: username, passParam : password});
            
        })
        .catch(error => {
            if(error.response && error.response.status === 400)
                Alert.alert('Wrong username or password!', error.response.error);
            else
                console.warn(error);
        })
    }

    // Renderowanie komponentu
    return (
        <View style={styles.container}>
            <View style={styles.form}>
            <TextInput
                placeholder="username"
                value={username}
                onChangeText={(text) => setUserName(text)}
                style={styles.input}
            />

            <TextInput
                secureTextEntry={true}
                placeholder="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
            />

            <Button 
            title="Login" 
            onPress={handleLogin}
            style={styles.submit} />
            </View>
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
})