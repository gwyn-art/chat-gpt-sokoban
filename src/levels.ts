import { Level, createLevel } from "./LevelEditor";
import { GameState, createItems } from "./core/core";

const levels = [
  {
    name: "Level 1",
    version: "1.0.0",
    level: {
      items: [
        {
          id: "qp3ldxe",
          properties: [{ type: "stopper" }],
          position: [0, 0],
          facing: "up",
        },
        {
          id: "c24o5ro",
          properties: [{ type: "stopper" }],
          position: [1, 0],
          facing: "up",
        },
        {
          id: "1weocun",
          properties: [{ type: "stopper" }],
          position: [3, 0],
          facing: "up",
        },
        {
          id: "37zvgfw",
          properties: [{ type: "stopper" }],
          position: [4, 0],
          facing: "up",
        },
        {
          id: "8fiq4ms",
          properties: [{ type: "stopper" }],
          position: [2, 0],
          facing: "up",
        },
        {
          id: "pjq2vqt",
          properties: [{ type: "stopper" }],
          position: [4, 1],
          facing: "up",
        },
        {
          id: "r8aigho",
          properties: [{ type: "stopper" }],
          position: [4, 2],
          facing: "up",
        },
        {
          id: "nyol9uk",
          properties: [{ type: "stopper" }],
          position: [4, 3],
          facing: "up",
        },
        {
          id: "2zrz4re",
          properties: [{ type: "stopper" }],
          position: [4, 4],
          facing: "up",
        },
        {
          id: "t0keaw6",
          properties: [{ type: "stopper" }],
          position: [3, 4],
          facing: "up",
        },
        {
          id: "92spbbm",
          properties: [{ type: "stopper" }],
          position: [2, 4],
          facing: "up",
        },
        {
          id: "409l963",
          properties: [{ type: "stopper" }],
          position: [1, 4],
          facing: "up",
        },
        {
          id: "i4pm97z",
          properties: [{ type: "stopper" }],
          position: [0, 4],
          facing: "up",
        },
        {
          id: "4l4n0nf",
          properties: [{ type: "stopper" }],
          position: [0, 3],
          facing: "up",
        },
        {
          id: "d09xnze",
          properties: [{ type: "stopper" }],
          position: [0, 2],
          facing: "up",
        },
        {
          id: "ewvqbkb",
          properties: [{ type: "stopper" }],
          position: [0, 1],
          facing: "up",
        },
        {
          id: "slfgo5n",
          properties: [
            { type: "player" },
            { type: "movable" },
            { type: "pusher" },
          ],
          position: [3, 2],
          facing: "up",
        },
        {
          id: "mhtfjtz",
          properties: [
            { type: "movable" },
            { type: "targetItem" },
            { type: "pusher" },
          ],
          position: [2, 2],
          facing: "up",
        },
        {
          id: "dj0ii94",
          properties: [{ type: "goal" }],
          position: [2, 3],
          facing: "up",
        },
      ],
      width: 5,
      height: 5,
    },
  },
  {
    name: "Level 2",
    version: "1.0.0",
    level: {
      items: [
        {
          id: "b2wnru7",
          properties: [{ type: "stopper" }],
          position: [0, 0],
          facing: "up",
        },
        {
          id: "rs55g68",
          properties: [{ type: "stopper" }],
          position: [1, 0],
          facing: "up",
        },
        {
          id: "yoyoswj",
          properties: [{ type: "stopper" }],
          position: [2, 0],
          facing: "up",
        },
        {
          id: "xcfjwok",
          properties: [{ type: "stopper" }],
          position: [3, 0],
          facing: "up",
        },
        {
          id: "rcmi1k8",
          properties: [{ type: "stopper" }],
          position: [4, 0],
          facing: "up",
        },
        {
          id: "e5ts0rv",
          properties: [{ type: "stopper" }],
          position: [4, 4],
          facing: "up",
        },
        {
          id: "kfphsfy",
          properties: [{ type: "stopper" }],
          position: [3, 4],
          facing: "up",
        },
        {
          id: "bjefity",
          properties: [{ type: "stopper" }],
          position: [2, 4],
          facing: "up",
        },
        {
          id: "qd7kvgv",
          properties: [{ type: "stopper" }],
          position: [1, 4],
          facing: "up",
        },
        {
          id: "1eugwv4",
          properties: [{ type: "stopper" }],
          position: [0, 3],
          facing: "up",
        },
        {
          id: "s6ig37a",
          properties: [{ type: "stopper" }],
          position: [0, 2],
          facing: "up",
        },
        {
          id: "49y2uly",
          properties: [{ type: "stopper" }],
          position: [0, 1],
          facing: "up",
        },
        {
          id: "6bjau86",
          properties: [{ type: "stopper" }],
          position: [1, 2],
          facing: "up",
        },
        {
          id: "892fgln",
          properties: [{ type: "stopper" }],
          position: [2, 2],
          facing: "up",
        },
        {
          id: "e4rurgz",
          properties: [{ type: "goal" }],
          position: [1, 3],
          facing: "up",
        },
        {
          id: "t05b7a3",
          properties: [{ type: "stopper" }],
          position: [0, 4],
          facing: "up",
        },
        {
          id: "k9nw9xb",
          properties: [
            { type: "player" },
            { type: "movable" },
            { type: "pusher" },
          ],
          position: [1, 1],
          facing: "up",
        },
        {
          id: "7ozmndy",
          properties: [
            { type: "movable" },
            { type: "targetItem" },
            { type: "pusher" },
          ],
          position: [3, 2],
          facing: "up",
        },
        {
          id: "artq5kr",
          properties: [{ type: "stopper" }],
          position: [5, 0],
          facing: "up",
        },
        {
          id: "zy2jm7j",
          properties: [{ type: "stopper" }],
          position: [5, 1],
          facing: "up",
        },
        {
          id: "n9ry48t",
          properties: [{ type: "stopper" }],
          position: [5, 2],
          facing: "up",
        },
        {
          id: "q8brirj",
          properties: [{ type: "stopper" }],
          position: [5, 3],
          facing: "up",
        },
        {
          id: "npjdnm5",
          properties: [{ type: "stopper" }],
          position: [5, 4],
          facing: "up",
        },
      ],
      width: 5,
      height: 6,
    },
  },
  {
    name: "Level 3",
    version: "1.0.0",
    level: {
      items: [
        {
          id: "olv3esz",
          properties: [{ type: "stopper" }],
          position: [3, 0],
          facing: "up",
        },
        {
          id: "oh5y3af",
          properties: [{ type: "stopper" }],
          position: [3, 1],
          facing: "up",
        },
        {
          id: "dc5j293",
          properties: [{ type: "stopper" }],
          position: [3, 2],
          facing: "up",
        },
        {
          id: "7i74s4x",
          properties: [{ type: "stopper" }],
          position: [3, 3],
          facing: "up",
        },
        {
          id: "zzspxiu",
          properties: [{ type: "stopper" }],
          position: [3, 4],
          facing: "up",
        },
        {
          id: "q5fmhm1",
          properties: [{ type: "stopper" }],
          position: [2, 4],
          facing: "up",
        },
        {
          id: "kvuhu97",
          properties: [{ type: "stopper" }],
          position: [1, 4],
          facing: "up",
        },
        {
          id: "w7h3nqu",
          properties: [{ type: "stopper" }],
          position: [1, 3],
          facing: "up",
        },
        {
          id: "xsn49r3",
          properties: [{ type: "stopper" }],
          position: [1, 2],
          facing: "up",
        },
        {
          id: "ca9dlhq",
          properties: [{ type: "stopper" }],
          position: [1, 1],
          facing: "up",
        },
        {
          id: "ervmhx7",
          properties: [{ type: "stopper" }],
          position: [1, 0],
          facing: "up",
        },
        {
          id: "asfj9c9",
          properties: [
            { type: "player" },
            { type: "movable" },
            { type: "pusher" },
          ],
          position: [2, 0],
          facing: "up",
        },
        {
          id: "jcfegef",
          properties: [
            { type: "movable" },
            { type: "targetItem" },
            { type: "pusher" },
          ],
          position: [2, 1],
          facing: "up",
        },
        {
          id: "fqq62of",
          properties: [{ type: "slippery" }],
          position: [2, 2],
          facing: "up",
        },
        {
          id: "7jvbyii",
          properties: [{ type: "goal" }],
          position: [2, 3],
          facing: "up",
        },
      ],
      width: 5,
      height: 5,
    },
  },
  {
    name: "Level 4",
    version: "1.0.0",
    level: {
      items: [
        {
          id: "1tbxwdx",
          properties: [
            { type: "movable" },
            { type: "targetItem" },
            { type: "pusher" },
          ],
          position: [1, 1],
          facing: "up",
        },
        {
          id: "snv1ko2",
          properties: [{ type: "stopper" }],
          position: [0, 0],
          facing: "up",
        },
        {
          id: "8nhefm2",
          properties: [{ type: "stopper" }],
          position: [0, 0],
          facing: "up",
        },
        {
          id: "1v7fo7c",
          properties: [{ type: "stopper" }],
          position: [0, 0],
          facing: "up",
        },
        {
          id: "dehp2kh",
          properties: [{ type: "stopper" }],
          position: [0, 0],
          facing: "up",
        },
        {
          id: "h01ikyc",
          properties: [{ type: "stopper" }],
          position: [0, 0],
          facing: "up",
        },
        {
          id: "i4xieer",
          properties: [{ type: "stopper" }],
          position: [0, 0],
          facing: "up",
        },
        {
          id: "x4amn1s",
          properties: [{ type: "stopper" }],
          position: [2, 0],
          facing: "up",
        },
        {
          id: "6lhsv1t",
          properties: [{ type: "stopper" }],
          position: [2, 0],
          facing: "up",
        },
        {
          id: "jsrziu7",
          properties: [{ type: "stopper" }],
          position: [2, 0],
          facing: "up",
        },
        {
          id: "migweau",
          properties: [{ type: "stopper" }],
          position: [2, 0],
          facing: "up",
        },
        {
          id: "4qvole5",
          properties: [{ type: "stopper" }],
          position: [2, 0],
          facing: "up",
        },
        {
          id: "4k7jpvl",
          properties: [{ type: "stopper" }],
          position: [2, 0],
          facing: "up",
        },
        {
          id: "1mes7sb",
          properties: [{ type: "stopper" }],
          position: [2, 2],
          facing: "up",
        },
        {
          id: "bgsfb8i",
          properties: [{ type: "stopper" }],
          position: [2, 2],
          facing: "up",
        },
        {
          id: "xyj2a91",
          properties: [{ type: "stopper" }],
          position: [2, 2],
          facing: "up",
        },
        {
          id: "bp0vsjc",
          properties: [{ type: "stopper" }],
          position: [2, 2],
          facing: "up",
        },
        {
          id: "ufrwy5q",
          properties: [{ type: "stopper" }],
          position: [2, 2],
          facing: "up",
        },
        {
          id: "t80kaj8",
          properties: [{ type: "stopper" }],
          position: [2, 2],
          facing: "up",
        },
        {
          id: "1ko5ow3",
          properties: [{ type: "stopper" }],
          position: [0, 2],
          facing: "up",
        },
        {
          id: "gpa2olg",
          properties: [{ type: "stopper" }],
          position: [0, 2],
          facing: "up",
        },
        {
          id: "dm83wky",
          properties: [{ type: "stopper" }],
          position: [0, 2],
          facing: "up",
        },
        {
          id: "86v6hbl",
          properties: [{ type: "stopper" }],
          position: [0, 2],
          facing: "up",
        },
        {
          id: "6t79oqg",
          properties: [{ type: "stopper" }],
          position: [0, 2],
          facing: "up",
        },
        {
          id: "psb4w9j",
          properties: [{ type: "stopper" }],
          position: [0, 2],
          facing: "up",
        },
        {
          id: "4iaqloe",
          properties: [{ type: "goal" }],
          position: [0, 1],
          facing: "up",
        },
        {
          id: "7sql0jj",
          properties: [{ type: "goal" }],
          position: [1, 0],
          facing: "up",
        },
        {
          id: "8giqsu2",
          properties: [{ type: "goal" }],
          position: [2, 1],
          facing: "up",
        },
        {
          id: "qo1kt2a",
          properties: [{ type: "goal" }],
          position: [1, 2],
          facing: "up",
        },
        {
          id: "wqkphkh",
          properties: [
            { type: "movable" },
            { type: "targetItem" },
            { type: "pusher" },
          ],
          position: [3, 1],
          facing: "up",
        },
        {
          id: "po53pn3",
          properties: [
            { type: "movable" },
            { type: "targetItem" },
            { type: "pusher" },
          ],
          position: [3, 2],
          facing: "up",
        },
        {
          id: "inpfs30",
          properties: [
            { type: "movable" },
            { type: "targetItem" },
            { type: "pusher" },
          ],
          position: [2, 3],
          facing: "up",
        },
        {
          id: "xxt27n9",
          properties: [
            { type: "movable" },
            { type: "targetItem" },
            { type: "pusher" },
          ],
          position: [3, 3],
          facing: "up",
        },
        {
          id: "ghzsurr",
          properties: [
            { type: "player" },
            { type: "movable" },
            { type: "pusher" },
          ],
          position: [4, 4],
          facing: "up",
        },
      ],
      width: 5,
      height: 5,
    },
  },
  {
    name: "Level 5",
    version: "1.0.0",
    level: {
      items: [
        {
          id: "8sc0dcz",
          properties: [{ type: "stopper" }],
          position: [0, 1],
          facing: "up",
        },
        {
          id: "8z25h5m",
          properties: [{ type: "stopper" }],
          position: [0, 0],
          facing: "up",
        },
        {
          id: "mgqqyap",
          properties: [{ type: "stopper" }],
          position: [1, 0],
          facing: "up",
        },
        {
          id: "9817vrt",
          properties: [{ type: "stopper" }],
          position: [2, 0],
          facing: "up",
        },
        {
          id: "b9kipdc",
          properties: [{ type: "stopper" }],
          position: [3, 0],
          facing: "up",
        },
        {
          id: "wlayyj8",
          properties: [{ type: "stopper" }],
          position: [4, 0],
          facing: "up",
        },
        {
          id: "tk5ic3m",
          properties: [{ type: "stopper" }],
          position: [4, 1],
          facing: "up",
        },
        {
          id: "f6h92w9",
          properties: [{ type: "stopper" }],
          position: [4, 2],
          facing: "up",
        },
        {
          id: "4cuk27d",
          properties: [{ type: "stopper" }],
          position: [4, 4],
          facing: "up",
        },
        {
          id: "r2sx9ou",
          properties: [{ type: "stopper" }],
          position: [3, 4],
          facing: "up",
        },
        {
          id: "j23yyp7",
          properties: [{ type: "stopper" }],
          position: [2, 4],
          facing: "up",
        },
        {
          id: "4wi3qor",
          properties: [{ type: "stopper" }],
          position: [1, 4],
          facing: "up",
        },
        {
          id: "7hcfhio",
          properties: [{ type: "stopper" }],
          position: [0, 4],
          facing: "up",
        },
        {
          id: "h99minb",
          properties: [{ type: "stopper" }],
          position: [0, 3],
          facing: "up",
        },
        {
          id: "myby9v0",
          properties: [{ type: "stopper" }],
          position: [0, 2],
          facing: "up",
        },
        {
          id: "3ydumee",
          properties: [{ type: "stopper" }],
          position: [1, 2],
          facing: "up",
        },
        {
          id: "smr1wka",
          properties: [{ type: "stopper" }],
          position: [2, 2],
          facing: "up",
        },
        {
          id: "ht6egb8",
          properties: [
            { type: "movable" },
            { type: "targetItem" },
            { type: "pusher" },
          ],
          position: [3, 2],
          facing: "up",
        },
        {
          id: "gsqeupd",
          properties: [{ type: "goal" }],
          position: [1, 3],
          facing: "up",
        },
        {
          id: "y055dkt",
          properties: [
            { type: "player" },
            { type: "movable" },
            { type: "pusher" },
          ],
          position: [1, 1],
          facing: "up",
        },
        {
          id: "dt9g9vj",
          properties: [
            { type: "player" },
            { type: "movable" },
            { type: "pusher" },
          ],
          position: [4, 3],
          facing: "up",
        },
      ],
      width: 5,
      height: 5,
    },
  },
];


// @ts-ignore
export const defaultLevels: Level[] = levels.map(({ level, ...other }) => {
  return {
    ...other,
    level: {
      ...level,
      // @ts-ignore
      items: createItems(level.items).reduce(
        (items, item) => items.set(item.id, item),
        new Map()
      )
    }
  };
})
