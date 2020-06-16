
import React, {useEffect, useState, useCallback} from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { Appbar, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { theme_default, theme_dark } from '../../../../theme'
// import axios from 'axios'
// import { api_interno_foragidos } from  '../../../services/api'
// import { useSelector, useDispatch } from 'react-redux';
// import { index_foragidos } from '../../../store/reducers/foragidos/foragidosReducer'
import moment from 'moment';



function DetalhesScreen(props) {
  const { navigation, route } = props

  // useEffect(() => {
  //   console.log(route.params)
  // }, [route])


    return (
      <View style={{ flex: 1, backgroundColor: theme_dark.colors.background }}>
        <Appbar.Header>
          {/* <Appbar.BackAction onPress={goBack} /> */}
          <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()}/>
          <Appbar.Content title="Foragidos" subtitle="SIPE - Sistema de Informação Penitenciária"/>
          {/* <Appbar.Action icon="magnify" onPress={handleSearch}/> */}
          {/* <Appbar.Action icon="dots-vertical" onPress={handleMore}/> */}
        </Appbar.Header>
        <ScrollView>
         {/* <Title>Página de detalhes</Title> */}
         <Card style={{ marginHorizontal: 15, marginTop: 20 }}>
              <Card.Cover source={{ uri: 'http://4.bp.blogspot.com/_PDfcUfpSbws/TO-QY3QE9dI/AAAAAAAABI0/Wy1zRHVFP18/s1600/estoy_preso.jpg' }} />
              <Card.Content style={{padding: 10}}>
                <Title style={{ fontSize: 16, textAlign: 'center' }}>{route.params.apenado?.nomeapenado? route.params.apenado.nomeapenado : null}</Title>
                <Paragraph>Nome Falso: {route.params.apenado.nomefalso ? route.params.apenado.nomefalso : ' não cadastrado'}</Paragraph>
                <Paragraph>Nascido em: {route.params.apenado.datanascimento? moment(route.params.apenado.datanascimento).format('DD/MM/YYYY') : ' não cadastrado'}</Paragraph>
                <Paragraph>Foragido desde: {moment(route.params.datafuga).format('DD/MM/YYYY')}</Paragraph>
                <Paragraph>Unidade: {route.params.movimentacao.unidade.nomeunidade}</Paragraph>
                {/* <Paragraph>Descrição: {route.params.descricaofuga}</Paragraph> */}
                {/* <Paragraph>RG: {route.params.apenado.rg ? route.params.apenado.rg : ' não cadastrado'}</Paragraph> */}
                {/* <Paragraph>CPF: {route.params.apenado.cpf ? route.params.apenado.cpf : ' não cadastrado'}</Paragraph> */}
                <Paragraph>Pai: {route.params.apenado.nomepai ? route.params.apenado.nomepai : ' não cadastrado'}</Paragraph>
                <Paragraph>Mãe: {route.params.apenado.nomemae ? route.params.apenado.nomemae : ' não cadastrado'}</Paragraph>
                
              </Card.Content>
            </Card>
        </ScrollView> 
      </View>
    );
}

export default DetalhesScreen;
