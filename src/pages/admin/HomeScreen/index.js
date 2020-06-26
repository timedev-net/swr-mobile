
import React, { useEffect, useState } from 'react';
import { View, Button, Text, StatusBar, ScrollView, Image } from 'react-native'
import { Appbar, Card, Button as Button2 } from 'react-native-paper';
import { theme_default, theme_dark } from '../../../theme'
import { Icon } from 'react-native-elements'
import styles from './styles'
import { Snackbar } from 'react-native-paper';
import { Avatar, Title, Paragraph, Divider, Surface } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { api_coleta, api_coleta_produto } from '../../../services/api'
import { useSelector } from 'react-redux';
import { Button as Button3 } from 'native-base';


function HomeScreen({ navigation, snackbar }) {

  const [count, setCount] = useState(0);
  const [snack, setSnack] = useState(false);
  const auth = useSelector(state => state.auth)

  // goBack = () => console.log('Went back');
  // handleSearch = () => console.log('Searching');
  // const handleMore = () => console.log('Shown more');



  useEffect(() => {
    setSnack(true)
  }, [snackbar]);

  // React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //         headerRight: () => (
  //             <Button onPress={() => setCount(c => c + 1)} title="Update count" />
  //         ),
  //     });
  // }, [navigation, setCount]);


  const teste = async () => {
    try {
      const res = await axios.get(api_coleta, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `bearer ${auth.auth.token}`
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem('@SWR:usuario_token')
    console.log(token)
  };

  // useEffect(() => {
  //   teste()
  // }, []);

  return (
    <View style={styles.colorBackground}>

      <Appbar.Header style={{ justifyContent: 'space-between', backgroundColor: '#fff' }}>
        {/* <Appbar.BackAction onPress={goBack} /> */}
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Image style={{ width: 191, height: 36 }} source={require('../../../assets/logos/topbar-verde.png')} />
        {/* <Appbar.Content title="WR Ambiental" subtitle="Sistema de cadastro de coletas"/> */}
        {/* <Appbar.Action icon="magnify" onPress={handleSearch}/> */}
        <Appbar.Action />
      </Appbar.Header>


      <Title style={{ padding: 10, color: '#fff' }}>Resumo Geral</Title>
      <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>

        

        <View>
          <Card style={styles.card}>
            <Text style={styles.titulo}>Coletas Efetuadas</Text>
            <Divider style={{ marginBottom: 5 }} />
            <Title style={styles.titulo2}>18</Title>
          </Card>
        </View>

        <View>
          <Card style={styles.card}>
            <Text style={styles.titulo}>Coletas Agendadas</Text>
            <Divider style={{ marginBottom: 5 }} />
            <Title style={styles.titulo2}>18</Title>
          </Card>
        </View>

        <View>
          <Card style={styles.card}>
            <Text style={styles.titulo}>Destinações Efetuadas</Text>
            <Divider style={{ marginBottom: 5 }} />
            <Title style={styles.titulo2}>13</Title>
          </Card>
        </View>

        <View>
          <Card style={styles.card}>
            <Text style={styles.titulo}>Destinações Agendadas</Text>
            <Divider style={{ marginBottom: 5 }} />
            <Title style={styles.titulo2}>13</Title>
          </Card>
        </View>

        <View>
          <Card style={styles.card}>
            <Text style={styles.titulo}>Clientes Cadastrados</Text>
            <Divider style={{ marginBottom: 5 }} />
            <Title style={styles.titulo2}>18</Title>
          </Card>
        </View>


      </View>
      

      <Button3 rounded success style={{ flex: 1, justifyContent: 'center', margin: 20}} onPress={() => {navigation.navigate('NovaColetaScreen')}} >
        <Text style={{ color: '#fff', fontSize: 16}}>NOVA COLETA</Text>
      </Button3>

      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Button title="Rota autenticada" onPress={teste} />
           <Button title="Pega Token" onPress={getToken} />
       </View> */}
      {/* <Snackbar style={{backgroundColor: 'green'}} visible={snack} onDismiss={() => setSnack(false)}>
          Usuário autenticado com sucesso!.
        </Snackbar> */}
    </View>
  );
}

export default HomeScreen;