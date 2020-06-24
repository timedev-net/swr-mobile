
import React, { useEffect, useState } from 'react';
import { View, StatusBar, ScrollView, Image } from 'react-native'
import { Appbar, Card, Button as Button2 } from 'react-native-paper';
import { theme_default, theme_dark } from '../../../../theme'
import { Icon } from 'react-native-elements'
import styles from './styles'
import moment from 'moment';
import { Snackbar } from 'react-native-paper';
import { Avatar, Title, Paragraph, Divider, Surface, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { api_coleta, api_coleta_produto } from '../../../../services/api'
import { useSelector } from 'react-redux';
import { Container, Header, Content, Form, DatePicker, Picker, Text, Item, Input, Label, CheckBox, Body, ListItem, Radio, Right, Left, Button } from 'native-base';
// import {Picker} from '@react-native-community/picker';



function NovoProdutoScreen({ navigation, route, snackbar }) {

  const auth = useSelector(state => state.auth)
  const { coleta_id } = route.params;
  // const [snack, setSnack] = useState(false);
  const [dadosColeta, setDadosColeta] = useState();
  const [date, setDate] = useState();
  const [piker1, setPiker1] = useState();


  // goBack = () => console.log('Went back');
  // handleSearch = () => console.log('Searching');
  const handleMore = () => console.log('Shown more');



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
      const res = await axios.get(`${api_coleta}/${coleta_id}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `bearer ${auth.auth.token}`
        }
      })
      setDadosColeta(res.data)
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
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Image style={{ width: 191, height: 36 }} source={require('../../../../assets/logos/topbar-verde.png')} />
        {/* <Appbar.Content title="WR Ambiental" subtitle="Sistema de cadastro de coletas"/> */}
        {/* <Appbar.Action icon="magnify" onPress={handleSearch}/> */}
        {/* <Appbar.Action onPress={handleMore} /> */}
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <ScrollView style={{ padding: 10 }}>
        <Card>
          {/* <Card.Cover source={{ uri: 'http://www.nueva-iso-14001.com/wp-content/uploads/2018/10/pol%C3%ADtica-ambiental.jpg' }} /> */}
          <Card.Content style={{ backgroundColor: '#fff' }}>
            <Title>Adicionar Produto na Coleta</Title>
            {/* <Paragraph>#: {coleta_id}</Paragraph> */}
            <Divider style={{ marginBottom: 10}} />
            <Paragraph>Data: {dadosColeta? moment(dadosColeta.data).format('DD/MM/YYYY') : null}</Paragraph>
            <Paragraph>Cliente: {dadosColeta? dadosColeta.cliente.nome : null}</Paragraph>


            <Divider style={{ marginTop: 10}} />
            <Title style={{ fontSize: 14, }}>Preencha corretamente o formulário</Title>
            <Divider style={{ marginBottom: 10, paddingBottom: 2 }} />

            <Form>
              
              <Item rounded last style={{ marginBottom: 10 }}>
                <Picker
                  mode="dropdown"
                  note
                  selectedValue={piker1}
                  onValueChange={e => setPiker1(e)}
                >
                  <Picker.Item label="Produto" />
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
                </Picker>
              </Item>

              <Item rounded last style={{ marginBottom: 10 }}>
                <Input keyboardType='number-pad' placeholder='Quantidade' />
              </Item>

              <Item rounded last style={{ marginBottom: 10 }}>
                <Picker
                  mode="dropdown"
                  note
                  selectedValue={piker1}
                  onValueChange={e => setPiker1(e)}
                >
                  <Picker.Item label="Unidade de medida" />
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
                </Picker>
              </Item>

              <Item rounded last style={{ marginBottom: 10 }}>
                <Input keyboardType='number-pad' placeholder='Custo' />
              </Item>

              <Button rounded success style={{ flex: 1, justifyContent: 'center', marginTop: 20}}>
                <Text>Adicionar</Text>
              </Button>

            </Form>

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

export default NovoProdutoScreen;
