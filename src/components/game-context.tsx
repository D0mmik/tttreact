import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Game, Room } from "../lib/types.ts";

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

interface GameState {
  connected: boolean;
  loading: boolean;
  userCount: number;
  readyCount: number;
  rooms: Room[];
  joinedRoom: Room | null;
  ready: boolean;
  isX: boolean;
  sendMessage: (message: string) => void;
  game: Game | null;
  winner: number | null;
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
      setState((state) => ({
        ...state,
        loading: true,
      }));
      ws = new WebSocket(BE_URL);
    } catch (e) {
      console.log("WS ERROR: " + e);
      console.log("ZDE");
      setState((state) => ({
        ...state,
        loading: false,
      }));
      return;
    }

    ws.onopen = () => {
      setState((state) => ({
        ...state,
        connected: true,
        loading: false,
        sendMessage: (message: string) => {
          ws.send(message);
        },
      }));
    };

    ws.onmessage = (message) => {
      let data = null;
      try {
        data = JSON.parse(message.data);
      } catch (e) {
        console.log("JSON ERROR" + e);
      }

      if (data.userCount != null) {
        setState((state) => ({
          ...state,
          userCount: data.userCount,
        }));
      }
      if (data.readyCount != null) {
        setState((state) => ({
          ...state,
          readyCount: data.readyCount,
        }));
      }
      if (data.isX != null) {
        setState((state) => ({
          ...state,
          isX: data.isX,
        }));
      }
      if (data.rooms != null) {
        setState((state) => ({
          ...state,
          rooms: data.rooms,
        }));
      }
      if (data.winner != null) {
        setState((state) => ({
          ...state,
          winner: data.winner,
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
    winner: null,
    connected: false,
    loading: false,
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
