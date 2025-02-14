import { Button } from "./ui/button.tsx";
import { useContext } from "react";
import { GameContext } from "./game-context.tsx";
import { Room } from "../lib/types.ts";

export default function RoomButton({ room }: { room: Room }) {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("UserProfile must be used within a GameContextProvider");
  }

  const { state } = context;

  function joinRoom() {
    const message = {
      state: "JOIN_GAME",
      value: room?.id,
    };
    state.sendMessage(JSON.stringify(message));
  }

  return (
    <div className="flex justify-around items-center w-80 h-10">
      <p>{room?.name}</p>
      <Button variant="outline" onClick={joinRoom}>
        Join {room?.name}
      </Button>
      <p>{room?.userCount}</p>
    </div>
  );
}
