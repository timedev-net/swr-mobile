
import React from 'react';
import {View, Button, Text, StatusBar} from 'react-native'

function HomeScreen({ navigation }) {
  // const [count, setCount] = React.useState(0);

  // React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //         headerRight: () => (
  //             <Button onPress={() => setCount(c => c + 1)} title="Update count" />
  //         ),
  //     });
  // }, [navigation, setCount]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/*<StatusBar barStyle="dark-content" />*/}
      <Text>Home da COMISSÃO</Text>
      {/*<Text>Count: {count}</Text>*/}
      {/*<Button*/}
      {/*    title="Vá para Detalhes"*/}
      {/*    onPress={() => navigation.navigate('Details', {*/}
      {/*        itemId: 86,*/}
      {/*        otherParam: 'anything you want here',*/}
      {/*    })}*/}
      {/*/>*/}
    </View>
  );
}

export default HomeScreen;
