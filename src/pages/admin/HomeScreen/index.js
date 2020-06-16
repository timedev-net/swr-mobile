
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


function HomeScreen({ navigation, snackbar }) {

  const [count, setCount] = useState(0);
  const [snack, setSnack] = useState(false);
  const auth = useSelector(state => state.auth)

  // goBack = () => console.log('Went back');
  // handleSearch = () => console.log('Searching');
  const handleMore = () => console.log('Shown more');



  useEffect(() => {
    setSnack(true)
  }, [snackbar]);

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
    const token = await AsyncStorage.getItem('@SIPEforagidos:usuario_token')
    console.log(token)
  };

    return (
      <View style={styles.colorBackground}>
      
        <Appbar.Header>
          {/* <Appbar.BackAction onPress={goBack} /> */}
          <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()}/>
          <Appbar.Content title="SIPE" subtitle="Sistema de Informação Penitenciária"/>
          {/* <Appbar.Action icon="magnify" onPress={handleSearch}/> */}
          <Appbar.Action icon="dots-vertical" onPress={handleMore}/>
        </Appbar.Header>
      
        <View style={{ padding: 10}}>
          <Surface style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{
                  width: '90%',
                  height: '90%'
                }} source={require('../../../assets/g1304.png')} />
                <Title style={{ fontSize: 25,  }}>FORAGIDOS</Title>
          </Surface>
        
         {/* <Title>Página de detalhes</Title> */}
         {/* <Card style={{ marginHorizontal: 15, marginTop: 20 }}> */}
              {/* <Card.Cover source={{ uri: 'http://4.bp.blogspot.com/_PDfcUfpSbws/TO-QY3QE9dI/AAAAAAAABI0/Wy1zRHVFP18/s1600/estoy_preso.jpg' }} /> */}
              {/* <Card.Content style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}> */}
              
                {/* <Title style={{ fontSize: 16,  }}>O que é o SIPE?</Title>
                <Divider style={{ marginBottom: 10, paddingBottom: 2 }}/>
                
                <Text style={styles.justifyText}>
                  <Paragraph>{"\t"}{"\t"}{"\t"}{"\t"}O SIPE é um sistema de gestão prisional que auxilia as unidades prisionais do Estado de Rondônia a gerenciar suas demandas, cadastrar,
controlar transferências, processos e demais atividades relacionadas ao sistema carcerário do Estado.</Paragraph>
                  <Paragraph>{"\n"}{"\n"}{"\t"}{"\t"}{"\t"}{"\t"}O Sistema é desenvolvido pela Gerência de Tecnologia da Informação – GEINFO desde 2018, e foi projetado para atender às unidades prisionais, a Gerência de Informação e Inteligência, a Coordenadoria e diveros setores internos da Secretaria de Justiça do Estado de Rondônia. As informações do SIPE também podem ser utilizados pelos seguintes orgãos:{"\n"}</Paragraph>
                </Text>
                <Paragraph>- Ministério da Justiça;</Paragraph>
                <Paragraph>- Tribunal de Justiça do Estado de Rondônia / Oficiais de Justiça;</Paragraph>
                <Paragraph>- Tribunal Regional Federal 1ª Região;</Paragraph>
                <Paragraph>- Secretaria Estadual de Segurança Defesa e Cidadania;</Paragraph>
                <Paragraph>- Polícia Militar do Estado de Rondônia;</Paragraph>
                <Paragraph>- Polícia Civil do Estado de Rondônia;</Paragraph>
                <Paragraph>- Polícia Federal do Brasil;</Paragraph>
                <Paragraph>- Polícia Rodoviária Federal do Brasil;</Paragraph>
                <Paragraph>- Agência Brasileira de Inteligência;</Paragraph>
                <Paragraph>- Departamento Penitenciário Federal;</Paragraph> */}
                

                
              {/* </Card.Content> */}
            {/* </Card> */}
        </View> 


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

export default HomeScreen;

// const mapStateToProps = state => (state.auth);
// const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch);
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
