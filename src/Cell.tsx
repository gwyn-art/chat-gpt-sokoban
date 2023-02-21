import React from "react";
import {
  Item,
  isGoal,
  isPlayer,
  isSlippery,
  isStopper
} from "./core";
import { isTargetItem } from "./core";

type CellProps = {
  items: Item[];
  onClick?: () => void;
};

export const WallIcon = "🧱";

export const PlayerIcon = "🤖";

export const BoxIcon = "📦";

export const GoalIcon = "🚩";

export const IceIcon = "🧊";

export const Cell: React.FC<CellProps> = ({ items, onClick }) => {
  let backgroundColor;
  let content: string = "";

  items.forEach(item => {
    if (isStopper(item)) {
      backgroundColor = "sandybrown";
      content += WallIcon;
    } else if (isPlayer(item)) {
      backgroundColor = "white";
      content += PlayerIcon;
      if (isGoal(item)) {
        backgroundColor = "palegoldenrod";
      }
    } else if (isTargetItem(item)) {
      content += BoxIcon;
      if (items.length === 1)
        backgroundColor = "saddlebrown"
    } else if (isGoal(item)) {
      backgroundColor = "palegoldenrod";
      content += GoalIcon;
    } else if (isSlippery(item)) {
      backgroundColor = "blue";
      content += IceIcon;
    }
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50px",
        height: "50px",
        backgroundColor,
        border: "1px solid black",
        borderRadius: "5px",
        color: "black",
        fontWeight: "bold"
      }}
      onClick={onClick}
    >
      {content}
    </div>
  );
};
