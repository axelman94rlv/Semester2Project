import Sun from "../../lib/img/axel/sun.svg";
import City from "../../lib/img/axel/city.svg";
import HexUnite from "../../lib/img/axel/hexagone_unite.svg";
import Portrait from "../../lib/img/axel/profil.png";

import { mountHero, togglePortraitCard } from "./logique/hero.js";

// Squelette du hero

const CARD_GAP = "2rem";

export default function HeroPart() {
  mountHero();

  return {
    type: "section",
    attributes: [
      ["id", "hero"],
      [
        "class",
        ["relative", "z-0", "h-[300vh]", "overflow-hidden", "bg-[#3d0066]"],
      ],
    ],
    children: [
      {
        type: "div",
        attributes: [
          ["data-scene", "hero"],
          ["class", ["absolute", "inset-0"]],
        ],
        children: [
          // 1. soleil
          {
            type: "div",
            attributes: [
              ["data-celestial", "true"],
              [
                "class",
                [
                  "absolute",
                  "left-1/2",
                  "-translate-x-1/2",
                  "top-[10vh]",
                  "z-10",
                  "w-[115vh]",
                  "h-[115vh]",
                  "will-change-transform",
                ],
              ],
            ],
            children: [
              {
                type: "img",
                attributes: [
                  ["src", Sun],
                  ["alt", ""],
                  ["data-sun", "true"],
                  [
                    "class",
                    [
                      "absolute",
                      "inset-0",
                      "block",
                      "w-full",
                      "h-full",
                      "max-w-none",
                    ],
                  ],
                ],
              },
            ],
          },

          // 2. ligne d'horizon : plan violet qui masque le soleil en bas.
          {
            type: "div",
            attributes: [
              ["data-horizon", "true"],
              [
                "class",
                [
                  "absolute",
                  "left-0",
                  "top-[100vh]",
                  "w-full",
                  "h-[300vh]",
                  "z-[15]",
                  "bg-[#3d0066]",
                  "overflow-hidden",
                  "will-change-transform",
                ],
              ],
            ],
            children: [
              // portrait
              {
                type: "div",
                attributes: [
                  ["data-portrait", "true"],
                  ["hidden", "true"],
                  [
                    "class",
                    ["absolute", "left-1/2", "top-0", "will-change-transform"],
                  ],
                ],
                children: [
                  {
                    type: "div",
                    attributes: [
                      ["data-portraitdock", "true"],
                      [
                        "class",
                        [
                          "relative",
                          "transition-transform",
                          "duration-500",
                          "ease-out",
                        ],
                      ],
                    ],
                    children: [
                      // le portrait rond (cliquable)
                      {
                        type: "div",
                        attributes: [
                          [
                            "class",
                            [
                              "w-[60vh]",
                              "h-[60vh]",
                              "rounded-full",
                              "overflow-hidden",
                              "cursor-pointer",
                            ],
                          ],
                        ],
                        events: [["click", togglePortraitCard]],
                        children: [
                          {
                            type: "img",
                            attributes: [
                              ["src", Portrait],
                              ["alt", "Axel Barbellion"],
                              [
                                "class",
                                ["block", "w-full", "h-full", "object-cover"],
                              ],
                            ],
                          },
                        ],
                      },

                      // la fiche : collée à droite du portrait, remplie au 1er clic
                      {
                        type: "div",
                        attributes: [
                          ["data-cardslot", "true"],
                          [
                            "class",
                            [
                              "absolute",
                              "left-full",
                              "top-1/2",
                              "-translate-y-1/2",
                              "opacity-0",
                              "pointer-events-none",
                              "transition-opacity",
                              "duration-500",
                            ],
                          ],
                          ["style", [["marginLeft", CARD_GAP]]],
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // 3. bloc ville + hexagones
          {
            type: "div",
            attributes: [
              ["data-cityscape", "true"],
              [
                "class",
                [
                  "absolute",
                  "left-0",
                  "top-[45vh]",
                  "w-full",
                  "z-20",
                  "will-change-transform",
                ],
              ],
            ],
            children: [
              {
                type: "img",
                attributes: [
                  ["src", City],
                  ["alt", ""],
                  ["class", ["relative", "z-10", "block", "w-full"]],
                ],
              },
              {
                type: "img",
                attributes: [
                  ["src", HexUnite],
                  ["alt", ""],
                  [
                    "class",
                    ["relative", "z-30", "block", "w-full", "-mt-[15vh]"],
                  ],
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
