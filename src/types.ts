export type GameState = {
    playerPosition: [number, number];
    boxes: [number, number][];
    walls: [number, number][];
    targets: [number, number][];
    width: number;
     height: number;
 };