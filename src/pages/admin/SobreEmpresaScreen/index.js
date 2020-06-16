
import React, {useEffect, useState} from 'react';
import {View, Button, Text, StatusBar, ScrollView, Image} from 'react-native'
import { Appbar, Card, Button as Button2 } from 'react-native-paper';
import { theme_default, theme_dark } from '../../../theme'
import { Icon } from 'react-native-elements'
import styles from './styles'
import { Snackbar } from 'react-native-paper';
import { Avatar, Title, Paragraph, Divider, Surface } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { api_interno_foragidos } from  '../../../services/api'
import { useSelector } from 'react-redux';


function SobreEmpresaScreen({ navigation, snackbar }) {

  const auth = useSelector(state => state.auth)

  // goBack = () => console.log('Went back');
  // handleSearch = () => console.log('Searching');
  const handleMore = () => console.log('Shown more');


    return (
      <View style={styles.colorBackground}>

      <Appbar.Header style={{ justifyContent: 'space-between', backgroundColor: theme_dark.colors.drawer }}>
        {/* <Appbar.BackAction onPress={goBack} /> */}
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Image style={{ width: 191, height: 36 }} source={require('../../../assets/logos/topbar-verde.png')} />
        {/* <Appbar.Content title="WR Ambiental" subtitle="Sistema de cadastro de coletas"/> */}
        {/* <Appbar.Action icon="magnify" onPress={handleSearch}/> */}
        <Appbar.Action icon="dots-vertical" onPress={handleMore} />
      </Appbar.Header>

      <ScrollView style={{ padding: 10 }}>
        {/* <Title>Saiba mais sobre a Empresa</Title> */}
        <Card style={{ marginHorizontal: 15, marginTop: 20 }}>
          <Card.Cover source={{ uri: 'http://www.nueva-iso-14001.com/wp-content/uploads/2018/10/pol%C3%ADtica-ambiental.jpg' }} />
          <Card.Content style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: theme_dark.colors.drawer }}>

            <Title style={{ fontSize: 16, }}>O que é a WR Ambiental?</Title>
            <Divider style={{ marginBottom: 10, paddingBottom: 2 }} />

            <Text style={styles.justifyText}>
              <Paragraph>{"\t"}{"\t"}{"\t"}{"\t"}A WR Ambiental é uma empresa de gestão ambiental que auxilia o comércio e o meio ambiente a gerenciar o lixo e dejetos recicláveis,
transformando-os em novas matéria prima e destinando-os a reutilização.</Paragraph>
              <Paragraph>{"\n"}{"\n"}{"\t"}{"\t"}{"\t"}{"\t"}O Sistema SWR foi desenvolvido para atender a logística de coleta e destinação, bem como gerenciar e controlar todo o processo de transformação dos resíduos recicláveis. As informações do SWR são utilizados internamente pela Diretoria e seus colaboradores.{"\n"}</Paragraph>
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
    );
}

export default SobreEmpresaScreen;