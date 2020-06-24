
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
import { api_cliente, api_produto, api_medidas } from '../../../../services/api'
import { useSelector } from 'react-redux';
import { Container, Header, Content, Form, Picker, Text, Item, Input, Label, CheckBox, Body, ListItem, Radio, Right, Left, Button } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from '../../../../containers/DatePicker'
import moment from 'moment'
import { useFormik } from 'formik';
import * as yup from 'yup';
import MaskedInput from 'react-text-mask';
import { dateToSQL } from '../../../../helpers/dates';
import { isEmpty } from '../../../../helpers/isEmpty'

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      guide={false}
      mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function NovaColetaScreen({ navigation, snackbar }) {

  const auth = useSelector(state => state.auth)
  // const [snack, setSnack] = useState(false);
  // const [date, setDate] = useState();
  const [piker1, setPiker1] = useState();
  const [dadosCliente, setDadosCliente] = useState();
  const [dadosProduto, setDadosProduto] = useState();
  const [dadosMedida, setDadosMedida] = useState();

  const formik = useFormik({
    initialValues: {
      data: "",
      hora: "",
      cliente_id: "",
      user_id: "",
      observacao: "",
      agendado: "",
      coletado: "",
      produto_id: "",
      quantidade: "",
      tipo_medida_id: "",
      custo: "",
    },
    validationSchema: yup.object({
      // data_sind: yup.string().required("Campo obrigatório"),
      observacao: yup.string().required("Campo obrigatório").min(19, 'O campo deve conter 16 dígitos'),
    })
  });

//********************************** */

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
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


  const buscaDados = async () => {
    try {
      const res_cliente = await axios.get(api_cliente, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `bearer ${auth.auth.token}`
        }
      })
      setDadosCliente(res_cliente.data)
      
      const res_produto = await axios.get(api_produto, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `bearer ${auth.auth.token}`
        }
      })
      setDadosProduto(res_produto.data)

      const res_medidas = await axios.get(api_medidas, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `bearer ${auth.auth.token}`
        }
      })
      setDadosMedida(res_medidas.data)
    } catch (error) {
      console.log(error)
    }
  };

  const handleSubmit = () => {
    // formik.handleSubmit()
    formik.setFieldTouched('observacao', true)
    if (!isEmpty(formik.touched)) {
      if (isEmpty(formik.errors)){
        console.log('SUBMIT')
      }
    }
    
  
    
  }

  const getToken = async () => {
    const token = await AsyncStorage.getItem('@SWR:usuario_token')
    console.log(token)
  };

  useEffect(() => {
    buscaDados()
  }, [])

  useEffect(() => {
    // console.log(formik.values)
    console.log(formik.touched)
  }, [formik])

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
              <Item rounded last style={{ marginBottom: 10, height: 50 }} onPress={showTimepicker}>
                <Label onPress={showDatepicker}>{moment(date+'').format('DD/MM/YYYY')+' -'}</Label>
                <Label onPress={showTimepicker}>{moment(date+'').format('h:mm')+' hs'}</Label>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
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
                  <Picker.Item label="Selecione o cliente" />
                  {dadosCliente && dadosCliente.map((cliente, idx) => (
                    <Picker.Item key={cliente.id} label={cliente.nome} value={cliente.id} />
                  ))}
                </Picker>
              </Item>

              <Item rounded last style={{ marginBottom: 10 }}>
                <Picker
                  mode="dropdown"
                  note
                  selectedValue={piker1}
                  onValueChange={e => setPiker1(e)}
                >
                  <Picker.Item label="Selecione o produto"/>
                  {dadosProduto && dadosProduto.map((prod, idx) => (
                    <Picker.Item key={prod.id} label={prod.nome} value={prod.id} />
                  ))}
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
                  <Picker.Item label="Selecione a unidade de medida" />
                  {dadosMedida && dadosMedida.map((medida, idx) => (
                    <Picker.Item key={medida.id} label={medida.nome_tipo} value={medida.id} />
                  ))}
                </Picker>
              </Item>

              <Item rounded last style={{ marginBottom: 10 }}>
                <Input keyboardType='number-pad' placeholder='Custo' />
              </Item>

              <Item rounded last error={formik.errors.observacao ? true : false} style={{ marginBottom: 10 }}>
                <Input multiline
                  placeholder='Observação'
                  name='observacao'
                  value={formik.values.observacao}
                  onChangeText={formik.handleChange('observacao')}
                  onBlur={formik.handleBlur('observacao')}
                 />
              </Item>
              {formik.errors.observacao && <Label style={{ color: 'red', marginLeft: 10, fontSize: 14}}>{formik.errors.observacao}</Label>}

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

              <Button rounded success style={{ flex: 1, justifyContent: 'center', marginTop: 20}} onPress={handleSubmit}>
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
