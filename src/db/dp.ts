import { DataGame, Db } from '../types';

export const data: DataGame = {
 game: {
  users: [],
  rooms: [],
  sessions: [],
 },
};
export const setData = (updatedDb: Db) => {
 data.game = updatedDb;
 return data.game;
};
export const getData = () => {
 return JSON.parse(JSON.stringify(data.game));
};
