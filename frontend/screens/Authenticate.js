import React from 'react';
import { useState, useEffect } from 'react';
import { authenticate2FA, loginUser } from '../api';
import api from '../api';
import { TextInput, Button, Alert, StyleSheet, View} from 'react-native';

export default function Authenticate({route, navigation}) {

    const [password2FA, setPassword2FA] = useState('');

    const formData2FA = new FormData();
    formData2FA.append('username', route.params.usernameParam);
    formData2FA.append('password', route.params.passParam);
    formData2FA.append('password2FA', password2FA);
    console.log(formData2FA);

    const handle2FA = async () => {
        const response = await authenticate2FA(formData2FA);
        console.log(response)
        if (response) {
            if (response.status === 200) {
                Alert.alert('Authentication successful', response.message);
                navigation.reset({
                    routes: [{ name: 'PassManager' }]
                });

            } else if (response.status === 400) {
                Alert.alert('Wrong 2FA code!', response.error);
            } else {
                Alert.alert('Login Failed!', 'Unexpected response from the server');
            }
        };
    }
    return (
        <View style={styles.container}>
            <TextInput
                secureTextEntry={true}
                placeholder="password2FA"
                value={password2FA}
                onChangeText={(text) => setPassword2FA(text)}
            />

            <Button title="Validate" onPress={handle2FA} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});