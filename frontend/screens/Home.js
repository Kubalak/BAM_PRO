import { View, Text, Button, StyleSheet } from "react-native";
import { StatusBar } from "react-native";

export default function Home({navigation}){
    return(
        <View style={style.container}>
            <Text>This is home.</Text>
            <View style={style.button}>
                <Button title="Login" onPress={() => navigation.navigate("Login")}> Login </Button>
            </View>
            <View style={style.button}>
                <Button title="Register" onPress = {() => navigation.navigate("Register")}> Register</Button>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    button:{
        marginBottom: 5,
    }
        
})