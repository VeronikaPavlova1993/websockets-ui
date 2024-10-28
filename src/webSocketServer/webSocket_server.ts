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
    switch (data.type) {
     case 'reg':
      {
       const db = getData();
       const user = JSON.parse(data.data);
       const newUser: User = {
        userId: db.users.length,
        name: user.name,
        password: user.password,
       };

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
      }
      break;
     case 'create_room':
      {
       console.log('mes', data);
       const db = getData();
       const roomUser = db.users[0];
       const newRoom = {
        roomId: db.rooms.length,
        roomUsers: [
         {
          userId: roomUser.userId,
          name: roomUser.name,
         },
        ],
       };
       db.rooms.push(newRoom);
       console.log('db', db);
       const response = {
        type: 'update_room',
        data: JSON.stringify([
         {
          roomId: db.rooms.length,
          roomUsers: [
           {
            name: roomUser.name,
            index: roomUser.userId,
           },
          ],
         },
        ]),
        id: 0,
       };
       ws.send(JSON.stringify(response));
      }
      break;
     case 'add_user_to_room':
      {
       const response = {
        type: 'create_game',
        data: JSON.stringify({ idGame: 1, idPlayer: 0 }),
        id: 0,
       };
       ws.send(JSON.stringify(response));
      }

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
