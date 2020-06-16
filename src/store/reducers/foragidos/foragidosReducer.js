/***  types.js */
export const INDEX_FORAGIDOS = "INDEX_FORAGIDOS";
// export const LOGOUT = "LOGOUT";

/*** Initial_State */
export const Initial_State = {
  foragidos: ['testeeee'],
};

/***  reducer.js */
const foragidosReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case INDEX_FORAGIDOS:
      return { foragidos: [...action.dados_api] };
    // case LOGOUT:
    //   return { auth: { ...state.auth, cpf: null, token: null, isLogged: false }};
    
    default:
      return state;
  }
};

/***  actions.js */

export const index_foragidos = (dados_api) => { return { type: INDEX_FORAGIDOS, dados_api }};
// export const logoutAction = () =>  { return { type: LOGOUT }};

export default foragidosReducer;
