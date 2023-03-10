import React, { useState } from "react";

import './SquareTypeSelector.css'

export type SquareType = "empty" | "wall" | "flag" | "box" | "player" | "ice" | "fire";

type SquareTypeSelectorProps = {
  onSelectType: (type: SquareType) => void;
};

const SquareTypeSelector: React.FC<SquareTypeSelectorProps> = ({
  onSelectType,
}) => {
  const [selectedType, setSelectedType] = useState<SquareType>("empty");

  const handleButtonClick = (type: SquareType) => {
    setSelectedType(type);
    onSelectType(type);
  };

  return (
    <div>
      <button
        className={selectedType === "empty" ? "selected" : ""}
        onClick={() => handleButtonClick("empty")}
      >
        Empty
      </button>
      <button
        className={selectedType === "wall" ? "selected" : ""}
        onClick={() => handleButtonClick("wall")}
      >
        Wall
      </button>
      <button
        className={selectedType === "flag" ? "selected" : ""}
        onClick={() => handleButtonClick("flag")}
      >
        Flag
      </button>
      <button
        className={selectedType === "box" ? "selected" : ""}
        onClick={() => handleButtonClick("box")}
      >
        Box
      </button>
      <button
        className={selectedType === "ice" ? "selected" : ""}
        onClick={() => handleButtonClick("ice")}
      >
        Ice
      </button>
      <button
        className={selectedType === "fire" ? "selected" : ""}
        onClick={() => handleButtonClick("fire")}
      >
        Fire
      </button>
      <button
        className={selectedType === "player" ? "selected" : ""}
        onClick={() => handleButtonClick("player")}
      >
        Player
      </button>
    </div>
  );
};

export default SquareTypeSelector;