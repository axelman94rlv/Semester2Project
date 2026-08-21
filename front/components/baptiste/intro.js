import Ronce from "../../lib/img/baptiste/Ronce.svg";
import Line from "../../lib/img/baptiste/Line.svg";

export function Intro() {
  return {
    type: "section",
    attributes: [
      [
        "class",
        ["w-full", "flex", "flex-col", "items-center", "text-[#fffdd8]"],
      ],
    ],
    children: [
      {
        type: "img",
        attributes: [
          ["src", Ronce],
          ["alt", "Décoration en forme de ronce"],
          ["class", ["block", "w-full"]],
        ],
      },

      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "w-full",
              "flex",
              "flex-col",
              "justify-center",
              "items-center",
              "gap-[3.4rem]",
              "px-8",
              "py-16",
            ],
          ],
        ],
        children: [
          {
            type: "h1",
            attributes: [
              [
                "class",
                ["w-full", "max-w-[80rem]", "text-center", "text-[2.6rem]"],
              ],
            ],
            children: [
              "“ Crafting scalable systems and meaningful digital experiences through clean engineering. ”",
            ],
          },

          {
            type: "img",
            attributes: [
              ["src", Line],
              ["alt", ""],
              ["class", ["w-[19rem]", "max-w-full"]],
            ],
          },

          {
            type: "p",
            attributes: [
              [
                "class",
                [
                  "w-full",
                  "text-center",
                  "font-[HurricaneCustom]",
                  "text-[8rem]",
                ],
              ],
            ],
            children: ["Baptiste ROY"],
          },
        ],
      },
    ],
  };
}
