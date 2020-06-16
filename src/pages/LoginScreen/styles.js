import { StyleSheet } from 'react-native'
import { theme_default, theme_dark } from '../../theme'

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme_dark.colors.drawer
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  titulo: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold'
  },
  subtitulo: {
    color: '#fff',
    fontSize: 15,
  },
  subtitulo2: {
    marginTop: 30,
    color: '#fff',
    fontSize: 25,
  },
  container: {
    flex: 1,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingTop: 40
  },
  itemInput: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
  },
  input: {
    width: '90%',
    fontSize: 17,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 30,
    marginBottom: 15,
  },
  btnLogin: {
    width: '90%',
    height: 45,
    backgroundColor: '#3f512b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  loginText: {
    color: '#fff'
  },
  btnSolicitaAcesso: {

  },
  solicitaAcessoText: {
    marginTop: 15,
    color: '#fff'
  },
  image: {
    margin: 20,
    padding: 30,
    width: 350,
    height: 370
  }

})

export default styles;