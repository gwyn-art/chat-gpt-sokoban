import React, { KeyboardEventHandler, useEffect, useState } from 'react';
import { GameState } from './types';
import { levels } from './levels';
import { Helper } from './Helper';

const FIRST_LEVEL = 0;
const Game: React.FC = () => {
      const [gameState, setGameState] = useState(levels[FIRST_LEVEL]);
      const [history, setHistory] = useState<GameState[]>([levels[FIRST_LEVEL]]);
      const [currentLevel, setCurrentLevel] = useState(FIRST_LEVEL)
      console.log("🚀 ~ file: Game.tsx:58 ~ gameState", gameState)

      const handleUndo = () => {
        if (history.length > 1) {
          const newHistory = [...history];
          const prevGameState = newHistory.pop();
          setHistory(newHistory);
          if (prevGameState)
            setGameState(prevGameState);
        }
      };

      function handleKeyDown(event: KeyboardEvent) {
        const playerPosition = gameState.playerPosition;
        console.log("🚀 ~ file: Game.tsx:62 ~ handleKeyDown ~ gameState.playerPosition", gameState.playerPosition)
        const boxes = gameState.boxes;
        let direction: [number, number] = [0, 0];
        switch (event.key) {
          case "ArrowUp":
            direction = [-1, 0];
            break;
          case "ArrowDown":
            direction = [1, 0];
            break;
          case "ArrowLeft":
            direction = [0, -1];
            break;
          case "ArrowRight":
            direction = [0, 1];
            break;
          case 'n':
            if (isLevelCompleted() && !isGameWon()) {
              setHistory([...history, levels[currentLevel + 1]])
              setCurrentLevel(currentLevel + 1)
              setGameState(levels[currentLevel + 1])
            }
            return;
            break;
          case 'z':
            return handleUndo();
          default:
            return;
        }
      
        const [x, y] = direction;
        const newPlayerPosition = [playerPosition[0] + x, playerPosition[1] + y] as [number, number];
        const newBoxes = boxes.map((box) => [...box]) as [number, number][];
        let movedBox = newBoxes.findIndex((box) => box[0] === newPlayerPosition[0] && box[1] === newPlayerPosition[1]);
        console.log("🚀 ~ file: Game.tsx:50 ~ handleKeyDown ~ movedBox", newBoxes[movedBox])

        while (true) {
          if (movedBox === -1) {
            break;
          }

          const newBoxPosition = [newBoxes[movedBox][0] + x, newBoxes[movedBox][1] + y] as [number, number];
          console.log("🚀 ~ file: Game.tsx:57 ~ handleKeyDown ~ newBoxPosition", newBoxPosition)

          if (
            gameState.walls.some((wall) => wall[0] === newBoxPosition[0] && wall[1] === newBoxPosition[1])
          ) {
            break;
          }


          console.log("🚀 ~ file: Game.tsx:66 ~ handleKeyDown ~ movedBox", movedBox)
          newBoxes[movedBox] = newBoxPosition;
          movedBox = newBoxes.findIndex((box, boxIndex) => boxIndex !== movedBox && box[0] === newBoxPosition[0] && box[1] === newBoxPosition[1]);
        }
      
        console.log(newBoxes, newPlayerPosition)
        if (gameState.walls.some((pos) => pos[0] === newPlayerPosition[0] && pos[1] === newPlayerPosition[1]) || newBoxes.some((pos) => pos[0] === newPlayerPosition[0] && pos[1] === newPlayerPosition[1])) {
          return;
        }
      

        setGameState((prevState) => {
          setHistory([...history, prevState])
          return ({
          ...prevState,
          playerPosition: newPlayerPosition,
          boxes: newBoxes,
        })
      });
      }

      function isLevelCompleted(): boolean {
        return gameState.boxes.every((boxPos) =>
          gameState.targets.some((targetPos) => targetPos[0] === boxPos[0] && targetPos[1] === boxPos[1])
        );
      }

      function isGameWon(): boolean {
        return currentLevel === levels.length - 1;
      }

      function handlePlayAgain() {
        if (isGameWon()) {
          setCurrentLevel(FIRST_LEVEL)
          setHistory([levels[FIRST_LEVEL]])
          setGameState(levels[FIRST_LEVEL]);
        }
        else {
        setHistory([...history, gameState])
        setGameState(levels[currentLevel]);
        }
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
    <Helper />
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
    {isLevelCompleted() && ( <> <h2>{isGameWon() ? 'You completed the Game!' : 'Level Completed!'}</h2> <button onClick={handlePlayAgain}>Play Again</button>
    {!isGameWon() && (
    <button onClick={() => {
      if (currentLevel < levels.length - 1) {
        setCurrentLevel(currentLevel + 1)
        setGameState(levels[currentLevel + 1])
      }
    }}>Next Level</button> 
    )}
    </>)}
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
    if (isGoal) {
      backgroundColor = 'green';
    }
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