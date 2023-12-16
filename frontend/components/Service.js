import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import DisplayIcon from "./DisplayIcon";
import { FontAwesome } from '@expo/vector-icons';

export default function Service({ details }) {
    const [visible, setVisible] = useState(false);
    return (
        <View style={style.container}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{details.name}</Text>
            <View style={style.content}>
                <View style={style.iconContainer}>
                    <DisplayIcon iconString={details.icon} color="blue" />
                </View>
                <View style={style.details}>
                    <Text>Username: {details.username}</Text>
                    <Text style={{ alignContent: 'center' }}>Password: {visible ? details.password : "⬤".repeat(details.password.length)}</Text>
                </View>
                <Pressable style={style.switch} onPress={() => setVisible(!visible)}><FontAwesome name={visible ? "eye-slash" : "eye"} size={24} color="black" /></Pressable>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#BCDEFA',
        marginBottom: 10,
        shadowColor: 'black',
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 5,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 4,
        paddingBottom: 6

    },
    content: {
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        margin: 3,
        flex: 1,
    },
    details: {
        flexDirection: 'column',
        marginLeft: 10,
        flex: 8,
    },
    switch: {
        flex: 1,
    }
})