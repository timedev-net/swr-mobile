import React, {useState, useEffect} from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import ColetaScreen from "../pages/admin/coleta/ColetaScreen";
import NovaColetaScreen from "../pages/admin/coleta/NovaColetaScreen";
// import DetalhesScreenAdmin from "../pages/admin/ForagidosScreen/DetalhesScreen";
// import CustomDrawerContent from '../containers/CustomDrawerContent'


const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();


function Tela({ title }) {
    return <Text>Teste tab {title}</Text>
}



export default function ColetaRoutes() {

  function tessss() {
    return Tela({title: 'novo titulo'})
  }

    return (
      
        // <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} >
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name="ColetaScreen" component={ColetaScreen} />
          {/* <Stack.Screen name="Detalhes" component={DetalhesScreenAdmin} /> */}
          <Stack.Screen name="Tela" component={tessss} />
        </Stack.Navigator>
      
    );
  }