import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import {GameContextProvider} from "./components/game-context.tsx";
import Room from "./components/room.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GameContextProvider>
        <Routes>
          <Route path="/" index element={<App/>}/>
          <Route path="/room/:id" element={<Room/>}/>
        </Routes>


      </GameContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
