import { useContext } from "react";
import { GameContext } from "./game-context.tsx";
import LeaveRoomButton from "./leave-room-button.tsx";
import TttGame from "./ttt-game.tsx";

export default function Room() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("UserProfile must be used within a GameContextProvider");
  }

  const { state } = context;

  return (
    <div>
      <div className="w-screen flex justify-center text-3xl mt-5">
        <div className="flex-col flex justify-center text-center">
          <h1 className="capitalize">{state.joinedRoom?.name}</h1>
          {!state.joinedRoom?.isPlayer && (
            <h2 className="text-xl text-gray-500">You are a spectator</h2>
          )}
        </div>
        <div className="flex items-center justify-center absolute right-7 top-7">
          <LeaveRoomButton />
        </div>
      </div>
      <TttGame />
    </div>
  );
}
