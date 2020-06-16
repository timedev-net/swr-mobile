
import React from 'react';
import {View, Button, Text, StatusBar} from 'react-native'

function UserNotActiveScreen({ navigation, route }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Seu usuário ainda não foi ativado, aguarde a análise pelos administradores.</Text>

        </View>
    );
}

export default UserNotActiveScreen;
