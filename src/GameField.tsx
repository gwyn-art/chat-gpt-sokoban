import React from 'react'
import { GameState } from "./types";
import { Cell } from './Cell';

type GameFieldProps = {
    gameState: GameState;
    onCellClick?: (rowIndex: number, colIndex: number) => void;
}

export const GameField: React.FC<GameFieldProps> = ({ gameState, onCellClick }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {[...Array(gameState.height)].map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} style={{ display: "flex" }}>
          {[...Array(gameState.width)].map((_, colIndex) => {
            const isWall = gameState.walls.some(
              wallPos => wallPos[0] === rowIndex && wallPos[1] === colIndex
            );
            const isPlayer =
              gameState.playerPosition[0] === rowIndex &&
              gameState.playerPosition[1] === colIndex;
            const isBox = gameState.boxes.some(
              boxPos => boxPos[0] === rowIndex && boxPos[1] === colIndex
            );
            const isGoal = gameState.targets.some(
              targetPos =>
                targetPos[0] === rowIndex && targetPos[1] === colIndex
            );
            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                isWall={isWall}
                isPlayer={isPlayer}
                isBox={isBox}
                isGoal={isGoal}
                onClick={onCellClick ? () => onCellClick(rowIndex, colIndex) : undefined}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
