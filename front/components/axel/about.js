import HexaBackground from "../../lib/img/axel/hexa_background.svg";

const IMG_H = "137.01vw";

const OVERLAP = "40vw";
const SIDE = "5.56vw";
const CONTENT_TOP = "-20vw";

export default function AboutPart(children = []) {
  return {
    type: "section",
    attributes: [
      ["id", "a-propos"],
      ["class", ["relative", "z-10", "w-full"]],
    ],

    children: [
      {
        type: "img",
        attributes: [
          ["src", HexaBackground],
          ["alt", ""],
          [
            "class",
            [
              "absolute",
              "left-0",
              "block",
              "w-full",
              "select-none",
              "pointer-events-none",
            ],
          ],
          ["style", [["top", `-${OVERLAP}`]]], // déborde sur le hero
        ],
      },

      // ---------- contenu ----------
      {
        type: "div",
        attributes: [
          ["class", ["relative", "z-10", "flex", "flex-col", "pb-[12vw]"]],
          [
            "style",
            [
              ["minHeight", `calc(${IMG_H} - ${OVERLAP})`],
              ["paddingLeft", SIDE],
              ["paddingRight", SIDE],
              ["top", CONTENT_TOP],
            ],
          ],
        ],
        children,
      },
    ],
  };
}
