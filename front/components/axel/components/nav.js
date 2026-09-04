import Link from "../../router/link.js";
import Logo from "../../../lib/img/axel/logo_unicolor.svg";

const NAV_LINKS = [
  ["#contact", "Contact"],
  ["#a-propos", "A propos"],
  ["#projets", "Projets"],
  ["#stack", "Stack"],
];

const linkStyle = [
  "font-['AudiowideCustom']",
  "text-[#03071E]",
  "text-[1.05rem]",
  "hover:opacity-60",
  "transition-opacity",
];

const bevelOuter =
  "[clip-path:polygon(0_0,100%_0,calc(100%_-_3.375rem)_100%,0_100%)]"; // 54px
const bevelInner =
  "[clip-path:polygon(0_0,100%_0,calc(100%_-_2.875rem)_100%,0_100%)]"; // 46px

export function NavBar() {
  return {
    type: "nav",
    attributes: [
      [
        "class",
        [
          "fixed",
          "top-0",
          "left-0",
          "z-50",
          "w-full",
          "h-[6.25rem]",
          "flex",
          "items-center",
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
              "relative",
              "z-10",
              "shrink-0",
              "w-[6.125rem]",
              "h-[6.25rem]",
              "bg-[#03071E]",
              "rounded-br-[3.125rem]",
              "flex",
              "items-center",
              "justify-center",
            ],
          ],
        ],
        children: [
          Link("/axel/portfolio", {
            type: "img",
            attributes: [
              ["src", Logo],
              ["alt", "Axel Barbellion"],
              ["class", ["w-[4.75rem]", "h-auto"]],
            ],
          }),
        ],
      },

      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "shrink-0",
              "-ml-[0.9375rem]",
              "h-[3.375rem]",
              "p-[4px]",
              "bg-[#03071E]",
              bevelOuter,
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
                  "h-full",
                  "bg-[#C86BFA]",
                  bevelInner,
                  "flex",
                  "items-center",
                  "gap-[1.875rem]",
                  "pl-[2rem]",
                  "pr-[4.75rem]",
                ],
              ],
            ],
            children: NAV_LINKS.map(([href, label]) =>
              Link(href, label, [["class", linkStyle]]),
            ),
          },
        ],
      },
    ],
  };
}
