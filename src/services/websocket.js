// import Ws from '@adonisjs/websocket-client';

// const url_websocket = process.env.REACT_APP_API_BASEURL_WS;

// const ws = Ws(url_websocket)

// const connectWebSocket = () => {
//   ws.connect() // conecta o servidor socket
//   // O MÉTODO ON FICA OUVINDO O EVENTO
//   ws.on('open', () => {
//     console.log('conexão aberta!');
//   })
//   ws.on('close', () => {
//     console.log('conexão fechada');
//   })
// }
// const disconnectWebSocket = () => {
//   ws.close()
// }


// function subscribe(topic) {
//   ws.subscribe(topic).on('ready', () => {
//     console.log('inscrito no tópico');
//   })
//   // PEGA O CANAL:TOPICO E FICA OUVINDO CADA EVENTO(args)
//   ws.getSubscription(topic).on('error', (error) => {
//     console.log('Erro no topic: ' + error)
//   })
//   ws.getSubscription(topic).on('close', () => {
//     console.log('Topic Fechado');
//   })
//   return ws.getSubscription(topic)
// }

// function listen(topic) {
//   return ws.getSubscription(topic)
// }

// export { connectWebSocket, disconnectWebSocket, subscribe, listen }





// // export const connectWebSocket = () => {
// //   ws.withJwtToken(localStorage.getItem('usuario_token')).connect()
// // }
// // const ws = Ws(url_websocket)
// // ws.withJwtToken(localStorage.getItem('usuario_token')).connect()
// // export const notifications = ws.subscribe("notifications")
// // notifications.on("message", (data) => {
// //   console.log(data);
// //   //   // alert(data)
// //   //   // openSnackbar(data,'success');
// // })
