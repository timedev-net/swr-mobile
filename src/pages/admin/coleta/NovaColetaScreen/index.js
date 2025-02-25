
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
import { api_cliente, api_produto, api_medidas, api_coleta } from '../../../../services/api'
import { useSelector } from 'react-redux';
import { Container, Header, Content, Form, Picker, Text, Item, Input, Label, CheckBox, Body, ListItem, Radio, Right, Left, Button } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from '../../../../containers/DatePicker'
import moment from 'moment'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { isEmpty, moneyToAPI, qtdToAPI } from '../../../../helpers'
import { mask, unMask as uMask } from 'remask'
import VMasker, { toMoney, toPattern, maskMoney, toNumber, unMask } from 'vanilla-masker'
import { index_coleta } from '../../../../store/reducers/coleta/coletaReducer';
import { useDispatch } from 'react-redux';


function NovaColetaScreen({ navigation, snackbar }) {

  const auth = useSelector(state => state.auth)
  const storeRedux = useSelector(state => state)
  const dispatch = useDispatch()
  // const [snack, setSnack] = useState(false);
  // const [date, setDate] = useState();
  const [piker1, setPiker1] = useState();
  const [dadosCliente, setDadosCliente] = useState();
  const [dadosProduto, setDadosProduto] = useState();
  const [dadosMedida, setDadosMedida] = useState();

  const formik = useFormik({
    initialValues: {
      data: moment(new Date()).format('YYYY-MM-DD'),
      hora: moment(new Date()).format('hh:mm:ss'),
      cliente_id: "",
      observacao: "",
      agendado: 1,
      coletado: 0,
      produto_id: "",
      quantidade: "",
      tipo_medida_id: "",
      custo: "",
    },
    validationSchema: yup.object({
      // data_sind: yup.string().required("Campo obrigatório"),
      cliente_id: yup.string().required("Campo obrigatório"),
      produto_id: yup.string().required("Campo obrigatório"),
      quantidade: yup.string().required("Campo obrigatório"),
      tipo_medida_id: yup.string().required("Campo obrigatório"),
      custo: yup.string().required("Campo obrigatório"),
      // observacao: yup.string().required("Campo obrigatório"),
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
    formik.setFieldValue('data', moment(currentDate).format('YYYY-MM-DD'))
    formik.setFieldValue('hora', moment(currentDate).format('hh:mm:ss'))
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

  const handleSubmit = async () => {
    // formik.handleSubmit()
    const cpf = await AsyncStorage.getItem('@SWR:usuario_cpf')
    // const val = formik.values.hora
    // console.log(val)

    formik.setFieldTouched('cliente_id', true)
    formik.setFieldTouched('produto_id', true)
    formik.setFieldTouched('quantidade', true)
    formik.setFieldTouched('tipo_medida_id', true)
    formik.setFieldTouched('custo', true)
    if (!isEmpty(formik.touched)) {
      if (isEmpty(formik.errors)){
        console.log('SUBMIT')
        try {
          await axios.post(api_coleta, {
            data: moment(formik.values.data).format('YYYY-MM-DD'),
            hora: formik.values.hora,
            cliente_id: formik.values.cliente_id,
            usuario_cpf: cpf,
            observacao: formik.values.observacao,
            agendado: formik.values.agendado,
            coletado: formik.values.coletado,
            produto_id: formik.values.produto_id,
            quantidade: qtdToAPI(toNumber(formik.values.quantidade)),
            tipo_medida_id: formik.values.tipo_medida_id,
            custo: moneyToAPI(toNumber(formik.values.custo)),
          }, {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Authorization': `bearer ${auth.auth.token}`
            }
          })

        // recarrega os dados do state redux
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
        navigation.goBack()
      }
    }
  }

  useEffect(() => {
    buscaDados()
  }, [])

  // useEffect(() => {
  //   console.log(formik.values)
  //   // console.log(formik.touched)
  // }, [formik])

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
        <Card style={{ marginBottom: 20 }}>
          {/* <Card.Cover source={{ uri: 'http://www.nueva-iso-14001.com/wp-content/uploads/2018/10/pol%C3%ADtica-ambiental.jpg' }} /> */}
          <Card.Content style={{ backgroundColor: '#fff' }}>
            <Title>Nova Coleta</Title>
            <Title style={{ fontSize: 14, }}>Preencha corretamente o formulário</Title>
            <Divider style={{ marginBottom: 10, paddingBottom: 2 }} />

            <Form>
              <Item rounded last style={{ height: 50 }} onPress={showDatepicker}>
              <Label style={{ color: '#aaa'}} >Data e hora: </Label>
                <Label style={{ color: '#000'}} onPress={showDatepicker}>{moment(date+'').format('DD/MM/YYYY')+' -'}</Label>
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

              <Item rounded last style={{ marginTop: 10 }} error={formik.touched.cliente_id && formik.errors.cliente_id ? true : false}>
                <Picker style={{ color: '#000'}}
                  mode="dropdown"
                  note
                  selectedValue={formik.values.cliente_id}
                  onValueChange={e => formik.setFieldValue('cliente_id', e)}
                  onBlur={formik.handleBlur('cliente_id')}
                >
                  <Picker.Item label="Selecione o cliente" value={''} />
                  {dadosCliente && dadosCliente.map((cliente, idx) => (
                    <Picker.Item key={cliente.id} label={cliente.nome} value={cliente.id} />
                  ))}
                </Picker>
              </Item>
              {formik.touched.cliente_id && formik.errors.cliente_id && <Label style={{ color: 'red', marginLeft: 10, fontSize: 14}}>{formik.errors.cliente_id}</Label>}

              <Item rounded last style={{ marginTop: 10 }} error={formik.touched.produto_id && formik.errors.produto_id ? true : false}>
                <Picker style={{ color: '#000'}}
                  mode="dropdown"
                  note
                  selectedValue={formik.values.produto_id}
                  onValueChange={e => formik.setFieldValue('produto_id', e)}
                  onBlur={formik.handleBlur('produto_id')}
                >
                  <Picker.Item label="Selecione o produto" value={''}/>
                  {dadosProduto && dadosProduto.map((prod, idx) => (
                    <Picker.Item key={prod.id} label={prod.nome} value={prod.id} />
                  ))}
                </Picker>
              </Item>
              {formik.touched.produto_id && formik.errors.produto_id && <Label style={{ color: 'red', marginLeft: 10, fontSize: 14}}>{formik.errors.produto_id}</Label>}

              <Item rounded last style={{ marginTop: 10 }} error={formik.touched.quantidade && formik.errors.quantidade ? true : false}>
                <Label style={{ color: '#aaa'}} >Quantidade: </Label>
                <Input keyboardType='number-pad' placeholder='Quantidade'
                  name='quantidade'
                  value={`${toMoney(formik.values.quantidade, {
                    precision: 3,
                    separator: ',',
                    delimiter: '.',
                  })} ${dadosMedida && dadosMedida[formik.values.tipo_medida_id-1]?.nome_tipo? dadosMedida[formik.values.tipo_medida_id-1].nome_tipo : '' }`}
                  onChangeText={formik.handleChange('quantidade')}
                  onBlur={formik.handleBlur('quantidade')}
                  />
              </Item>
              {formik.touched.quantidade && formik.errors.quantidade && <Label style={{ color: 'red', marginLeft: 10, fontSize: 14}}>{formik.errors.quantidade}</Label>}

              <Item rounded last style={{ marginTop: 10 }} error={formik.touched.tipo_medida_id && formik.errors.tipo_medida_id ? true : false}>
                <Picker
                  mode="dropdown"
                  note
                  selectedValue={formik.values.tipo_medida_id}
                  onValueChange={e => formik.setFieldValue('tipo_medida_id', e)}
                  onBlur={formik.handleBlur('tipo_medida_id')}
                >
                  <Picker.Item label="Selecione a unidade de medida" value={''} />
                  {dadosMedida && dadosMedida.map((medida, idx) => (
                    <Picker.Item key={medida.id} label={medida.nome_tipo} value={medida.id} />
                  ))}
                </Picker>
              </Item>
              {formik.touched.tipo_medida_id && formik.errors.tipo_medida_id && <Label style={{ color: 'red', marginLeft: 10, fontSize: 14}}>{formik.errors.tipo_medida_id}</Label>}

              <Item rounded last style={{ marginTop: 10 }} error={formik.touched.custo && formik.errors.custo ? true : false}>
                <Label style={{ color: '#aaa'}} >Custo: </Label>
                <Input keyboardType='number-pad' placeholder='Custo'
                  name='custo'
                  value={toMoney(formik.values.custo, {
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: 'R$',
                  })}
                  onChangeText={formik.handleChange('custo')}
                  onBlur={formik.handleBlur('custo')}
                 />
              </Item>
              {formik.touched.custo && formik.errors.custo && <Label style={{ color: 'red', marginLeft: 10, fontSize: 14}}>{formik.errors.custo}</Label>}

              <Item rounded last style={{ marginTop: 10 }} error={formik.touched.observacao && formik.errors.observacao ? true : false}>
                <Input multiline
                  placeholder='Observação'
                  name='observacao'
                  value={formik.values.observacao}
                  onChangeText={formik.handleChange('observacao')}
                  onBlur={formik.handleBlur('observacao')}
                 />
              </Item>
              {formik.touched.observacao && formik.errors.observacao && <Label style={{ color: 'red', marginLeft: 10, fontSize: 14}}>{formik.errors.observacao}</Label>}

              <ListItem onPress={() => {formik.setFieldValue('agendado', 1), formik.setFieldValue('coletado', 0)}}>
                <Left>
                  <Text>Agendar coleta</Text>
                </Left>
                <Right>
                  <Radio selected={formik.values.agendado === 1 ? true : false} color="#e8c326" selectedColor='#e8c326' onPress={() => {formik.setFieldValue('agendado', 1), formik.setFieldValue('coletado', 0)}}/>
                </Right>
              </ListItem>
              <ListItem onPress={() => {formik.setFieldValue('agendado', 0), formik.setFieldValue('coletado', 1)}}>
                <Left>
                  <Text>Coletado agora</Text>
                </Left>
                <Right>
                  <Radio selected={formik.values.coletado === 1 ? true : false} color="#3c3" selectedColor='#3c3' onPress={() => {formik.setFieldValue('agendado', 0), formik.setFieldValue('coletado', 1)}} />
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
