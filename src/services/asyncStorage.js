// import AsyncStorage from '@react-native-community/async-storage';
// import { logoutAction } from '../store/reducers/auth/authReducer';



// export const setSession = async (chave, valor) => {
//     await AsyncStorage.setItem(`@SIPEforagidos:${chave}`, valor)
//     console.log(`${chave} gravado com sucesso no AsyncStorage!`)
//   };

// // export const getSession = async (chave) => {
// //     const valor = await AsyncStorage.getItem(`@SIPEforagidos:${chave}`)
// //     console.log(`${chave}: ${valor}`)
// //     // console.log(valor)
// //     return valor
// //   };


//   export async function getSession(chave){
//     const valor = await AsyncStorage.getItem(`@SIPEforagidos:${chave}`)
//     console.log(`${chave}: ${valor}`)
//     // console.log(valor)
//     return valor
//   };



// export const user_cpf = async () => await getSession('usuario_cpf')
// export const user_token = async () => await getSession('usuario_token')