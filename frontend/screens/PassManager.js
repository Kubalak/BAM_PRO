/**
 * @file PassManager.js - Główny plik zarządzający nawigacją i funkcjonalnością aplikacji.
 * Wykorzystuje React, StyleSheet z 'react-native', useEffect, useState z 'react',
 * createDrawerNavigator z '@react-navigation/drawer', LocalAuthentication z 'expo-local-authentication',
 * ManageApp, AddService, Logout z odpowiednich komponentów.
 * Odpowiada za zarządzanie nawigacją między ekranami, obsługę biometrycznej autoryzacji oraz rysowanie menu bocznego (drawer).
 * 
 * @requires React
 * @requires StyleSheet
 * @requires useEffect
 * @requires useState
 * @requires createDrawerNavigator
 * @requires LocalAuthentication
 * @requires ManageApp
 * @requires AddService
 * @requires Logout
 */
import React from 'react';
import {StyleSheet } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication'
//import { Drawer } from 'react-native-drawer-layout'; MOŻNA DAC POTEM TAKI NA GESTY 
import ManageApp from './ManageApp';
import AddService from "./AddService";
import Logout from "./Logout";

const Drawer = createDrawerNavigator();

/**
 * Komponent PassManager
 * @param {object} navigation - Obiekt nawigacji.
 * @returns {JSX.Element} - Zwraca główny ekran zarządzający aplikacją z menu bocznym (drawer).
 */
export default function PassManager({navigation}){
    // Stan sprawdzający czy biometria jest obsługiwana
    const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

    // Obsługa autoryzacji biometrycznej
    const handleBiometricAuth = async () => {
        try {
            const { success, error } = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Please authenticate yourself'
            });
            if(success)
                console.info(success)
        }
        catch(error){
            console.error(error);
        }
    }

    // Efekt wykonywany po załadowaniu komponentu
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
        handleBiometricAuth();
    },[]);

    // Renderowanie komponentu
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Manage Apps" component={ManageApp}></Drawer.Screen>
            <Drawer.Screen name="Add service" component={AddService}></Drawer.Screen>
            <Drawer.Screen name="Logout" component={Logout}></Drawer.Screen>
        </Drawer.Navigator>
    );
}

// Style komponentu
const style = StyleSheet.create({
    button:{
        marginBottom: 5,
    }
        
})



