import Rote from "../../lib/img/Rote.svg";
import Roue from "./elements/roue";


export default function CreatifPart() {
  function getElements(box) {
    return {
      background: box.querySelector(".creative-box-background"),
      title: box.querySelector(".creative-title"),
      hoverText: box.querySelector(".creative-hover-text"),
      image: box.parentElement?.querySelector(".creative-image"),
    };
  }

  function onMouseEnter(event) {
    const box = event.currentTarget;
    const { background, title, hoverText, image } = getElements(box);

    if (background) {
      background.style.transform = "scale(1.6)";
      background.style.backgroundColor = "#fffdd8";
    }

    if (title) {
      title.style.opacity = "0";
    }

    if (hoverText) {
      hoverText.style.opacity = "1";
    }

    if (image) {
      image.style.zIndex = "20";
      image.style.opacity = "0.1";
    }
  }

  function onMouseLeave(event) {
    const box = event.currentTarget;
    const { background, title, hoverText, image } = getElements(box);

    if (background) {
      background.style.transform = "scale(1)";
      background.style.backgroundColor = "#000000";
    }

    if (title) {
      title.style.opacity = "1";
    }

    if (hoverText) {
      hoverText.style.opacity = "0";
    }

    if (image) {
      image.style.zIndex = "0";
      image.style.opacity = "0.4";
    }
  }

  return {
    type: "section",
    attributes: [
      [
        "class",
        [
          "w-full",
          "min-h-screen",
          "flex",
          "items-center",
          "justify-center",
        ],
      ],
      ["id" , "creatifSection"]
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
        "max-w-[90rem]",
        "h-[62rem]",
        "flex",
        "items-center",
        "justify-center",
      ],
    ],
  ],

  children: [
    // Roue gauche
    {
      type: "div",
      attributes: [
        [
          "class",
          [
            "absolute",
            "left-[8rem]",
            "top-1/2",
            "-translate-y-1/2",
            "z-30",
          ],
        ],
      ],
      children: [Roue("B")],
    },

    // Image centrale
    {
      type: "img",
      attributes: [
        ["src", Rote],
        ["alt", "Décoration abstraite"],
        [
          "class",
          [
            "creative-image",
            "absolute",
            "left-1/2",
            "top-1/2",
            "-translate-x-1/2",
            "-translate-y-1/2",
            "z-0",
            "w-[62rem]",
            "max-w-none",
            "opacity-40",
            "pointer-events-none",
            "transition-opacity",
            "duration-300",
            "ease-out",
          ],
        ],
      ],
    },

    // Roue droite
    {
      type: "div",
      attributes: [
        [
          "class",
          [
            "absolute",
                "right-[8rem]",
            "top-1/2",
            "-translate-y-1/2",
            "z-30",
          ],
        ],
      ],
      children: [Roue("R")],
    },

    // Box Créatif
    {
      type: "div",
      attributes: [
        [
          "class",
          [
            "creative-container",
            "relative",
            "-translate-y-[7rem]",
            "z-10",
            "w-[40rem]",
            "h-[8.3rem]",
            "flex",
            "items-center",
            "justify-center",
            "cursor-pointer",
          ],
        ],
      ],

      events: [
        ["mouseenter", onMouseEnter],
        ["mouseleave", onMouseLeave],
      ],

      children: [
        {
          type: "div",
          attributes: [
            [
              "class",
              [
                "creative-box-background",
                "absolute",
                "inset-0",
                "z-10",
                "bg-black",
                "origin-center",
                "transition-[transform,background-color]",
                "duration-300",
                "ease-out",
              ],
            ],
          ],
          children: [],
        },

        {
          type: "h2",
          attributes: [
            [
              "class",
              [
                "creative-title",
                "absolute",
                "inset-0",
                "z-40",
                "flex",
                "items-center",
                "justify-center",
                "font-[HurricaneCustom]",
                "text-[16rem]",
                "text-[#fffdd8]",
                "text-center",
                "leading-none",
                "whitespace-nowrap",
                "pointer-events-none",
                "transition-opacity",
                "duration-300",
                "ease-out",
              ],
            ],
          ],
          children: ["Creatif"],
        },

        {
          type: "div",
          attributes: [
            [
              "class",
              [
                "creative-hover-text",
                "absolute",
                "inset-0",
                "z-40",
                "flex",
                "flex-col",
                "items-center",
                "justify-center",
                "gap-4",
                "px-8",
                "text-center",
                "text-[#171717]",
                "opacity-0",
                "pointer-events-none",
                "transition-opacity",
                "duration-300",
                "ease-out",
              ],
            ],
          ],

          children: [
            {
              type: "h3",
              attributes: [
                [
                  "class",
                  [
                    "font-[HurricaneCustom]",
                    "text-[4rem]",
                    "leading-none",
                  ],
                ],
              ],
              children: ["About me"],
            },

            {
              type: "p",
              attributes: [
                [
                  "class",
                  [
                    "max-w-[34rem]",
                    "text-[1.4rem]",
                    "font-sans",
                    "leading-relaxed",
                  ],
                ],
              ],
              children: [
                "I am a web developer working in a healthcare company. I am creative, motivated, and always looking for ways to improve my skills.",
              ],
            },
          ],
        },
      ],
    },
  ],
}
    ],
  };
}