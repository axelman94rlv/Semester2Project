export default () => ({
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
            "gap-[2.5rem]",

            "text-center",

            "before:content-['']",
            "before:absolute",
            "before:left-0",
            "before:top-0",
            "before:w-full",
            "before:h-px",
            "before:bg-[linear-gradient(to_right,_#f5f1d8_0_48px,_transparent_48px_72px)]",
            "before:bg-[length:72px_1px]",

            "after:content-['']",
            "after:absolute",
            "after:left-0",
            "after:bottom-0",
            "after:w-full",
            "after:h-px",
            "after:bg-[linear-gradient(to_right,_#f5f1d8_0_48px,_transparent_48px_72px)]",
            "after:bg-[length:72px_1px]",
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
                "absolute",
                "left-0",
                "top-0",
                "h-full",
                "w-px",
                "bg-[linear-gradient(to_bottom,_#f5f1d8_0_48px,_transparent_48px_72px)]",
                "bg-[length:1px_72px]",
                "pointer-events-none",
              ],
            ],
          ],
        },

        {
          type: "div",
          attributes: [
            [
              "class",
              [
                "absolute",
                "right-0",
                "top-0",
                "h-full",
                "w-px",
                "bg-[linear-gradient(to_bottom,_#f5f1d8_0_48px,_transparent_48px_72px)]",
                "bg-[length:1px_72px]",
                "pointer-events-none",
              ],
            ],
          ],
        },

        {
          type: "p",
          attributes: [
            [
              "class",
              [
                "relative",
                "z-10",
                "text-[1rem]",
                "uppercase",
                "tracking-[0.45em]",
                "text-[#f5f1d8]/60",
              ],
            ],
          ],
          children: ["error"],
        },

        {
          type: "h1",
          attributes: [
            [
              "class",
              [
                "relative",
                "z-10",
                "text-[clamp(6rem,18vw,16rem)]",
                "leading-none",
                "font-light",
                "tracking-[-0.08em]",
              ],
            ],
          ],
          children: ["404"],
        },

        {
          type: "h2",
          attributes: [
            [
              "class",
              [
                "relative",
                "z-10",
                "text-[2rem]",
                "md:text-[2.8rem]",
                "leading-none",
                "font-light",
              ],
            ],
          ],
          children: ["Page introuvable"],
        },

        {
          type: "p",
          attributes: [
            [
              "class",
              [
                "relative",
                "z-10",
                "max-w-[38rem]",
                "text-[1.1rem]",
                "leading-[1.8]",
                "text-[#f5f1d8]/70",
              ],
            ],
          ],
          children: [
            "La page que vous cherchez semble avoir disparu, changé d’adresse ou n’existe pas encore.",
          ],
        },

        {
          type: "a",
          attributes: [
            ["href", "/"],
            [
              "class",
              [
                "relative",
                "z-10",
                "mt-[1rem]",
                "px-[2.5rem]",
                "py-[1rem]",
                "border",
                "border-[#f5f1d8]",
                "text-[#f5f1d8]",
                "text-[1.1rem]",
                "uppercase",
                "tracking-[0.18em]",
                "transition-all",
                "duration-300",
                "hover:bg-[#f5f1d8]",
                "hover:text-black",
              ],
            ],
          ],
          children: ["Retour accueil"],
        },
      ],
    },
  ],
});