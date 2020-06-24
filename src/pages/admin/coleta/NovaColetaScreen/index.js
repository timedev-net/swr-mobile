
import React, { useEffect, useState } from 'react';
import { View, StatusBar, ScrollView, Image, Button as BtnRN } from 'react-native'
import { Appbar, Card, Button as Button2 } from 'react-native-paper';
import { theme_default, theme_dark } from '../../../../theme'
import { Icon } from 'react-native-elements'
import styles from './styles'
import { Snackbar } from 'react-native-paper';
import { Avatar, Title, Paragraph, Divider, Surface, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { api_interno_foragidos } from '../../../../services/api'
import { useSelector } from 'react-redux';
import { Container, Header, Content, Form, DatePicker, Picker, Text, Item, Input, Label, CheckBox, Body, ListItem, Radio, Right, Left, Button } from 'native-base';
// import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';



function NovaColetaScreen({ navigation, snackbar }) {

  const auth = useSelector(state => state.auth)
  // const [snack, setSnack] = useState(false);
  // const [date, setDate] = useState();
  const [piker1, setPiker1] = useState();

//********************************** */

  const [date, setDate] = useState(new Date(1598051730000));
  const [time, setTime] = useState(new Date(1598051730000));
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showTimepicker, setShowTimepicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
  };

  //********************************************* */

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
            <Title>Nova Coleta</Title>
            <Title style={{ fontSize: 14, }}>Preencha corretamente o formulário</Title>
            <Divider style={{ marginBottom: 10, paddingBottom: 2 }} />

            <Form>
              <Item rounded last style={{ marginBottom: 10, height: 50 }}>
                <Label>Data</Label>
                {showDatepicker && (
                  <DateTimePicker
                    testID="datePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                  />
                )}
              </Item>

              <Item rounded last style={{ marginBottom: 10, height: 50 }} onPress={() => {setShowTimepicker(true)}}>
                <Label>Hora</Label>
                {showTimepicker && (
                  <DateTimePicker
                    testID="timePicker"
                    value={time}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTime}
                  />
                )}
              </Item>

              <Item rounded last style={{ marginBottom: 10 }}>
                <Picker
                  mode="dropdown"
                  note
                  selectedValue={piker1}
                  onValueChange={e => setPiker1(e)}
                >
                  <Picker.Item label="Cliente" />
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
                </Picker>
              </Item>

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

              <Item rounded last style={{ marginBottom: 10 }}>
                <Input multiline
                  placeholder='Observação'
                 />
              </Item>

              {/* <ListItem>
                <CheckBox checked={true} color="green" />
                <Body>
                  <Text style={{ color: '#fff' }}>Coleta finalizada</Text>
                </Body>
              </ListItem> */}

              <ListItem>
                <Left>
                  <Text>Coleta agendada</Text>
                </Left>
                <Right>
                  <Radio selected={true} color="green" selectedColor='#1a1' />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Coleta finalizada</Text>
                </Left>
                <Right>
                  <Radio selected={false} color="green" />
                </Right>
              </ListItem>

              <Button rounded success style={{ flex: 1, justifyContent: 'center', marginTop: 20}}>
                <Text>Salvar</Text>
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

export default NovaColetaScreen;
