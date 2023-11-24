/**
 * @file EditService.js - Komponent do edycji istniejących danych usługowych.
 * Wykorzystuje React, TextInput, Pressable, StyleSheet, Alert, StatusBar, SecureStore i komponenty React Native.
 * Obsługuje edycję danych usługowych oraz zapisywanie ich lokalnie lub poprzez API.
 * 
 * @requires React
 * @requires useState
 * @requires View
 * @requires Text
 * @requires TextInput
 * @requires Pressable
 * @requires StyleSheet
 * @requires Alert
 * @requires StatusBar
 * @requires SecureStore
 * @requires Picker
 * @requires DisplayIcon
 * @requires api
 */

import React from "react";
import api from "../api";
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, StatusBar } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';
import DisplayIcon from "../components/DisplayIcon";

/**
 * Komponent EditService
 * @param {object} navigation - Obiekt nawigacji.
 * @param {object} route - Obiekt zawierający parametry przekazane do nawigacji.
 * @returns {JSX.Element} - Zwraca widok edycji danych usługowych.
 */
export default function EditService({ navigation, route }) {
     // Stan komponentu
    const [username, setUsername] = useState(route.params.serviceDetails.username)
    const [password, setPassword] = useState(route.params.serviceDetails.password)
    const [name, setName] = useState(route.params.serviceDetails.name)
    const [icon, setIcon] = useState(route.params.serviceDetails.icon)
    const local = route.params.local;

    // Funkcja do edycji danych usługowych
    const editService = () => {
        if (!local) {
            //Edycja poprzez api
            const form = new FormData();
            form.append('name', name)
            form.append('username', username)
            form.append('password', password)
            form.append('icon', icon)

            api.post('/main/service/edit/', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(response => {
                    return response.data
                })
                .then(data => {
                    Alert.alert(data.message)
                })
                .catch(error => {
                    console.warn(error);
                })
        } else {
            //Edycja danych lokalnie
            SecureStore.getItemAsync('credits')
                .then(response => {
                    let values = JSON.parse(response)
                    const id = values.findIndex((item) => item.pk === route.params.serviceDetails.pk)
                    values[id] = { name: name, username: username, password: password, icon: icon, pk: route.params.serviceDetails.pk }
                    SecureStore.setItemAsync('credits', JSON.stringify(values))
                        .then(response => {
                            Alert.alert("Edit successfull!")
                        })
                        .catch(error => {
                            console.error(error);
                        })

                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    // Renderowanie komponentu
    return (
        <View style={style.container}>
            <Text style={style.header}>
                Edit credentials
            </Text>
            <View style={style.form}>
                <TextInput
                    placeholder="Service name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={style.input}
                />
                <TextInput
                    placeholder="Service login"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={style.input}
                />
                <TextInput
                    placeholder="Service password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={style.input}
                />
                <View style={style.iconPicker}>

                    <Picker
                        style={style.input}
                        selectedValue={icon}
                        onValueChange={(value) => setIcon(value)}
                        placeholder="Select icon"
                    >
                        <Picker.Item label="Default" value='{"type": "fa", "name": "globe"}' />
                        <Picker.Item label="Facebook" value='{"type": "ad", "name":"facebook-square"}' />
                        <Picker.Item label="X" value='{"type": "ad", "name":"twitter"}' />
                        <Picker.Item label="LinkedIn" value='{"type": "fa", "name":"linkedin"}' />
                    </Picker>
                    <View style={style.icon}>
                        <DisplayIcon iconString={icon} color="blue" />
                    </View>
                </View>

                <Pressable style={style.submit} onPress={() => editService()}><Text style={style.submitText}>Save</Text></Pressable>
            </View>
        </View>
    )
}

//Style dla komponentu
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight
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
        marginBottom: 15
    },
    submit: {
        width: '75%',
        minHeight: 40,
        backgroundColor: '#519FE0',
        borderRadius: 5,
        justifyContent: 'center'
    },
    submitText: {
        textAlign: 'center',
    },
    iconPicker: {
        width: '75%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        backgroundColor: '#BCDEFA',
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 15,
        marginBottom: 6,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: { width: -2, height: 4 },
        elevation: 5
    }
})