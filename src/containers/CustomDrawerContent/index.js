
import React from 'react';
import { View, Text, Image } from 'react-native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    DrawerView,
    DrawerContent,
  } from '@react-navigation/drawer';
import styles from './styles'
import { bindActionCreators } from 'redux';
import * as authActions from '../../store/reducers/auth/authReducer';
import { connect, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import DetalhesScreenAdmin from "../../pages/admin/ForagidosScreen/DetalhesScreen";



import Logo from "../../components/LogoTitle"

function CustomDrawerContent(props) {
  const {logoutAction} = props

  async function btnLogout(){
    await AsyncStorage.clear()
    logoutAction()
  }

    return (
      <>
        <View style={styles.cabecalho}>
          <Image style={styles.image} source={require('../../../src/assets/logotipo-vertical-verde.png')} />
          {/* <Text style={styles.text1}>SIPE</Text> */}
          {/* <Text style={styles.text2}>Sistema de Informação Penitenciária</Text> */}
          {/* <Logo /> */}
        </View>
        <DrawerContentScrollView {...props} style={styles.colorDrawer}>
          <DrawerItemList {...props} labelStyle={styles.colorText} />
          <DrawerItem label="Sair" onPress={btnLogout} labelStyle={{ color: '#fff'}} />

          {/* <DrawerItem label="Sair" onPress={btnLogout} labelStyle={{ color: '#fff'}} /> */}
          {/* <DrawerItem name="Detalhes" component={DetalhesScreenAdmin} /> */}

        </DrawerContentScrollView>
      </>
    );
  }


  // export default CustomDrawerContent

const mapStateToProps = state => (state.auth);
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);