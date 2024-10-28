import { WebSocketServer } from 'ws';
import 'dotenv/config';

export const server = () => {
 const WS_PORT = process.env.WS_PORT;
 const wss = new WebSocketServer({ port: Number(`${WS_PORT}`) });
 console.log(`Start WebSocket server on port: ${WS_PORT}`);

 wss.on('connection', (ws) => {
  ws.on('error', console.error);
  ws.on('message', function handlerMessage(message) {
   console.log('received: %s', message);
  });
  ws.send('something');
 });
 wss.on('close', () => {
  console.log('WebSocket server was closed');
 });
};
