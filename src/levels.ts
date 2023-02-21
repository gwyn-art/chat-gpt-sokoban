import { createLevel } from "./LevelEditor";
import { GameState } from "./core";

const level1 = createLevel({
  name: "Level 1",
  level: {
    width: 10,
    height: 10,
    items: new Map(),
  },
});

export const defaultLevels = [level1];
