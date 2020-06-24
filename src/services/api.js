// import axios from 'axios';

// const baseUrl = process.env.REACT_APP_API_BASEURL;
// const baseUrl = 'http://10.0.2.2:3333/v1';
// const baseUrl = 'http://localhost:3333/v1';
const baseUrl = 'http://api.timedev.net/v1';

// const api = axios.create({
//     baseURL: 'http://localhost:3333/v1',
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'foobar'}
//   });

// export const headers = {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json',
//   'Authorization': `bearer ${sessionStorage.getItem('usuario_token')}`
// };

export const header_sem_token = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// aqui referenciamos todas as rotas da api para uso nos componentes
// caso precise mudar o endereço da api , será feito em um único lugar

// export const url_websocket = baseUrlWs;

export const auth_register = `${baseUrl}/auth/register`;
export const auth_login = `${baseUrl}/auth/login`;
export const api_admin_usuarios = `${baseUrl}/admin/usuarios`;


export const api_cliente = `${baseUrl}/admin/cliente`;
export const api_produto = `${baseUrl}/admin/produto`;
export const api_medidas = `${baseUrl}/admin/medidas`;

export const api_coleta = `${baseUrl}/admin/coleta`;
export const api_coleta_produto = `${baseUrl}/admin/coleta_produto`;
export const api_destinacao = `${baseUrl}/admin/destinacao`;
export const api_destinacao_produto = `${baseUrl}/admin/destinacao_produto`;

// export const api_admin_acusado_simple_show = `${baseUrl}/admin/pessoa/acusado_simple_show`;
export const api_admin_servidoresgeral             = `http://sgrh.sejus.ro.gov.br/carregaservidores`;
