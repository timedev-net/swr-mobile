
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { api_interno_foragidos } from '../../../../services/api'
import { theme_default, theme_dark } from '../../../../theme'
import { useSelector } from 'react-redux';
import styles from './styles'
import axios from 'axios';

import { View, StatusBar, ScrollView, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { Appbar, Card, Snackbar, Avatar, Title, Paragraph, Divider, Surface, TextInput, Menu, Button as ButtonPaper } from 'react-native-paper';
import { Container, Header, Content, Form, DatePicker, Picker, Text, Item, Input, Label, CheckBox, Body, ListItem, Radio, Right, Left, Button as ButtonBase } from 'native-base';



function ColetaScreen({ navigation, snackbar }) {

  const auth = useSelector(state => state.auth)
  // const [snack, setSnack] = useState(false);
  const [date, setDate] = useState();
  const [piker1, setPiker1] = useState();
  const [menuVisible, setMenuVisible] = useState(false);

  // goBack = () => console.log('Went back');
  // handleSearch = () => console.log('Searching');
  const handleMore = () => {
    console.log('Shown more');
    setMenuVisible(!menuVisible)
  }



  // useEffect(() => {
  //   setSnack(true)
  // }, [snackbar]);

  // React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //         headerRight: () => (
  //             <Button onPress={() => setCount(c => c + 1)} title="Update count" />
  //         ),
  //     });
  // }, [navigation, setCount]);


  const teste = async () => {
    try {
      const res = await axios.get(api_interno_foragidos, {
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

  return (
    <View style={styles.colorBackground}>

      <Appbar.Header style={{ justifyContent: 'space-between', backgroundColor: theme_dark.colors.drawer }}>
        {/* <Appbar.BackAction onPress={goBack} /> */}
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Image style={{ width: 191, height: 36 }} source={require('../../../../assets/logos/topbar-verde.png')} />
        {/* <Appbar.Content title="WR Ambiental" subtitle="Sistema de cadastro de coletas"/> */}
        {/* <Appbar.Action icon="magnify" onPress={handleSearch}/> */}
        {/* <Appbar.Action icon="dots-vertical" onPress={handleMore} /> */}
        
          <Menu visible={menuVisible} onDismiss={handleMore} anchor={<Appbar.Action icon="dots-vertical" color='#fff' onPress={handleMore} />} >
            <Menu.Item onPress={() => {}} title="+ Coleta" />
            <Menu.Item onPress={() => {}} title="+ Destinação" />
            {/* <Divider /> */}
            {/* <Menu.Item onPress={() => {}} title="Sobre" /> */}
          </Menu>
        
      </Appbar.Header>

        

      <ScrollView style={{ padding: 10 }}>
        <Card>
          {/* <Card.Cover source={{ uri: 'http://www.nueva-iso-14001.com/wp-content/uploads/2018/10/pol%C3%ADtica-ambiental.jpg' }} /> */}
          <Card.Content style={{ backgroundColor: theme_dark.colors.drawer }}>
            <Title>Lista de Coletas</Title>
            {/* <Title style={{ fontSize: 14, }}>Preencha corretamente o formulário</Title> */}
            <Divider style={{ marginBottom: 10, paddingBottom: 2 }} />

            

            {/* <TextInput label='Observação' mode='outlined' style={{ backgroundColor: '#333' }}/> */}
            {/* <Label style={{ color: '#fff'}}>Observação</Label> */}
          </Card.Content>
        </Card>
      </ScrollView>
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

export default ColetaScreen;
