/**
 * @file Logout.js - Komponent odpowiedzialny za proces wylogowania.
 * Wykorzystuje React, useEffect, StyleSheet, View, Text, StatusBar z 'react-native', api z '../api', AsyncStorage z '@react-native-async-storage/async-storage'.
 * Odpowiada za wylogowanie użytkownika z aplikacji poprzez API oraz czyszczenie danych lokalnych.
 * 
 * @requires React
 * @requires useEffect
 * @requires StyleSheet
 * @requires View
 * @requires Text
 * @requires StatusBar
 * @requires api
 * @requires AsyncStorage
 */
import { useEffect } from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import api from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Komponent Logout
 * @param {object} navigation - Obiekt nawigacji.
 * @returns {JSX.Element} - Zwraca widok procesu wylogowania.
 */
export default function Logout({ navigation }) {
    // Efekt wykonywany po załadowaniu komponentu
    useEffect(() => {
        AsyncStorage.removeItem('local')
            .then(() => { })
            .catch(() => { })

        // Wylogowanie użytkownika poprzez API
        api.post('/main/logout/')
            .then(response => {
                return response.data
            })
            .then(data => {
                console.info(data.message)
                // Reset nawigacji do ekranu głównego
                navigation.reset({
                    routes: [{ name: 'Home' }]
                });
            })
            .catch(error => {
                console.warn(error)
            })
    },)

    // Renderowanie komponentu
    return (
        <View style={style.container}>
            <Text>
                Logging out...
            </Text>
        </View>
    )
}

//Style komponentu
const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    button: {
        marginBottom: 5,
    }

})