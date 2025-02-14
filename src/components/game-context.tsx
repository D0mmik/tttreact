import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Room } from "../lib/types.ts";

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

interface GameState {
  connected: boolean;
  userCount: number;
  rooms: Room[];
  joinedRoom: Room | null;
  sendMessage: (message: string) => void;
}

interface GameContextType {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const GameContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    let ws: WebSocket;
    try {
      ws = new WebSocket("ws://localhost:8080/ws");
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
    rooms: [],
    joinedRoom: null,
    sendMessage: (message: string) => {
      console.warn("WebSocket is not connected yet.", message);
    },
  });

  return (
    <GameContext.Provider value={{ state, setState }}>
      {children}
    </GameContext.Provider>
  );
};
