import React, { KeyboardEventHandler, useEffect, useState } from 'react';

type GameState = {
     playerPosition: [number, number];
     boxes: [number, number][];
     walls: [number, number][];
     targets: [number, number][];
     width: number;
      height: number;
  };
  
  const initialGameState: GameState = {
    playerPosition: [3, 3],
    width: 5,
    height: 5,
    boxes: [
      [2, 2],
      [2, 3],
      [2, 4],
      [3, 2],
      [3, 4],
      [4, 2],
      [4, 3],
      [4, 4],
    ],
    walls: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 0],
      [1, 4],
      [2, 0],
      [2, 4],
      [3, 0],
      [3, 4],
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
    ],
    targets: [
      [1, 2],
      [1, 3],
      [1, 4],
      [3, 1],
      [3, 3],
      [5, 2],
      [5, 3],
      [5, 4],
    ],
  };

const Game: React.FC = () => {
      const [gameState, setGameState] = useState(initialGameState);
      console.log("🚀 ~ file: Game.tsx:58 ~ gameState", gameState)

      function handleKeyDown(event: KeyboardEvent) {
        const playerPosition = gameState.playerPosition;
        console.log("🚀 ~ file: Game.tsx:62 ~ handleKeyDown ~ gameState.playerPosition", gameState.playerPosition)
        const boxes = gameState.boxes;
      
        let newPlayerPosition: [number, number] = playerPosition;
        let newBoxes: [number, number][] = boxes.slice();
      
        switch (event.key) {
          case "ArrowUp":
            newPlayerPosition = [playerPosition[0] - 1, playerPosition[1]];
            break;
          case "ArrowDown":
            newPlayerPosition = [playerPosition[0] + 1, playerPosition[1]];
            break;
          case "ArrowLeft":
            newPlayerPosition = [playerPosition[0], playerPosition[1] - 1];
            break;
          case "ArrowRight":
            newPlayerPosition = [playerPosition[0], playerPosition[1] + 1];
            break;
          default:
            return;
        }
      
        const boxIndex = boxes.findIndex((pos) => pos[0] === newPlayerPosition[0] && pos[1] === newPlayerPosition[1]);
        if (boxIndex !== -1) {
          const newBoxPosition = [newPlayerPosition[0] + (newPlayerPosition[0] - playerPosition[0]), newPlayerPosition[1] + (newPlayerPosition[1] - playerPosition[1])] as [number, number]
          if (gameState.walls.some((pos) => pos[0] === newBoxPosition[0] && pos[1] === newBoxPosition[1]) || boxes.some((pos, index) => index !== boxIndex && pos[0] === newBoxPosition[0] && pos[1] === newBoxPosition[1])) {
            return;
          }
          newBoxes[boxIndex] = newBoxPosition;
        }
      
        console.log(newBoxes.some((pos) => pos[0] === newPlayerPosition[0] && pos[1] === newPlayerPosition[1]))
        if (gameState.walls.some((pos) => pos[0] === newPlayerPosition[0] && pos[1] === newPlayerPosition[1]) || newBoxes.some((pos) => pos[0] === newPlayerPosition[0] && pos[1] === newPlayerPosition[1])) {
          return;
        }
      
        setGameState((prevState) => ({
          ...prevState,
          playerPosition: newPlayerPosition,
          boxes: newBoxes,
        }));
      }
      
      useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [gameState]);
      
  return (
    <div>
    <h1>Sokoban Game</h1>
    <div style={{ display: "flex", flexDirection: "column" }}>
      {[...Array(gameState.height)].map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} style={{ display: "flex" }}>
          {[...Array(gameState.width)].map((_, colIndex) => {
            const isWall = gameState.walls.some(
              (wallPos) => wallPos[0] === rowIndex && wallPos[1] === colIndex
            );
            const isPlayer =
              gameState.playerPosition[0] === rowIndex &&
              gameState.playerPosition[1] === colIndex;
            const isBox = gameState.boxes.some(
              (boxPos) => boxPos[0] === rowIndex && boxPos[1] === colIndex
            );
            const isGoal = gameState.targets.some(
              (targetPos) => targetPos[0] === rowIndex && targetPos[1] === colIndex
            );
            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                isWall={isWall}
                isPlayer={isPlayer}
                isBox={isBox}
                isGoal={isGoal}
              />
            );
          })}
        </div>
      ))}
    </div>
  </div>
  );
};

export default Game;


type CellProps = {
  isWall?: boolean;
  isPlayer?: boolean;
  isBox?: boolean;
  isGoal?: boolean;
};

const Cell: React.FC<CellProps> = ({ isWall, isPlayer, isBox, isGoal }) => {
  let backgroundColor;
  let content;

  if (isWall) {
    backgroundColor = 'black';
    content = 'W';
  } else if (isPlayer) {
    backgroundColor = 'white';
    content = '😀';
  } else if (isBox) {
    backgroundColor = 'brown';
    content = 'B';
  } else if (isGoal) {
    backgroundColor = 'green';
    content = 'T';
  } else {
    backgroundColor = 'white';
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px',
        height: '50px',
        backgroundColor,
        border: '1px solid black',
        borderRadius: '5px',
        color: 'black',
        fontWeight: 'bold',
      }}
    >
      {content}
    </div>
  );
};