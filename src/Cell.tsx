import React from "react";

type CellProps = {
  isWall?: boolean;
  isPlayer?: boolean;
  isBox?: boolean;
  isGoal?: boolean;
  onClick?: () => void;
};

export const Cell: React.FC<CellProps> = ({ isWall, isPlayer, isBox, isGoal, onClick }) => {
  let backgroundColor;
  let content;

  if (isWall) {
    backgroundColor = "black";
    content = "W";
  } else if (isPlayer) {
    backgroundColor = "white";
    content = "😀";
    if (isGoal) {
      backgroundColor = "green";
    }
  } else if (isBox) {
    backgroundColor = "brown";
    content = "B";
  } else if (isGoal) {
    backgroundColor = "green";
    content = "T";
  } else {
    backgroundColor = "white";
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
