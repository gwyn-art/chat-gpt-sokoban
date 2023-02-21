import React, { TouchEventHandler } from "react";
import { GameState, getItemsByPosition } from "./core";
import { Cell } from "./Cell";

type GameFieldProps = {
  gameState: GameState;
  onCellClick?: (rowIndex: number, colIndex: number) => void;
  onTouchStart?: TouchEventHandler<HTMLDivElement>;
  onTouchMove?: TouchEventHandler<HTMLDivElement>;
};

export const GameField: React.FC<GameFieldProps> = ({
  gameState,
  onCellClick,
  onTouchMove,
  onTouchStart
}) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", touchAction: "none" }}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
    >
      {[...Array(gameState.height)].map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} style={{ display: "flex" }}>
          {[...Array(gameState.width)].map((_, colIndex) => {
            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                items={getItemsByPosition(gameState, [rowIndex, colIndex])}
                onClick={
                  onCellClick
                    ? () => onCellClick(rowIndex, colIndex)
                    : undefined
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
