import TttBlock from "./ttt-block.tsx";
import { useContext } from "react";
import { GameContext } from "./game-context.tsx";
import { Button } from "./ui/button.tsx";

export default function TttGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("UserProfile must be used within a GameContextProvider");
  }

  const { state, setState } = context;

  function getReady() {
    setState((state) => ({
      ...state,
      ready: true,
    }));

    const message = {
      state: "READY",
    };
    state.sendMessage(JSON.stringify(message));
  }

  function startGame() {
    const message = {
      state: "START_GAME",
    };
    state.sendMessage(JSON.stringify(message));
  }

  const canStartGame = state.readyCount === 2 && state.joinedRoom?.isLeader;

  return (
    <div className="flex justify-center">
      {state.game?.gameIsRunning && (
        <>
          <p>You are {state.isX ? "X" : "O"}</p>
          <p>{state.game.xPlays ? "X plays" : "O Plays"}</p>
          <div className="grid grid-cols-3 bg-neutral-700 items-center h-1/3 justify-items-center mt-40 rounded-3xl sm:p-1">
            {state.game?.blocks?.map((blockNum: number, index: number) => (
              <TttBlock key={index} index={index} blockState={blockNum} />
            ))}
          </div>
        </>
      )}
      {!state.ready && state.joinedRoom?.isPlayer && (
        <Button onClick={getReady} className="bg-green-500">
          Click to get ready
        </Button>
      )}
      {canStartGame && <Button onClick={startGame}>Start Game</Button>}
    </div>
  );
}
