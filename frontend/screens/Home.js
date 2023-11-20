import { View, Text, Pressable, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
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