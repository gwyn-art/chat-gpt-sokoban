import React from "react";
import { BoxIcon, GoalIcon, PlayerIcon } from "./Cell";

const HelperIcon: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <div style={{ display: "inline-block", width: "15px", height: "15px" }}>
    {children}
  </div>
);

export const Helper = () => {
  return (
    <p>
      User arrow keys or swipe on game field to navigate the player (
      <HelperIcon>{PlayerIcon}</HelperIcon>). <br />
      The goal is to push all the boxes (<HelperIcon>{BoxIcon}</HelperIcon>) to
      the goal (<HelperIcon>{GoalIcon}</HelperIcon>). <br />
      Press "z" to undo your last move. Press "n" to go to the next level.{" "}
      <br />
      Press "r" to restart the level.
    </p>
  );
};
