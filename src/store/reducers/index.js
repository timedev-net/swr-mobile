import { combineReducers } from 'redux';
import auth from './auth/authReducer'
import foragidos from './foragidos/foragidosReducer'

export default combineReducers({
  auth,
  foragidos,
})
