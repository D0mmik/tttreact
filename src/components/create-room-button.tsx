import { Button } from "./ui/button.tsx";
import { useContext, useRef } from "react";
import { GameContext } from "./game-context.tsx";
import { Input } from "./ui/input.tsx";

export default function CreateRoomButton() {
  const context = useContext(GameContext);
  const ref = useRef<HTMLInputElement>(null);

  if (!context) {
    throw new Error("UserProfile must be used within a GameContextProvider");
  }

  const { state } = context;

  function createGame() {
    const message = {
      state: "CREATE_GAME",
      value: ref.current?.value,
    };
    state.sendMessage(JSON.stringify(message));
  }

  return (
    <>
      <Input placeholder="Autobus" ref={ref} />
      <Button variant="outline" onClick={createGame}>
        Create game
      </Button>
    </>
  );
}
