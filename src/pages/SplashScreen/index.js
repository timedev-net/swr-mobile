
import React, {useEffect} from 'react';
import { View, Button, Text, Image, StatusBar } from 'react-native'
import { StyleSheet } from 'react-native'



function SplashScreen({ navigation, route }) {


  return (
    <View style={styles.background}>
        {/* <Text style={styles.titulo}>SIPE</Text> */}
        {/* <Text style={styles.subtitulo}>Sistema de Informação Penitenciária - SEJUS</Text> */}
        <Image style={styles.image} source={require('../../assets/logotipo-horizontal-branco.png')} />
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919'
  },
  titulo: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold'
  },
  subtitulo: {
    color: '#fff',
    fontSize: 15,
  },
  image: {
    margin: 20,
    padding: 30,
    width: 350,
    height: 370
  }
})
