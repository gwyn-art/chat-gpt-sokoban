/**
 * This file contains the core logic of the game.
 */

// --- Types ---

/**
 * The different types of properties an item can have.
 */
export enum PropertyType {
  // Item controlled by the player
  Player = "player",
  // Items that can push other items
  Pusher = "pusher",
  // Items that can be moved
  Movable = "movable",
  // Items that can't be moved and stop other items
  Stopper = "stopper",
  // Items that should be placed on a Goal to finish the level
  TargetItem = "targetItem",
  // Items that where a TargetItems should be placed to finish the level
  Goal = "goal",
  // If item is moved onto a slippery item, it will slide to the next position
  Slippery = "slippery"
}

export type Position = [number, number];

export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right"
}

export enum Facing {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right"
}

// --- Properties ---

export type Property = {
  type: PropertyType;
  value?: number;
};

export const createProperty = (
  type: PropertyType,
  value?: number
): Property => ({
  type,
  value
});

// --- Items ---

export type Item = {
  id: string;
  properties: Property[];
  position: Position;
  facing: Facing;
};

export type ItemToCreate = {
  properties: Property[];
  position: [number, number];
  facing?: Facing;
};

export const createItem = ({
  position,
  properties,
  facing
}: ItemToCreate): Item => ({
  id: Math.random()
    .toString(36)
    .substring(2, 9),
  properties,
  position,
  facing: facing || Facing.Up
});

export const createItems = (itemsToCreate: ItemToCreate[]): Item[] => {
  return itemsToCreate.map(item => createItem(item));
};

export const hasProperty = (item: Item, property: Property): boolean =>
  item.properties.map(property => property.type).includes(property.type);

export const removeProperty = (item: Item, property: Property): Item => ({
  ...item,
  properties: item.properties.filter(p => p !== property)
});

export const addProperty = (item: Item, property: Property): Item => ({
  ...item,
  properties: [...item.properties, property]
});

export const updateProperty = (
  item: Item,
  propertyType: PropertyType,
  value: number
): Item => ({
  ...item,
  properties: item.properties.map(p => {
    if (p.type === propertyType) {
      return createProperty(propertyType, value);
    }
    return p;
  })
});

export const getProperty = (
  item: Item,
  propertyType: PropertyType
): Property | undefined => item.properties.find(p => p.type === propertyType);

export const getPropertyValue = (
  item: Item,
  propertyType: PropertyType
): number | undefined => {
  const property = getProperty(item, propertyType);
  return property?.value;
};

export const isPlayer = (item: Item): boolean =>
  hasProperty(item, createProperty(PropertyType.Player));

export const isMovable = (item: Item): boolean =>
  hasProperty(item, createProperty(PropertyType.Movable));

export const isStopper = (item: Item): boolean =>
  hasProperty(item, createProperty(PropertyType.Stopper));

export const isTargetItem = (item: Item): boolean =>
  hasProperty(item, createProperty(PropertyType.TargetItem));

export const isGoal = (item: Item): boolean =>
  hasProperty(item, createProperty(PropertyType.Goal));

export const isSlippery = (item: Item): boolean =>
  hasProperty(item, createProperty(PropertyType.Slippery));

export const changeFacing = (item: Item, facing: Facing): Item => ({
  ...item,
  facing
});

export const createPlayer = (position: Position): Item =>
  createItem({
    position,
    properties: [
      createProperty(PropertyType.Player),
      createProperty(PropertyType.Movable),
      createProperty(PropertyType.Pusher)
    ]
  });

export const createWall = (position: Position): Item =>
  createItem({
    position,
    properties: [createProperty(PropertyType.Stopper)]
  });

export const createBox = (position: Position): Item =>
  createItem({
    position,
    properties: [
      createProperty(PropertyType.Movable),
      createProperty(PropertyType.TargetItem),
      createProperty(PropertyType.Pusher)
    ]
  });

export const createFlag = (position: Position): Item =>
  createItem({
    position,
    properties: [createProperty(PropertyType.Goal)]
  });

export const createIce = (position: Position): Item =>
  createItem({
    position,
    properties: [createProperty(PropertyType.Slippery)]
  });

// --- Game State ---

/**
 * The state of the game.
 * Contains all items and the width and height of the game board.
 */
export type GameState = {
  items: Map<string, Item>;
  width: number;
  height: number;
};

export type PersistedGameState = {
  items: Item[];
  width: number;
  height: number;
};

export const createGameState = (width: number, height: number): GameState => ({
  items: new Map(),
  width,
  height
});

export const addItem = (state: GameState, item: Item): GameState => ({
  ...state,
  items: new Map(state.items).set(item.id, item)
});

export const removeItem = (state: GameState, item: Item): GameState => {
  const items = new Map(state.items);
  items.delete(item.id);
  return {
    ...state,
    items
  };
};

export const removeItemsOnPosition = (
  state: GameState,
  position: Position
): GameState => {
  const items = new Map(state.items);
  getItemsByPosition(state, position).forEach(item => items.delete(item.id));
  return {
    ...state,
    items
  };
};

export const updateItem = (state: GameState, item: Item): GameState => {
  const items = new Map(state.items);
  items.set(item.id, item);
  return {
    ...state,
    items
  };
};

export const getItem = (state: GameState, id: string): Item | undefined =>
  state.items.get(id);

export const getItems = (state: GameState): Item[] =>
  Array.from(state.items.values());

export const getItemsByProperty = (
  state: GameState,
  property: Property
): Item[] => getItems(state).filter(i => hasProperty(i, property));

export const getItemsByPropertyType = (
  state: GameState,
  propertyType: PropertyType
): Item[] => getItems(state).filter(i => getProperty(i, propertyType));

export const getItemsByPosition = (
  state: GameState,
  position: [number, number]
): Item[] =>
  getItems(state).filter(
    i => i.position[0] === position[0] && i.position[1] === position[1]
  );

export const getItemsByPositionAndProperty = (
  state: GameState,
  position: [number, number],
  property: Property
): Item[] =>
  getItemsByPosition(state, position).filter(i => hasProperty(i, property));

export const getItemsByPositionAndPropertyType = (
  state: GameState,
  position: [number, number],
  propertyType: PropertyType
): Item[] =>
  getItemsByPosition(state, position).filter(i => getProperty(i, propertyType));

export const getItemsByPositionAndPropertyTypeAndValue = (
  state: GameState,
  position: [number, number],
  propertyType: PropertyType,
  value: number
): Item[] =>
  getItemsByPositionAndPropertyType(state, position, propertyType).filter(
    i => getPropertyValue(i, propertyType) === value
  );

export const addItems = (state: GameState, items: Item[]): GameState =>
  items.reduce((s, i) => addItem(s, i), state);

export const getNextPosition = (
  position: Position,
  direction: Direction
): Position => {
  switch (direction) {
    case "up":
      return [position[0] - 1, position[1]];
    case "down":
      return [position[0] + 1, position[1]];
    case "left":
      return [position[0], position[1] - 1];
    case "right":
      return [position[0], position[1] + 1];
    default:
      return position;
  }
};

const isOutOfBounds = (state: GameState, position: Position): boolean => {
  const [x, y] = position;
  return x < 0 || x >= state.height || y < 0 || y >= state.width;
};

/**
 * Moves all items on a cell in direction if it is movable and not blocked by stopper on next cell.
 * Recursively moves items on following cells following the same rules.
 * Taking into account slippery items.
 */
export const moveItems = (
  state: GameState,
  position: Position,
  direction: Direction
): GameState => {
  const items = getItemsByPosition(state, position);
  const nextPosition = getNextPosition(position, direction);
  const nextItems = getItemsByPosition(state, nextPosition);
  const stopper = nextItems.find(i => isStopper(i));
  const movableItems = items.filter(i => isMovable(i));

  if (isOutOfBounds(state, nextPosition) || stopper) {
    throw new Error("Invalid move");
  }

  if (stopper || movableItems.length === 0) {
    return state;
  }

  let newState = state;

  if (nextItems.some(isMovable)) {
    newState = moveItems(newState, nextPosition, direction);
  }

  newState = movableItems.reduce(
    (s, i) => updateItem(s, { ...i, position: nextPosition }),
    newState
  );

  const slippery = nextItems.find(i => isSlippery(i));

  if (slippery) {
    return moveItems(newState, nextPosition, direction);
  }

  return newState;
};

export const movePlayer = (
  state: GameState,
  direction: Direction
): GameState => {
  return getItemsByPropertyType(state, PropertyType.Player).reduce(
    (s, i) => moveSinglePlayer(s, i, direction),
    state
  );
};

/**
 * Moves the player in direction if it is not blocked by stopper on next cell.
 * Moves items on next cell if it is movable and not blocked by stopper on next next cell.
 * Recursively moves items on following cells following the same rules.
 * Taking into account slippery items.
 * @param state
 * @param direction
 * @returns
 */
const moveSinglePlayer = (
  state: GameState,
  player: Item,
  direction: Direction
): GameState => {
  const nextPosition = getNextPosition(player.position, direction);
  const nextItems = getItemsByPosition(state, nextPosition);
  const stopper = nextItems.find(i => isStopper(i));
  const movableItems = nextItems.filter(i => isMovable(i));
  const slippery = nextItems.find(i => isSlippery(i));

  try {
    if (stopper || isOutOfBounds(state, nextPosition)) {
      return state;
    }

    let newState = state;

    if (movableItems.length > 0) {
      newState = moveItems(state, nextPosition, direction);
    }

    if (slippery) {
      newState = updateItem(state, { ...player, position: nextPosition });
      const newPlayer = getItem(newState, player.id);
      if (newPlayer) {
        return moveSinglePlayer(newState, newPlayer, direction);
      } else {
        return newState;
      }
    }

    return updateItem(newState, { ...player, position: nextPosition });
  } catch (e) {
    return state;
  }
};

/**
 * Checks if the game is completed by checking if all goals are filled with target items.
 * @param state
 */
export const isCompleted = (state: GameState): boolean => {
  const goals = getItemsByPropertyType(state, PropertyType.Goal);
  const targets = getItemsByPropertyType(state, PropertyType.TargetItem);
  return goals.every(g => targets.some(t => t.position === g.position));
};
