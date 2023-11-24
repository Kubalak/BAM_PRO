/**
 * @file Home.js - Komponent głównej strony aplikacji.
 * Wykorzystuje React Native, AsyncStorage, View, Text, Pressable i StyleSheet.
 * Odpowiada za interfejs głównej strony, umożliwiając nawigację do logowania, rejestracji oraz używanie lokalnego przechowywania danych.
 * 
 * @requires React Native
 * @requires AsyncStorage
 * @requires View
 * @requires Text
 * @requires Pressable
 * @requires StyleSheet
 */
import { View, Text, Pressable, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Komponent Home
 * @param {object} navigation - Obiekt nawigacji.
 * @returns {JSX.Element} - Zwraca widok głównej strony aplikacji.
 */
export default function Home({ navigation }) {
    // Funkcja rozpoczynająca używanie lokalnego przechowywania danych
    const startLocal = async () => {
        try {
            await AsyncStorage.setItem('local', 'true');
            navigation.reset({
                routes: [{ name: 'PassManager' }]
            });
        }
        catch (e) {
            console.error(e)
        }

    }

    // Renderowanie komponentu
    return (
        <View style={style.container}>
            <View style={style.button}>
                <Pressable onPress={() => navigation.navigate("Login")}><Text style={style.buttonText}>Login</Text></Pressable>
            </View>
            <View style={style.button}>
                <Pressable onPress={() => navigation.navigate("Register")}><Text style={style.buttonText}>Register</Text></Pressable>
            </View>
            <View style={style.button}>
                <Pressable onPress={() => startLocal()}><Text style={style.buttonText}>Use local storage</Text></Pressable>
            </View>
        </View>
    )
}

// Style dla komponentu
const style = StyleSheet.create({
    button: {
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 4,
        backgroundColor: '#519FE0',
        width: '45%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 5,
        marginBottom: 5
    },
    form: {
        alignItems: 'center',
        width: '100%',
    },
    submit: {
        width: '75%',
        minHeight: 40,
        backgroundColor: '#519FE0',
        borderRadius: 5,
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
})