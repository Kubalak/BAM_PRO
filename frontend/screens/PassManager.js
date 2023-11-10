import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import { Drawer } from 'react-native-drawer-layout'; MOŻNA DAC POTEM TAKI NA GESTY 
import ManageApp from './ManageApp';
import Settings from './Settings';

const Drawer = createDrawerNavigator();

function MyDrawer(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Manage Apps" component={ManageApp}></Drawer.Screen>
            <Drawer.Screen name="Settings" component={Settings}></Drawer.Screen>
        </Drawer.Navigator>
        );
}

export default function PassManager({navigation}){
    return(
            <MyDrawer/>
    )
}

const style = StyleSheet.create({
    button:{
        marginBottom: 5,
    }
        
})



