export default function createTextCard(text) {
    function onCardEnter(event) {
    const card = event.currentTarget;
    const hoverContent = card.querySelector(".qualify-card-hover");

    if (!hoverContent) return;

    hoverContent.style.opacity = "1";
    hoverContent.style.transform = "scale(1)";
  }

  function onCardLeave(event) {
    const card = event.currentTarget;
    const hoverContent = card.querySelector(".qualify-card-hover");

    if (!hoverContent) return;

    hoverContent.style.opacity = "0";
    hoverContent.style.transform = "scale(0.95)";
  }

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
        type: "div",

        attributes: [
          [
            "class",
            [
              "qualify-card-hover",
              "absolute",
              "inset-0",
              "z-10",
              "flex",
              "items-center",
              "justify-center",
              "bg-black",
              "px-8",
              "text-white",
              "opacity-0",
              "scale-95",
              "transition-all",
              "duration-300",
              "ease-out",
            ],
          ],
        ],

        children: [
          {
            type: "div",

            attributes: [
              [
                "class",
                [
                  "w-full",
                  "flex",
                  "items-center",
                  "justify-center",
                  "gap-4",
                ],
              ],
            ],

            children: [
              {
                type: "span",

                attributes: [
                  [
                    "class",
                    [
                      "block",
                      "shrink-0",
                      "w-2",
                      "h-2",
                      "rounded-full",
                      "bg-[#fffdd8]",
                    ],
                  ],
                ],

                children: [],
              },

              {
                type: "h3",

                attributes: [
                  [
                    "class",
                    [
                      "max-w-[20rem]",
                      "font-sans",
                      "text-[2rem]",
                      "font-medium",
                      "leading-relaxed",
                      "text-center",
                    ],
                  ],
                ],

                children: [text],
              },

              {
                type: "span",

                attributes: [
                  [
                    "class",
                    [
                      "block",
                      "shrink-0",
                      "w-2",
                      "h-2",
                      "rounded-full",
                      "bg-[#fffdd8]",
                    ],
                  ],
                ],

                children: [],
              },
            ],
          },
        ],
      },
    ],
  };
}