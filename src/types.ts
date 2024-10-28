export interface User {
 userId: number;
 name: string;
 password: string;
}
export interface ShipPosition {
 x: number;
 y: number;
}
export interface Ship {
 position: ShipPosition;
 direction: boolean;
 length: number;
 type: 'small' | 'medium' | 'large' | 'huge';
}
export interface ShipOnBoard {
 position: ShipPosition;
 status: 'unharmed' | 'killed' | 'shot';
}
export interface Room {
 roomId: number;
 type: string;
 data: string;
}
export interface Game {
 gameId: number;
 players: {
  playerId: number;
  name: string;
  ships: Ship[];
  shipOnBoard: ShipOnBoard[];
 }[];
 turn: number;
}
export interface Db {
 users: User[];
 rooms: Room[];
 sessions: Game[];
}
export interface DataGame {
 game: {
  users: User[];
  rooms: Room[];
  sessions: Game[];
 };
}
export interface AttackResult {
 target: ShipOnBoard | null;
 status: 'miss' | 'killed' | 'shot';
}
