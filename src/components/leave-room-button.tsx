import { Button } from "./ui/button.tsx";
import { useContext } from "react";
import { GameContext } from "./game-context.tsx";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";

export default function LeaveRoomButton() {
  const context = useContext(GameContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("UserProfile must be used within a GameContextProvider");
  }

  const { state, setState } = context;

  function leaveGame() {
    const message = {
      state: "LEAVE_GAME",
    };
    state.sendMessage(JSON.stringify(message));
    navigate("/");
    setState((state) => ({
      ...state,
      readyCount: 0,
      gameIsRunning: false,
      joinedRoom: null,
      ready: false,
    }));
  }

  return (
    <>
      <Button variant="destructive" onClick={leaveGame}>
        <LogOut /> Leave game
      </Button>
    </>
  );
}
