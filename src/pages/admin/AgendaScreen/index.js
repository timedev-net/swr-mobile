
import React, { useEffect, useState } from 'react';
import { View, Button, Text, StatusBar, ScrollView, Image, SafeAreaView, VirtualizedList, FlatList } from 'react-native'
import { Appbar, Card, Button as Button2 } from 'react-native-paper';
import { theme_default, theme_dark } from '../../../theme'
import { Icon } from 'react-native-elements'
import styles from './styles'
import { Snackbar } from 'react-native-paper';
import { Avatar, Title, Paragraph, Divider, Surface } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { api_coleta, api_coleta_produto } from '../../../services/api'
import { useSelector } from 'react-redux';
import { Button as Button3 } from 'native-base';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


function AgendaScreen({ navigation, snackbar }) {

  const [count, setCount] = useState(0);
  const [snack, setSnack] = useState(false);
  const auth = useSelector(state => state.auth)

  // goBack = () => console.log('Went back');
  // handleSearch = () => console.log('Searching');
  // const handleMore = () => console.log('Shown more');



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
      const res = await axios.get(api_coleta, {
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

  // useEffect(() => {
  //   teste()
  // }, []);


  const DATA = ['teste','s3'];

  const getItem = (data, index) => {
    return {
      id: Math.random().toString(12).substring(0),
      title: `Item ${index+1}`
    }
  }

  const getItemCount = (data) => {
    return 70;
  }

  const getHeader = (<Appbar.Header style={{ justifyContent: 'space-between', backgroundColor: '#fff' }}>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      <Image style={{ width: 191, height: 36 }} source={require('../../../assets/logos/topbar-verde.png')} />
      <Appbar.Action />
    </Appbar.Header>)
  

  return (<>{getHeader}
        <Agenda
          // The list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key has to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={{
            '2020-06-17': [{"dateString": "2020-05-17", "day": 17, "month": 5, "timestamp": 1589673600000, "year": 2020}],
            '2020-06-23': [{name: 'item 2 - any js object', height: 80}],
            '2020-06-24': [],
            '2020-06-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}, {name: 'any js object'}]
          }}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={(month) => {console.log('trigger items loading')}}
          // Callback that fires when the calendar is opened or closed
          onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
          // Callback that gets called on day press
          onDayPress={(day)=>{console.log(day)}}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={(day)=>{console.log('day changed' + day)}}
          // Initially selected day
          selected={new Date()}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={12}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={20}
          //// Especifique como cada item deve ser renderizado na agenda
          renderItem={(item, firstItemInDay) => {return (<View style={{ marginTop: 50, borderBottomWidth: 1, borderColor: '#000', paddingLeft:10 }}><Text >{item.name}</Text></View>);}}
          //// Especifique como cada data deve ser renderizada. dia pode ser indefinido se o item não for o primeiro naquele dia
          // renderDay={(day, item) => {return (<View/>);}}
          // Specify how empty date content with no items should be rendered
          renderEmptyDate={() => {return (<View style={{ marginTop: 50, borderBottomWidth: 1, borderColor: '#000', paddingLeft:10 }}><Text>Sem Evento!</Text></View>);}}
          // Specify what should be rendered instead of ActivityIndicator
          renderEmptyData = {() => {return (<View><Text>Não há eventos nesta data</Text></View>);}}
          // Specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
        
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          markedDates={{
            '2020-06-16': {selected: true, marked: true},
            '2020-06-17': {marked: true},
            '2020-06-18': {disabled: true}
          }}
          // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
          // disabledByDefault={true}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          onRefresh={() => console.log('refreshing...')}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Agenda container style
          style={{ backgroundColor: 'red' }}
        />
        </>
  );
}

export default AgendaScreen;