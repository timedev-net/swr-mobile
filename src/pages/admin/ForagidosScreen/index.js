
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StatusBar, ScrollView, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { Appbar, Avatar, Button, Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import { theme_default, theme_dark } from '../../../theme'
import axios from 'axios'
import { api_interno_foragidos } from '../../../services/api'
import { useSelector, useDispatch } from 'react-redux';
import { index_foragidos } from '../../../store/reducers/foragidos/foragidosReducer'
import moment from 'moment';
import { ActivityIndicator, Colors } from 'react-native-paper';
// import ForagidosRoutes from '../../../routes/foragidos.routes'
// import { createStackNavigator } from '@react-navigation/stack';
// import DetalhesScreenAdmin from "../DetailsScreen";

// const Stack = createStackNavigator();

function ForagidosScreen(props) {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState();
  // const [showSearch, setShowSearch] = useState(false);

  const auth = useSelector(state => state.auth)
  const foragidos = useSelector(state => state.foragidos)
  const dispatch = useDispatch()

  // const teste_dados = 'novo dado'

  const add_dados_store = useCallback((dados) => {
    dispatch(index_foragidos(dados))
  }, [dispatch])

  const goBack = () => console.log('Went back');
  // const handleSearch = () => {
  //   setShowSearch(!showSearch)
  //   if (showSearch === false) {
  //     setSearchQuery()
  //   }
  //   console.log('Searching')
  // };
  const handleMore = () => console.log('Shown more');

  const carrega_dados_api = async () => {
    try {
      const res = await axios.get(api_interno_foragidos, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `bearer ${auth.auth.token}`
        }
      })
      add_dados_store(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  };

  async function botao() {
    carrega_dados_api()
  }

  async function detalhes(foragido) {
    // console.log(foragido)
    navigation.navigate('Detalhes', foragido)
    // navigation.push('Tela')
  }


  useEffect(() => {
    carrega_dados_api()
    // console.log(foragidos)
    // console.log(theme_dark.colors.background)
  }, []);

  // useEffect(() => {
  //   console.log(searchQuery)
  // }, [searchQuery]);

  return isLoading ? (


    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: theme_dark.colors.background }}>
      <ActivityIndicator animating={true} color={Colors.red800} size={"large"} />
    </View>) :
    (
      <View style={{ flex: 1, backgroundColor: theme_dark.colors.background }}>
        <Appbar.Header>
          {/* <Appbar.BackAction onPress={goBack} /> */}
          <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
          <Appbar.Content title="Foragidos" subtitle="SIPE - Sistema de Informação Penitenciária" />
          {/* <Appbar.Action icon="magnify" onPress={handleSearch}/> */}
          <Appbar.Action icon="dots-vertical" onPress={handleMore} />
        </Appbar.Header>
        <ScrollView>
          <Searchbar style={{ marginTop: 10 }} placeholder="Pesquisar" onChangeText={(value) => setSearchQuery(value)} value={searchQuery} />
          {searchQuery ? foragidos.foragidos.filter((value) => value.apenado.nomeapenado.toLowerCase().includes(searchQuery.toLowerCase())).map((foragido, idx) => (
            <Card key={idx} style={{ marginHorizontal: 15, marginTop: 20 }}>
              <Card.Content>
                <Title style={{ fontSize: 16 }}>{foragido.apenado?.nomeapenado ? foragido.apenado.nomeapenado : null}</Title>
                <Paragraph style={{ marginBottom: 10 }}>Foragido desde {moment(foragido.datafuga).format('DD/MM/YYYY')}</Paragraph>
              </Card.Content>
              <Card.Cover source={foragido.apenado.foto ? { uri: foragido.apenado.foto.arquivo_foto } : require('../../../assets/user.png')} />
              <Card.Actions>
                <Button onPress={() => detalhes(foragido)}>Detalhes</Button>
                <Text style={{ color: "#fff", marginRight: 10 }}>{foragido.tipo == 10 ? 'FUGA' : 'EVASÃO'}</Text>
              </Card.Actions>
            </Card>
          )) : foragidos.foragidos.map((foragido, idx) => (
            <Card key={idx} style={{ marginHorizontal: 15, marginTop: 20 }}>
              <Card.Content>
                <Title style={{ fontSize: 16 }}>{foragido.apenado?.nomeapenado ? foragido.apenado.nomeapenado : null}</Title>
                <Paragraph style={{ marginBottom: 10 }}>Foragido desde {moment(foragido.datafuga).format('DD/MM/YYYY')}</Paragraph>
              </Card.Content>
              <Card.Cover source={foragido.apenado.foto ? { uri: foragido.apenado.foto.arquivo_foto } : require('../../../assets/user.png')} />
              {/* <Image style={{ width: 90, height: 90 }} source={require('../../../assets/g1304.png')} /> */}
              <Card.Actions style={{ justifyContent: 'space-between' }}>
                <Button onPress={() => detalhes(foragido)}>Detalhes</Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      </View>
    )
}

export default ForagidosScreen;
