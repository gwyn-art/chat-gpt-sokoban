import React, { useState } from "react";
import {
  GameState,
  PersistedGameState,
  addItem,
  createBox,
  createFlag,
  createIce,
  createItems,
  createPlayer,
  createWall,
  removeItem,
  removeItemsOnPosition
} from "./core";
import { GameField } from "./GameField";
import SquareTypeSelector, { SquareType } from "./SquareTypeSelector";

export const ACTUAL_VERSION = "1.0.0";

export const MINIMAL_SUPPORTED_VERSION = "1.0.0";

export type Level = {
  name: string;
  level: GameState;
  version: string;
};

export type PersistLevel = Omit<Level, "level"> & {
  level: PersistedGameState;
};

export type LevelToCreate = Omit<Level, "version">;

function compareVersions(version1: string, version2: string): number {
  const [major1, minor1, patch1] = version1.split(".").map(Number);
  const [major2, minor2, patch2] = version2.split(".").map(Number);

  if (major1 !== major2) {
    return major1 > major2 ? 1 : -1;
  }

  if (minor1 !== minor2) {
    return minor1 > minor2 ? 1 : -1;
  }

  if (patch1 !== patch2) {
    return patch1 > patch2 ? 1 : -1;
  }

  return 0;
}

/**
 * Checks level against minimal supported version.
 * @param level
 */
export const isLevelValid = (level: Level) => {
  if (compareVersions(level.version || "", MINIMAL_SUPPORTED_VERSION) < 0) {
    return false;
  }

  return true;
};

export const createLevel = (level: LevelToCreate) => {
  return {
    ...level,
    version: ACTUAL_VERSION
  };
};

export const LEVELS_STORE_KEY = "levels";

export const loadLevels = (): Level[] => {
  try {
    const levels = JSON.parse(
      localStorage.getItem(LEVELS_STORE_KEY) || "[]"
    ) as PersistLevel[];
    return levels.map(level => ({
      ...level,
      level: {
        ...level.level,
        items: createItems(level.level.items).reduce(
          (items, item) => items.set(item.id, item),
          new Map()
        )
      }
    }));
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
    ) as PersistLevel[];
    const newLevel = {
      name: levelName,
      version: ACTUAL_VERSION,
      level: {
        ...level,
        items: Array.from(level.items.values())
      }
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
  name: "",
  level: {
    items: new Map(),
    width: 5,
    height: 5
  }
} as Level;

export const LevelEditor: React.FC<{ onSave(): void; level?: Level }> = ({
  onSave,
  level = defaultLevel
}) => {
  const [levelName, setLevelName] = useState(level.name);
  const [selectedType, setSelectedType] = useState<SquareType>("empty");
  const [gameState, setGameState] = useState<GameState>(level.level);

  const handleSquareClick = (x: number, y: number) => {
    const handlePlayerClick = (x: number, y: number) => {
      setGameState(prevState => {
        const newPlayer = createPlayer([x, y]);
        return addItem(prevState, newPlayer);
      });
    };

    const handleBoxClick = (x: number, y: number) => {
      setGameState(prevState => {
        const newBox = createBox([x, y]);
        return addItem(prevState, newBox);
      });
    };

    const handleFlagClick = (x: number, y: number) => {
      setGameState(prevState => {
        const newFlag = createFlag([x, y]);
        return addItem(prevState, newFlag);
      });
    };

    const handleWallClick = (x: number, y: number) => {
      setGameState(prevState => {
        const newWall = createWall([x, y]);
        return addItem(prevState, newWall);
      });
    };

    const handleEmptyClick = (x: number, y: number) => {
      setGameState(prevState => {
        return removeItemsOnPosition(prevState, [x, y]);
      });
    };

    const handleIceClick = (x: number, y: number) => {
      setGameState(prevState => {
        const newIce = createIce([x, y]);
        return addItem(prevState, newIce);
      });
    }

    switch (selectedType) {
      case "empty":
        return handleEmptyClick(x, y);
      case "wall":
        return handleWallClick(x, y);
      case "player":
        return handlePlayerClick(x, y);
      case "box":
        return handleBoxClick(x, y);
      case "flag":
        return handleFlagClick(x, y);
      case "ice":
        return handleIceClick(x, y);
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
      onSave();
    } else {
      alert("Please enter a level name");
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
