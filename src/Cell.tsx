import React from "react";
import { Item, isGoal, isMovable, isPlayer, isStopper } from "./core";
import { isTargetItem } from "./core";

type CellProps = {
  items: Item[]
  onClick?: () => void;
};

export const WallIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
    <defs>
      <pattern
        id="brick"
        x="0"
        y="0"
        width="30"
        height="30"
        patternUnits="userSpaceOnUse"
      >
        <rect fill="#A52A2A" x="0" y="0" width="30" height="30" />
        <rect fill="#8B0000" x="0" y="0" width="30" height="5" />
        <rect fill="#8B0000" x="0" y="0" width="5" height="30" />
        <rect fill="#8B0000" x="25" y="0" width="5" height="30" />
        <rect fill="#8B0000" x="0" y="25" width="30" height="5" />
      </pattern>
    </defs>
    <rect fill="url(#brick)" x="0" y="0" width="60" height="60" />
  </svg>
);

export const PlayerIcon = (
  (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            style={{ stopColor: "#14b8a6", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#1dc684", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="url(#grad)"
        stroke="#222"
        strokeWidth="4"
      />
      <rect
        x="30"
        y="25"
        width="40"
        height="30"
        fill="#fff"
        stroke="#222"
        strokeWidth="4"
      />
      <circle cx="45" cy="45" r="10" fill="#222" />
      <circle cx="55" cy="45" r="10" fill="#222" />
      <path
        d="M 40 65 Q 50 75 60 65"
        stroke="#222"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  )
)

export const BoxIcon = (
  (
    <svg viewBox="0 0 100 100">
      <rect
        width="100"
        height="100"
        fill="#ababab"
        stroke="#333333"
        strokeWidth="2"
      />
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        fill="#dddddd"
        stroke="#333333"
        strokeWidth="2"
      />
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        fill="#ffffff"
        stroke="#333333"
        strokeWidth="2"
      />
    </svg>
  )
)

export const GoalIcon = (
  (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="10"
        y="10"
        width="80"
        height="60"
        fill="#FFD700"
        stroke="#000"
        stroke-width="2"
      />
      <line x1="20" y1="50" x2="80" y2="50" stroke="#000" stroke-width="2" />
      <circle cx="50" cy="50" r="5" fill="#000" />
    </svg>
  )
)

export const Cell: React.FC<CellProps> = ({
  items,
  onClick
}) => {
  let backgroundColor;
  let content;

  if (items.some(isStopper)) {
    backgroundColor = "black";
    content = WallIcon;
  } else if (items.some(isPlayer)) {
    backgroundColor = "white";
    content = PlayerIcon;
    if (items.some(isGoal)) {
      backgroundColor = "green";
    }
  } else if (items.some(isTargetItem)) {
    // backgroundColor = "brown";
    content = BoxIcon;
  } else if (items.some(isGoal)) {
    backgroundColor = "green";
    content = GoalIcon;
  } else {
    backgroundColor = "white";
    content = (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          fill="#F5F5F5"
          stroke="#E0E0E0"
          stroke-width="10"
        />
      </svg>
    );
  }

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
