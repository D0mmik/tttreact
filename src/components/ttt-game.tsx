import TttBlock from "./ttt-block.tsx";
import { useContext } from "react";
import { GameContext } from "./game-context.tsx";
import { Button } from "./ui/button.tsx";
import PlayerText from "./player-text.tsx";

export default function TttGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("GameContext must be used within a GameContextProvider");
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
    <div className="flex justify-center flex-col items-center">
      {(state.game?.gameIsRunning || state.winner != null) && (
        <>
          <div className="flex-col mt-10 items-center text-center text-2xl gap-6 flex">
            <p>
              You are <PlayerText isX={state.isX} />
            </p>
            {state.winner == -1 && (
              <p>
                <PlayerText isX={state.game?.xPlays} /> Plays
              </p>
            )}
            {state.winner != null && state.winner != -1 && (
              <>
                {state.winner == 0 ? (
                  <p>IT'S A DRAW</p>
                ) : (
                  <p>
                    <PlayerText isX={state.winner == 1} /> WINNER
                  </p>
                )}
              </>
            )}
          </div>
          <div className="grid grid-cols-3 bg-neutral-700 items-center h-1/3 justify-items-center mt-30 rounded-3xl sm:p-1">
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
      {canStartGame && !state.game?.gameIsRunning && (
        <Button onClick={startGame}>Start Game</Button>
      )}
    </div>
  );
}
