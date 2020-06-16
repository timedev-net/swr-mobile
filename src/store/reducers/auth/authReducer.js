/***  types.js */
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

/*** Initial_State */
export const authDefault = {
  auth: {
    cpf: null,
    token: null,
    isLogged: false,
    isUserAcive: true,
  },
  snackbar: {
    login: false,
  }
};

/***  reducer.js */
const authReducer = (state = authDefault, action) => {
  switch (action.type) {
    case LOGIN:
      return { auth: { ...state.auth, cpf: action.cpf, token: action.token, isLogged: 'admin', isUserAcivePerfil: action.isUserAcivePerfil }, snackbar: {login: true}};
    case LOGOUT:
      return { auth: { ...state.auth, cpf: null, token: null, isLogged: false }};
    
    default:
      return state;
  }
};

/***  actions.js */

export const loginAction = (cpf, token, isUserAcive) => { return { type: LOGIN, cpf, token, isUserAcive }};
export const logoutAction = () =>  { return { type: LOGOUT }};

export default authReducer;
