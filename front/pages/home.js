import Link from "../components/router/link.js";

export default function HomePage() {
  const linkStyle = [
    "w-full",
    "max-w-[28rem]",
    "px-[2.5rem]",
    "py-[1.2rem]",
    "border",
    "border-[#f5f1d8]",
    "text-[#f5f1d8]",
    "text-[1.2rem]",
    "uppercase",
    "tracking-[0.18em]",
    "text-center",
    "font-['InconsolataCustom']",
    "transition-all",
    "duration-300",
    "hover:bg-[#f5f1d8]",
    "hover:text-black",
  ];

  return {
    type: "main",

    attributes: [
      [
        "class",
        [
          "w-full",
          "min-h-screen",
          "flex",
          "items-center",
          "justify-center",
          "px-[4rem]",
          "py-[6rem]",
          "bg-black",
          "text-[#f5f1d8]",
          "font-['InconsolataCustom']",
        ],
      ],
    ],

    children: [
      {
        type: "section",

        attributes: [
          [
            "class",
            [
              "relative",
              "w-full",
              "max-w-[72rem]",
              "min-h-[32rem]",
              "px-[4.5rem]",
              "py-[3.5rem]",
              "flex",
              "flex-col",
              "items-center",
              "justify-center",
              "gap-[3rem]",
              "text-center",
              "border",
              "border-dashed",
              "border-[#f5f1d8]",
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
                  "text-[1rem]",
                  "uppercase",
                  "tracking-[0.45em]",
                  "text-[#f5f1d8]/60",
                ],
              ],
            ],
            children: ["Semester Project"],
          },

          {
            type: "h1",
            attributes: [
              [
                "class",
                [
                  "text-[clamp(3rem,8vw,8rem)]",
                  "leading-none",
                  "font-light",
                  "tracking-[-0.06em]",
                ],
              ],
            ],
            children: ["Portfolios"],
          },

          {
            type: "p",
            attributes: [
              [
                "class",
                [
                  "max-w-[42rem]",
                  "text-[1.2rem]",
                  "leading-[1.8]",
                  "text-[#f5f1d8]/70",
                ],
              ],
            ],
            children: [
              "Sélectionnez un portfolio pour découvrir les projets, compétences et expérimentations réalisées avec le framework Vanilla JS.",
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
                  "items-center",
                  "gap-[1.5rem]",
                  "mt-[1rem]",
                ],
              ],
            ],
            children: [
              Link("/baptiste/portfolio", "Portfolio Baptiste", [
                ["class", linkStyle],
              ]),

              Link("/axel/portfolio", "Portfolio Axel", [
                ["class", linkStyle],
              ]),

              Link("/enzo/portfolio", "Portfolio Enzo", [
                ["class", linkStyle],
              ]),
            ],
          },
        ],
      },
    ],
  };
}