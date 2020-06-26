/***  types.js */
export const INDEX_COLETA = "INDEX_COLETA";
// export const LOGOUT = "LOGOUT";

/*** Initial_State */
export const Initial_State = {
  dados_api: [],
};

/***  reducer.js */
const coletaReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case INDEX_COLETA:
      return { dados_api: [...action.dados_api] };
    // case LOGOUT:
    //   return { auth: { ...state.auth, cpf: null, token: null, isLogged: false }};
    
    default:
      return state;
  }
};

/***  actions.js */

export const index_coleta = (dados_api) => { return { type: INDEX_COLETA, dados_api }};

export default coletaReducer;
