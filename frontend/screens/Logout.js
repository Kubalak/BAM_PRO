import { useEffect } from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import api from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout({ navigation }) {

    useEffect(() => {
        AsyncStorage.removeItem('local')
            .then(() => { })
            .catch(() => { })

        api.post('/main/logout/')
            .then(response => {
                return response.data
            })
            .then(data => {
                console.info(data.message)
                navigation.reset({
                    routes: [{ name: 'Home' }]
                });
            })
            .catch(error => {
                console.warn(error)
            })
    },)

    return (
        <View style={style.container}>
            <Text>
                Logging out...
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    button: {
        marginBottom: 5,
    }

})