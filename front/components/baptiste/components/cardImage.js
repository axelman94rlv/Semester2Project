import {
  onCardEnter,
  onCardLeave,
} from "./logique/card.js";


export default function createImageCard(image, alt = "") {

    return {
      type: "article",

      attributes: [
        [
          "class",
          [
            "relative",
            "min-w-0",
            "min-h-0",
            "overflow-hidden",
            "bg-transparent",
            "cursor-pointer",
          ],
        ],
      ],

      events: [
        ["mouseenter", onCardEnter],
        ["mouseleave", onCardLeave],
      ],

      children: [
        {
          type: "img",

          attributes: [
            ["src", image],
            ["alt", alt],

            [
              "class",
              [
                "qualify-card-hover",
                "absolute",
                "inset-0",
                "z-10",
                "block",
                "w-full",
                "h-full",
                "object-cover",
                "opacity-0",
                "scale-95",
                "transition-all",
                "duration-300",
                "ease-out",
              ],
            ],
          ],
        },
      ],
    };
  }