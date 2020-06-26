import { combineReducers } from 'redux';
import auth from './auth/authReducer'
import coleta from './coleta/coletaReducer'

export default combineReducers({
  auth,
  coleta,
})
