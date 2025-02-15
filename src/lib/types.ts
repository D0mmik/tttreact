export interface Room {
  id: string;
  name: string;
  userCount: number;
  isPlayer: boolean;
  isLeader: boolean;
}

export interface Game {
  gameIsRunning: boolean;
  turnCount: number;
  blocks: number[];
  xPlays: boolean;
}
