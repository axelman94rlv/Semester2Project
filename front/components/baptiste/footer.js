export default function Footer() {
  return {
    type: "footer",

    attributes: [
      [
        "class",
        [
          "relative",
          "w-full",
          "h-[8rem]",
          "flex",
          "items-center",
          "justify-center",
          "text-[#f5f1d8]",
          "font-['InconsolataCustom']",
          "overflow-hidden",

          "before:content-['']",
          "before:absolute",
          "before:left-0",
          "before:top-0",
          "before:w-full",
          "before:h-px",
          "before:bg-[#f5f1d8]",
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
              "flex",
              "items-center",
              "justify-center",
              "gap-[2.5rem]",
              "text-[1.35rem]",
              "tracking-[0.03em]",
            ],
          ],
        ],

        children: [
          {
            type: "p",
            attributes: [
              [
                "class",
                [
                  "text-[#f5f1d8]",
                  "font-light",
                  "whitespace-nowrap",
                ],
              ],
            ],
            children: ["Baptiste ROY - Paris - Développeur WEB"],
          },

          {
            type: "div",
            attributes: [
              [
                "class",
                [
                  "flex",
                  "items-center",
                  "gap-[1.6rem]",
                ],
              ],
            ],
            children: [
              {
                type: "a",
                attributes: [
                  ["href", "https://www.linkedin.com/"],
                  ["target", "_blank"],
                  ["rel", "noopener noreferrer"],
                  [
                    "class",
                    [
                      "text-[#f5f1d8]",
                      "hover:opacity-60",
                      "transition-opacity",
                      "duration-300",
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
                          "text-[1.4rem]",
                          "font-bold",
                        ],
                      ],
                    ],
                    children: ["in"],
                  },
                ],
              },

              {
                type: "a",
                attributes: [
                  ["href", "https://github.com/"],
                  ["target", "_blank"],
                  ["rel", "noopener noreferrer"],
                  [
                    "class",
                    [
                      "text-[#f5f1d8]",
                      "hover:opacity-60",
                      "transition-opacity",
                      "duration-300",
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
                          "text-[1.45rem]",
                          "font-bold",
                        ],
                      ],
                    ],
                    children: ["◉"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}