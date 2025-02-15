import { useContext } from "react";
import { GameContext } from "./game-context.tsx";

export default function TttBlock({
  index,
  blockState,
}: {
  index: number;
  blockState: number;
}) {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("UserProfile must be used within a GameContextProvider");
  }

  const { state } = context;

  let color = "";
  let symbol = "";
  if (blockState == 2) {
    color = "text-blue-500";
    symbol = "O";
  } else if (blockState == 1) {
    color = "text-red-500";
    symbol = "X";
  }

  function gameMove() {
    if (
      !state.joinedRoom?.isPlayer ||
      state.game?.blocks[index] != 0 ||
      (state.isX && !state.game.xPlays) ||
      (!state.isX && state.game.xPlays)
    )
      return;
    const message = {
      state: "GAME_MOVE",
      value: index.toString(),
    };
    state.sendMessage(JSON.stringify(message));
    console.log(JSON.stringify(message));
  }

  return (
    <div
      className="bg-neutral-900 max-sm:w-24 max-sm:h-24 w-44 h-44 m-2 rounded-2xl flex justify-center items-center text-8xl"
      onClick={gameMove}
    >
      <p className={color}>{symbol}</p>
    </div>
  );
}
