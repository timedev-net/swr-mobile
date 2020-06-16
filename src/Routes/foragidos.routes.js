import React, {useState, useEffect} from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import ForagidosScreenAdmin from "../pages/admin/ForagidosScreen";
import DetalhesScreenAdmin from "../pages/admin/ForagidosScreen/DetalhesScreen";
import CustomDrawerContent from '../containers/CustomDrawerContent'


const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();


function Tela({ title }) {
    return <Text>Teste tab {title}</Text>
}



export default function ForagidosRoutes() {

  function tessss() {
    return Tela({title: 'novo titulo'})
  }

    return (
      
        // <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} >
        <Stack.Navigator>
          <Stack.Screen name="Foragidos" component={ForagidosScreenAdmin} />
          {/* <Stack.Screen name="Detalhes" component={DetalhesScreenAdmin} /> */}
          <Stack.Screen name="Tela" component={tessss} />
        </Stack.Navigator>
      
    );
  }