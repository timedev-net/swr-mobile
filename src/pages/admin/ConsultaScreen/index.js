
import React, {useEffect} from 'react';
import {View, Button, Text, StatusBar} from 'react-native'
import { useTheme } from '@react-navigation/native';
import { Appbar, Card, Button as Button2 } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements'




function ConsultaScreen({ navigation }) {



  const [count, setCount] = React.useState(0);
  const { colors } = useTheme();

  goBack = () => console.log('Went back');
  handleSearch = () => console.log('Searching');
  handleMore = () => console.log('Shown more');

  useEffect(() => {
    // setTimeout(() => navigation.toggleDrawer(), 3000)
  }, []);

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <Button onPress={() => setCount(c => c + 1)} title="Update count" />
    //         ),
    //     });
    // }, [navigation, setCount]);

    return (
      <>
        <Appbar.Header>
          {/* <Appbar.BackAction onPress={goBack} /> */}
          <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()}/>
          <Appbar.Content title="Consulta" subtitle="SIPE - Sistema de Informação Penitenciária"/>
          {/* <Appbar.Action icon="magnify" onPress={handleSearch}/> */}
          <Appbar.Action icon="dots-vertical" onPress={handleMore}/>
        </Appbar.Header>
      
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         
            <StatusBar barStyle="dark-content" />
            <Text style={{ color: colors.text }}>Esta é a tela de Consultas</Text>
            {/* <Text style={{ color: colors.text }}>ADMINISTRADOR</Text> */}
            <Text style={{ color: colors.text, padding: 18 }}>Aqui ficarão diversas informações de instrução e recados aos usuário do app</Text>
            <Button
               title="Vá para Detalhes"
               onPress={() => navigation.navigate('Details', {
                   itemId: 86,
                   otherParam: 'anything you want here',
               })}
           />
           {/* <Button title={'Drawer'} onPress={() => navigation.toggleDrawer()} /> */}
       </View>
      </>
    );
}

export default ConsultaScreen;
