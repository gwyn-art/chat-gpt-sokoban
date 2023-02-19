import React, { useState } from "react";
import { GameState } from "./types";
import { GameField } from "./GameField";
import SquareTypeSelector, { SquareType } from "./SquareTypeSelector";

export type Level = {
  name: string;
  level: GameState;
};

export const LEVELS_STORE_KEY = "levels";

export const loadLevels = () => {
    try {
        const levels = JSON.parse(
            localStorage.getItem(LEVELS_STORE_KEY) || "[]"
        ) as Level[];
        return levels;
    } catch (error) {
        // @ts-ignore
        alert(`Error while loading levels: ${error.message}`);
        return [];
    }
};

export const saveLevel = (levelName: string, level: GameState) => {
  try {
    const levels = JSON.parse(
      localStorage.getItem(LEVELS_STORE_KEY) || "[]"
    ) as Level[];
    const newLevel = {
      name: levelName,
      level
    };
    levels.push(newLevel);
    localStorage.setItem("levels", JSON.stringify(levels));
    alert("Level saved successfully!");
  } catch (error) {
    // @ts-ignore
    alert(`Error while saving level: ${error.message}`);
  }
};

const defaultLevel = {
  name: '',
  level: {
    playerPosition: [0, 0],
    boxes: [],
    walls: [],
    targets: [],
    width: 5,
    height: 5
  }
} as Level;

export const LevelEditor: React.FC<{ onSave(): void, level?: Level }> = ({ onSave, level = defaultLevel }) => {
  const [levelName, setLevelName] = useState(level.name);
  const [selectedType, setSelectedType] = useState<SquareType>("empty");
  const [gameState, setGameState] = useState<GameState>(level.level);

  const handleSquareClick = (x: number, y: number) => {
    const handlePlayerClick = (x: number, y: number) => {
      setGameState(prevState => ({ ...prevState, playerPosition: [x, y] }));
    };

    const handleBoxClick = (x: number, y: number) => {
      setGameState(prevState => {
        const boxes = [...prevState.boxes, [x, y] as [number, number]];
        return { ...prevState, boxes };
      });
    };

    const handleTargetClick = (x: number, y: number) => {
      setGameState(prevState => {
        const targets = [...prevState.targets, [x, y] as [number, number]];
        return { ...prevState, targets };
      });
    };

    const handleWallClick = (x: number, y: number) => {
      setGameState(prevState => {
        const walls = [...prevState.walls, [x, y] as [number, number]];
        return { ...prevState, walls };
      });
    };

    const handleEmptyClick = (x: number, y: number) => {
      setGameState(prevState => {
        const walls = prevState.walls.filter(
          wall => wall[0] !== x || wall[1] !== y
        );
        const targets = prevState.targets.filter(
          target => target[0] !== x || target[1] !== y
        );
        const boxes = prevState.boxes.filter(
          box => box[0] !== x || box[1] !== y
        );
        const playerPosition =
          prevState.playerPosition[0] === x && prevState.playerPosition[1] === y
            ? ([0, 0] as [number, number])
            : prevState.playerPosition;
        return { ...prevState, walls, targets, boxes, playerPosition };
      });
    };

    switch (selectedType) {
      case "empty":
        return handleEmptyClick(x, y);
      case "wall":
        return handleWallClick(x, y);
      case "player":
        return handlePlayerClick(x, y);
      case "box":
        return handleBoxClick(x, y);
      case "target":
        return handleTargetClick(x, y);
    }
  };

  const handleTypeSelect = (type: SquareType) => {
    setSelectedType(type);
  };

  const handleIncreaseWidth = () => {
    setGameState(prevState => ({ ...prevState, width: prevState.width + 1 }));
  };

  const handleDecreaseWidth = () => {
    if (gameState.width === 1) {
      return;
    }
    setGameState(prevState => ({ ...prevState, width: prevState.width - 1 }));
  };

  const handleIncreaseHeight = () => {
    setGameState(prevState => ({ ...prevState, height: prevState.height + 1 }));
  };

  const handleDecreaseHeight = () => {
    if (gameState.height === 1) {
      return;
    }
    setGameState(prevState => ({ ...prevState, height: prevState.height - 1 }));
  };

  const handleSave = () => {
    if (levelName) {
      saveLevel(levelName, gameState);
      onSave()
    }
    else {
      alert('Please enter a level name')
    }
  };

  return (
    <div>
      <h1>Level Editor</h1>
      <label htmlFor="levelname_input">Level name:</label>
      <input
        id="levelname_input"
        type={"text"}
        placeholder={"Level name"}
        value={levelName}
        onChange={e => setLevelName(e.target.value)}
      />
      <p>Click on a square to change its type.</p>
      <div>
        <button onClick={handleIncreaseWidth}>Increase width</button>
        <button onClick={handleDecreaseWidth}>Decrease width</button>
        <button onClick={handleIncreaseHeight}>Increase height</button>
        <button onClick={handleDecreaseHeight}>Decrease height</button>
      </div>
      <SquareTypeSelector onSelectType={handleTypeSelect} />
      <GameField gameState={gameState} onCellClick={handleSquareClick} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
