import { Button } from "./components/ui/button";
import { Link } from "react-router";
import { useContext } from "react";
import { GameContext } from "./components/game-context";
import CreateRoomButton from "./components/create-room-button.tsx";
import RoomButton from "./components/room-button.tsx";

function App() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("GameContext must be used within a GameContextProvider");
  }

  const { state } = context;

  if (!state.connected) {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-2xl">
        <p>YOU ARE NOT CONNECTED</p>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <nav className="w-screen bg-neutral-900 text-white flex items-center h-10 justify-center">
        ttt
      </nav>
      {!state.connected && <p>YOU ARE NOT CONNECTED</p>}
      {state.rooms?.map((room) => <RoomButton key={room.id} room={room} />)}
      <div className="flex items-center justify-center w-screen gap-2 flex-col h-screen">
        <h1 className="text-white">{state.userCount}</h1>
        <Link to="/test">
          <Button variant="link" className="text-white">
            Test
          </Button>
        </Link>
        <div className="flex gap-2">
          <CreateRoomButton />
          <Button
            variant="destructive"
            onClick={() => state.sendMessage("TEST MESSAGE")}
          >
            MESSAGE TEST
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
