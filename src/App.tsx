import React, { useState } from "react";
import Game from "./Game";
import { Level, LevelEditor } from "./LevelEditor";
import { LevelList } from "./LevelList";
import { GameState } from "./core/core";

const App: React.FC = () => {
  const [editGameLevel, setEditGameState] = useState<Level | undefined>(undefined);
  const [levels, setLevels] = useState<Level[]>([]);
  const [screen, setScreen] = useState("game");

  return (
    <div>
      <nav>
        <button onClick={() => setScreen("game")}>Game</button>
        <button onClick={() => setScreen("levelList")}>
          Custom Level List
        </button>
        <button onClick={() => setScreen("editor")}>Level Editor</button>
      </nav>
      {screen === "game" && (
        <Game levels={levels.length > 0 ? levels : undefined} />
      )}
      {screen === "levelList" && (
        <LevelList
          handlePlay={levels => {
            setLevels(levels);
            setScreen("game");
          }}
          handleEdit={level => {
            setEditGameState(level);
            setScreen("editor");
          }}
        />
      )}
      {screen === "editor" && (
        <LevelEditor onSave={() => setScreen("levelList")} level={editGameLevel} />
      )}
    </div>
  );
};

export default App;
