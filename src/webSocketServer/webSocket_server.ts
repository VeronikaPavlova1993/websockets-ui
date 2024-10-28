import { WebSocketServer } from 'ws';
import 'dotenv/config';
import { User } from '../types';
import { getData, setData } from '../db/dp';

export const server = () => {
 const WS_PORT = process.env.WS_PORT;
 const wss = new WebSocketServer({ port: Number(`${WS_PORT}`) });
 console.log(`Start WebSocket server on port: ${WS_PORT}`);

 wss.on('connection', (ws) => {
  ws.on('message', function handlerMessage(message: string) {
   try {
    const data = JSON.parse(message);
    console.log('mes', data);
    console.log('mes.type', data.type);
    switch (data.type) {
     case 'reg':
      const user = JSON.parse(data.data);
      const newUser: User = {
       userId: data.id,
       name: user.name,
       password: user.password,
      };
      const db = getData();
      db.users.push(newUser);
      setData(db);
      console.log('db', db);
      function reg(
       name: string,
       index: number,
       error = false,
       errorText = ''
      ): void {
       const response = {
        type: 'reg',
        data: JSON.stringify({
         name: name,
         index: index,
         error: error,
         errorText: errorText,
        }),
        id: 0,
       };
       ws.send(JSON.stringify(response));
      }
      reg(newUser.name, newUser.userId, false, '');
      break;
     case 'create_room':
      break;

     default:
      console.log('Unknown message:', data.type);
      break;
    }
   } catch (error) {
    console.error('Attation! Error:', error);
   }
  });
 });
 wss.on('close', () => {
  console.log('WebSocket server was closed');
 });
};
