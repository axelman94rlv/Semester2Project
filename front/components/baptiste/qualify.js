import createTextCard from "./elements/cardText";
import createImageCard from "./elements/cardImage";

import QualifyVideo from "../../lib/img/Qualify.mp4";

import Rave from "../../lib/img/rave.png";
import Rave2 from "../../lib/img/rave2.png";
import Rave3 from "../../lib/img/rave3.png";

export default function QualitfyPart() {
  const cards = [
    createTextCard("REACT"),
    createImageCard(Rave, "image illustration"),
    createTextCard("NEXT.JS"),
    createImageCard(Rave2, "image illustration"),
    createImageCard(Rave3, "image illustration"),
    createTextCard("LARAVEL"),
    createImageCard(Rave, "image illustration"),

    createTextCard("BDD / SQL"),

    createTextCard("DOCKER"),
    createImageCard(Rave2, "image illustration"),

    createTextCard("PYTHON"),
    createImageCard(Rave3, "image illustration"),
    createImageCard(Rave, "image illustration"),

    createTextCard("GIT / GITHUB"),
    createImageCard(Rave2, "image illustration"),
    createTextCard("LINUX"),
  ];

  return {
    type: "section",

    attributes: [
      [
        "class",
        ["w-full", "min-h-screen", "flex", "items-center", "justify-center"],
      ],
      ["id", "qualifyPart"],
    ],

    children: [
      {
        type: "div",

        attributes: [
          [
            "class",
            [
              "relative",
              "w-full",
              "min-h-screen",
              "overflow-hidden",
              "bg-black",
            ],
          ],
        ],

        children: [
          // Vidéo de fond
          {
            type: "video",

            attributes: [
              ["src", QualifyVideo],
              ["autoplay", true],
              ["loop", true],
              ["muted", true],
              ["playsinline", true],

              [
                "class",
                [
                  "absolute",
                  "inset-0",
                  "z-0",
                  "block",
                  "w-full",
                  "h-full",
                  "object-cover",
                  "contrast-110",
                  "brightness-90",
                  "saturate-75",
                  "sepia-[0.12]",
                ],
              ],
            ],

            children: [],
          },

          // Teinte orange
          {
            type: "div",

            attributes: [
              [
                "class",
                [
                  "absolute",
                  "inset-0",
                  "z-10",
                  "pointer-events-none",
                  "bg-[#d97706]",
                  "opacity-25",
                  "mix-blend-color",
                ],
              ],
            ],

            children: [],
          },

          // Grain argentique
          {
            type: "div",

            attributes: [
              [
                "class",
                [
                  "film-grain",
                  "absolute",
                  "inset-0",
                  "z-20",
                  "pointer-events-none",
                  "opacity-30",
                  "mix-blend-overlay",
                ],
              ],
            ],

            children: [],
          },

          // Rayures et défauts de pellicule
          {
            type: "div",

            attributes: [
              [
                "class",
                [
                  "film-scratches",
                  "absolute",
                  "inset-0",
                  "z-30",
                  "pointer-events-none",
                  "opacity-20",
                ],
              ],
            ],

            children: [],
          },

          // Grille transparente : 4 colonnes × 3 lignes
          {
            type: "div",

            attributes: [
              [
                "class",
                [
                  "absolute",
                  "inset-0",
                  "z-40",
                  "grid",
                  "grid-cols-4",
                  "grid-rows-4",
                ],
              ],
            ],

            children: cards,
          },

          // Titre central
          {
            type: "h2",

            attributes: [
              [
                "class",
                [
                  "absolute",
                  "left-1/2",
                  "top-1/2",
                  "-translate-x-1/2",
                  "-translate-y-1/2",
                  "z-20",
                  "text-center",
                  "text-[#fffdd8]",
                  "text-[17rem]",
                  "font-[HurricaneCustom]",
                  "tracking-[0.15em]",
                  "leading-none",
                  "whitespace-nowrap",
                  "pointer-events-none",
                  "opacity-20",
                ],
              ],
            ],

            children: ["QUALIFY"],
          },
        ],
      },
    ],
  };
}
