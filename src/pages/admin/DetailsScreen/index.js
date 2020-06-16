
import React from 'react';
import {View, Button, Text, StatusBar} from 'react-native'

function DetailsScreen({ navigation, route }) {
    const { itemId, otherParam } = route.params;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>paramentros recebidos da home:</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.navigate('Details')}
                // onPress={() => navigation.push('Details')}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />

            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            {/*<Button*/}
            {/*    title="Go back to first screen in stack"*/}
            {/*    onPress={() => navigation.popToTop()} // primeira tela da pilha de navegação*/}
            {/*/>*/}
        </View>
    );
}

export default DetailsScreen;
