import { httpServer } from "./src/http_server/index.ts";
import 'dotenv/config';
import { server } from "./src/webSocketServer/webSocket_server.ts";

const HTTP_PORT = process.env.HTTP_PORT;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

server();
