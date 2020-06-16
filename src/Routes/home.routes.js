import React, {useState, useEffect} from 'react';
import { View, Text, StatusBar, Button, ScrollView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import { Button } from 'native-base';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function Tela({ title, navigation }) {
    return (
      <View>
        <Text>Teste tab {title}</Text>
        <Button title="nova tela" onPress={() => navigation.navigate('Settings')} />
      </View>
    )
}



export default function HomeRoutes() {

  function tessss() {
    return Tela({title: 'novo titulo'})
  }

    return (
      
        <Stack.Navigator>
          <Stack.Screen name="HomeTeste" component={Tela} />
          <Stack.Screen name="Settings" component={tessss} />
        </Stack.Navigator>
      
    );
  }