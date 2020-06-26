
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { api_coleta, api_coleta_produto } from '../../../../services/api'
import { theme_default, theme_dark } from '../../../../theme'
import { useSelector } from 'react-redux';
import styles from './styles'
import axios from 'axios';
import moment from 'moment';
import { index_coleta } from '../../../../store/reducers/coleta/coletaReducer';
import { useDispatch } from 'react-redux';

import { View, StatusBar, ScrollView, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { Appbar, Card, Snackbar, Avatar, Title, Paragraph, Divider, Surface, TextInput, Menu, Button as ButtonPaper, List } from 'react-native-paper';
import { Container, Header, Content, Form, DatePicker, Picker, Text, Item, Input, Label, CheckBox, Body, ListItem, Radio, Right, Left, Button as ButtonBase } from 'native-base';



function ColetaScreen({ navigation, snackbar }) {

  const auth = useSelector(state => state.auth)
  const storeRedux = useSelector(state => state)
  const dispatch = useDispatch()
  // const [snack, setSnack] = useState(false);
  const [date, setDate] = useState();
  const [piker1, setPiker1] = useState();
  const [menuVisible, setMenuVisible] = useState(false);

  // goBack = () => console.log('Went back');
  // handleSearch = () => console.log('Searching');
  const handleMore = () => {
    setMenuVisible(!menuVisible)
    // dispatch(index_coleta(['tessssssssddddddddddssssssssste']))
    // console.log(storeRedux.coleta.dados_api)
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


  const busca_dados = async () => {
    try {
      const res = await axios.get(api_coleta, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `bearer ${auth.auth.token}`
        }
      })
      dispatch(index_coleta(res.data))
    } catch (error) {
      console.log(error)
    }
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem('@SWR:usuario_token')
    console.log(token)
  };

  useEffect(() => {
    busca_dados()
  }, []);

  return (
    <View style={styles.colorBackground}>

      <Appbar.Header style={{ justifyContent: 'space-between', backgroundColor: '#fff' }}>
        {/* <Appbar.BackAction onPress={goBack} /> */}
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Image style={{ width: 191, height: 36 }} source={require('../../../../assets/logos/topbar-verde.png')} />
        {/* <Appbar.Content title="WR Ambiental" subtitle="Sistema de cadastro de coletas"/> */}
        {/* <Appbar.Action icon="magnify" onPress={handleSearch}/> */}
        {/* <Appbar.Action icon="dots-vertical" onPress={handleMore} /> */}
        
          <Menu visible={menuVisible} onDismiss={() => setMenuVisible(false)} anchor={<Appbar.Action icon="dots-vertical" color='#365025' onPress={handleMore} />} >
            <Menu.Item onPress={() => {navigation.navigate('NovaColetaScreen'), setMenuVisible(false)}} title="Nova Coleta" />
            {/* <Menu.Item onPress={() => {}} title="+ Destinação" /> */}
            {/* <Divider /> */}
            {/* <Menu.Item onPress={() => {}} title="Sobre" /> */}
          </Menu>
        
      </Appbar.Header>

        

      <ScrollView style={{ padding: 10 }}>
        <Card>
          {/* <Card.Cover source={{ uri: 'http://www.nueva-iso-14001.com/wp-content/uploads/2018/10/pol%C3%ADtica-ambiental.jpg' }} /> */}
          <Card.Content style={{ backgroundColor: theme_default.colors.drawer }}>
            <Title>Lista de Coletas</Title>
            {/* <Title style={{ fontSize: 14, }}>Preencha corretamente o formulário</Title> */}
            <Divider style={{ marginBottom: 10, paddingBottom: 2 }} />

            <List.AccordionGroup>
              {storeRedux.coleta.dados_api? storeRedux.coleta.dados_api.map((coleta, idx) => (
                <View key={coleta.id}>
                  <List.Accordion title={`${moment(coleta.data).format('DD/MM/YYYY')} - ${coleta.cliente.nome}`} id={coleta.id}>
                    {coleta?.produto_coleta? coleta.produto_coleta.map((produto, indice) => (
                      <List.Item key={produto.id} title={`${indice+1}. ${produto.produto.nome} (${produto.quantidade} ${produto.tipo_medida.nome_tipo})`} style={{ marginLeft: 20 }} />
                    )) : null}
                    <ButtonPaper onPress={() => {navigation.navigate('NovoProdutoScreen', { coleta_id: coleta.id })}}>+ Produto</ButtonPaper>
                    {/* <ButtonPaper>Detalhes</ButtonPaper> */}
                  </List.Accordion>
                  <Divider />
                </View>
              )) : null}
              </List.AccordionGroup>
            

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
