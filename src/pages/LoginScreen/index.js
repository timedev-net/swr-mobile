
import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, Text, Image, TextInput, StyleSheet, TouchableOpacity, Animated} from 'react-native'
// import { Container, Header, Content, Item, Input, Button, Text } from 'native-base';
import styles from './styles'
import api from '../../services/api'
import { bindActionCreators } from 'redux';
import * as authActions from '../../store/reducers/auth/authReducer';
import { connect, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { auth_login, api_interno_foragidos, header_sem_token } from  '../../services/api'
import axios from 'axios';
import { Snackbar } from 'react-native-paper';
import { setSession, getSession } from '../../services/asyncStorage'

function LoginScreen({ navigation, route, loginAction, logoutAction }) {
  // const { itemId, otherParam } = route.params;
  const [offset, setOffset] = useState(new Animated.ValueXY({x: 0, y: 95}))
  const [opacity] = useState(new Animated.Value(0))
  const [snack, setSnack] = useState(false);

  const formik = useFormik({
    initialValues: {
      cpf: "",
      senha: "",
    },
    validationSchema: yup.object({
      cpf: yup.string().required("Campo obrigatório").min(14, 'O campo deve conter 11 dígitos'),
      senha: yup.string().required("Campo obrigatório"),
    })
  });
  
  async function login(){
    try{
      const resposta = await axios.post(auth_login, {
        "cpf": formik.values.cpf,
        "password": formik.values.senha
      })  
      if (resposta.data.user.active == 1) {
        // aqui a gente armazena no asyncStorage o token recebido na autenticação 

        resposta.data.data.token && await AsyncStorage.setItem('@SIPEforagidos:usuario_token', resposta.data.data.token)
        formik.values.cpf        && await AsyncStorage.setItem('@SIPEforagidos:usuario_cpf', formik.values.cpf)
      }
      loginAction(formik.values.cpf, resposta.data.data.token, resposta.data.user.active == 1? true : false)
    } catch {
      setSnack(true)
    }
  }


  async function solicitaAcesso() {
    console.log('solicita acesso')
    const teste = await AsyncStorage.getItem('@SIPEforagidos:usuario_token')
    console.log(teste)
    await AsyncStorage.clear()
    logoutAction()
    const teste2 = await AsyncStorage.getItem('@SIPEforagidos:usuario_token')
    console.log(teste2)
  }

  // useEffect(() => {
  //   return () => {
  //     setSnackbar(true)
  //   }
  // },[])


  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 1,
        // bounciness: 20,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      })
    ]).start()
  }, [])

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
      <Image style={styles.image} source={require('../../assets/logotipo-vertical-branco.png')} />
        {/* <Text style={styles.titulo}>SIPE</Text>
        <Text style={styles.subtitulo}>Sistema de Informação Penitenciária - SEJUS</Text>
        <Text style={styles.subtitulo2}>FORAGIDOS</Text>
        <Text style={styles.subtitulo}>Consultas e Denúncias</Text> */}
      </View>
      <Animated.View style={[styles.container, {
        opacity: opacity,
        transform: [
          { translateY: offset.y }
        ]
      }]}>
          <TextInput style={styles.input} placeholder='CPF' autoCorrect={false} onChangeText={(value) => {formik.setFieldValue('cpf', value)}} />
          <TextInput style={styles.input} placeholder="Senha" autoCorrect={false} onChangeText={(value) => {formik.setFieldValue('senha', value)}} />
        <TouchableOpacity onPress={login} style={styles.btnLogin} rounded light>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSolicitaAcesso} rounded light>
          <Text  onPress={solicitaAcesso} style={styles.solicitaAcessoText}>Solicitar acesso</Text>
        </TouchableOpacity>
      </Animated.View>
      <Snackbar visible={snack} onDismiss={() => setSnack(false)} style={{backgroundColor: 'red'}}>
          <Text style={{color: '#fff'}}>Senha ou CPF não conferem, tente novamente!</Text>
        </Snackbar>
    </KeyboardAvoidingView>
  );
}

// export default LoginScreen;

const mapStateToProps = state => (state.auth);
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);