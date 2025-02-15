import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Game, Room } from "../lib/types.ts";

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

interface GameState {
  connected: boolean;
  userCount: number;
  readyCount: number;
  rooms: Room[];
  joinedRoom: Room | null;
  ready: boolean;
  isX: boolean;
  sendMessage: (message: string) => void;
  game: Game | null;
}

interface GameContextType {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const GameContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const BE_URL = import.meta.env.VITE_BE_URL;

  const navigate = useNavigate();
  useEffect(() => {
    let ws: WebSocket;
    try {
      ws = new WebSocket(BE_URL);
    } catch (e) {
      console.log("WS ERROR: " + e);
      return;
    }

    ws.onopen = () => {
      console.log("OPEN");
      setState((state) => ({
        ...state,
        connected: true,
        sendMessage: (message: string) => {
          ws.send(message);
        },
      }));
    };

    ws.onmessage = (message) => {
      console.log(message.data);
      let data = null;
      try {
        data = JSON.parse(message.data);
      } catch (e) {
        console.log("JSON ERROR" + e);
      }

      if (data.userCount) {
        setState((state) => ({
          ...state,
          userCount: data.userCount,
        }));
      }
      if (data.readyCount) {
        setState((state) => ({
          ...state,
          readyCount: data.readyCount,
        }));
      }
      if (data.isX) {
        setState((state) => ({
          ...state,
          isX: data.isX,
        }));
      }
      if (data.rooms) {
        setState((state) => ({
          ...state,
          rooms: data.rooms,
        }));
      }
      if (data.joinedRoom) {
        setState((state) => ({
          ...state,
          joinedRoom: data.joinedRoom,
        }));

        navigate("/room/" + data.joinedRoom.id);
      }
      if (data.game) {
        setState((state) => ({
          ...state,
          game: data.game,
        }));

        console.log(data.game);
      }
    };

    ws.onclose = () => {
      setState((state) => ({
        ...state,
        connected: false,
      }));
    };

    return () => {
      ws.close();
    };
  }, []);

  const [state, setState] = useState<GameState>({
    connected: false,
    userCount: 0,
    readyCount: 0,
    rooms: [],
    joinedRoom: null,
    ready: false,
    isX: false,
    sendMessage: (message: string) => {
      console.warn("WebSocket is not connected yet.", message);
    },
    game: null,
  });

  return (
    <GameContext.Provider value={{ state, setState }}>
      {children}
    </GameContext.Provider>
  );
};
