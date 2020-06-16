import React, {useState, useEffect} from 'react';
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../containers/CustomDrawerContent'
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { loginAction, logoutAction } from '../store/reducers/auth/authReducer';
// import { connect, useDispatch } from 'react-redux';
import { theme_default, theme_dark } from '../theme'

// import AsyncStorage from '@react-native-community/async-storage';

// COMPONENTS
import LogoTitle from "../components/LogoTitle";
// PAGES PUBLIC
import LoginScreen from "../pages/LoginScreen";
import SplashScreen from "../pages/SplashScreen";
import UserNotActiveScreen from "../pages/UserNotActiveScreen";
// PAGES DE ADMIN
import HomeScreenAdmin from "../pages/admin/HomeScreen";
import ColetaScreenAdmin from "../pages/admin/ColetaScreen";
import DestinacaoScreenAdmin from "../pages/admin/DestinacaoScreen";
import SobreEmpresaScreenAdmin from "../pages/admin/SobreEmpresaScreen";
// import ForagidosScreenAdmin from "../pages/admin/ForagidosScreen";
// import ConsultaScreenAdmin from "../pages/admin/ConsultaScreen";
// import DenunciaScreenAdmin from "../pages/admin/DenunciaScreen";
// import DetailsScreenAdmin from "../pages/admin/DetailsScreen";
// import ProfileScreenAdmin from "../pages/admin/ProfileScreen";

// PAGES DE COMISSÃO
import HomeScreenComissao from "../pages/comissao/HomeScreen";

import HomeRoutes from './home.routes'
import ForagidosRoutes from './foragidos.routes'
import { useSelector, useDispatch } from 'react-redux';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Routes = () => {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [splashScreen, setSplashScreen] = useState(true)
  const [isLogged, setIsLogged] = useState(false)
  const [isUserAcive, setIsUserAcive] = useState(false)
  const [cpf, setCpf] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    auth.auth.isUserAcive? setIsUserAcive(true) : setIsUserAcive(false)
    auth.auth.isLogged === true? setIsLogged('admin') : setIsLogged(false)
  }, [auth.auth])

  const buscaSession = async () => {
    const user_cpf = await AsyncStorage.getItem(`@SWR:usuario_cpf`)
    const user_token = await AsyncStorage.getItem(`@SWR:usuario_token`)
    setCpf(user_cpf)
    setToken(user_token)
  }
 
  async function login(){
    if (token){
      dispatch(loginAction(cpf, token, true))
    }else {
      dispatch(logoutAction())
    }
  }
 
  useEffect(() => {
    buscaSession()
  }, [])

  useEffect(() => {
    login()
  }, [token])

  useEffect(() => {
    setIsLogged(auth.auth.isLogged)
    setIsUserAcive(auth.auth.isUserAcive)
    setTimeout(() => setSplashScreen(false), 2000)
  }, [auth.auth])

  return splashScreen ? <SplashScreen /> :
  
  isUserAcive ? isLogged !== null && isLogged === 'admin' ?
    // ROTAS DE ADMINISTRADOR
    (<>
      <NavigationContainer>
        <StatusBar barStyle="#fff" backgroundColor={theme_dark.colors.drawer} />
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={HomeScreenAdmin} />
          {/* <Drawer.Screen name="Foragidos1" component={ForagidosScreenAdmin} /> */}
          <Drawer.Screen name="Coleta" component={ColetaScreenAdmin} />
          {/* <Drawer.Screen name="Consulta" component={ConsultaScreenAdmin} options={{title: 'Consulta'}} /> */}
          <Drawer.Screen name="Destinação" component={DestinacaoScreenAdmin} />
          {/* <Drawer.Screen name="Detalhes" component={DetalhesScreenAdmin} /> */}
          <Drawer.Screen name="Sobre a Empresa" component={SobreEmpresaScreenAdmin} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
    ) :

    // ROTAS DE COMISSÃO
    isLogged === 'comissao' ?
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerStyle: {backgroundColor: '#A00',}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold',},}}>
          <Stack.Screen name="Home" component={HomeScreenComissao} />
        </Stack.Navigator>
      </NavigationContainer> :

  

          // ROTAS DE LOGIN E SOLICITAÇÃO DE CADASTRO
          (<LoginScreen />) :

    // ROTAS DE USUÁRIO DESATIVADO
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserNotActive" screenOptions={{headerStyle: {backgroundColor: '#AAA',}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold',},}}>
        <Stack.Screen name="UserNotActive" component={UserNotActiveScreen} options={{title: 'Tela de usuário NÃO ATIVADO',}} />
        {/*<Stack.Screen name="Cadastro" component={CadastroScreen} />*/}
      </Stack.Navigator>
    </NavigationContainer>;
}

export default Routes;