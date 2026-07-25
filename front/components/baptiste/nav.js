import Link from "../../components/router/link.js";
import Logo from "../../lib/img/Signature.svg";

export function NavBar() {
  const linkStyle = [
    "flex",
    "items-center",
    "justify-center",

    "w-full",
    "h-[5.6rem]",

    "border-b",
    "border-white",

    "text-white",
    "text-[28px]",
    "font-['InconsolataCustom']",
    "font-black",
    "font-medium",
  ];

  return {
    type: "nav",
    attributes: [
      [
        "class",
        [
          "fixed",
          "top-0",
          "left-0",
          "h-screen",
          "w-[4.6rem]",

          "after:content-['']",
          "after:absolute",
          "after:right-0",
          "after:top-0",
          "after:h-full",
          "after:w-px",
          "after:bg-[linear-gradient(to_bottom,_white_0_15px,_transparent_5px_5px)]",
          "after:bg-[length:1px_30px]",
        ],
      ],
    ],
    children: [
      {
        type: "section",
        attributes: [
          [
            "class",
            ["flex", "flex-col", "w-full", "items-center", "text-center"],
          ],
        ],
        children: [
          Link(
            "/",
            {
              type: "img",
              attributes: [
                ["src", Logo],
                ["alt", "Logo"],
                ["class", ["w-[4rem]", "h-[4rem]"]],
              ],
            },
            [["class", [...linkStyle, "h-[9rem]"]]],
          ),
          Link("/", "01", [["class", linkStyle]]),
          Link("/", "02", [["class", linkStyle]]),
          Link("/", "03", [["class", linkStyle]]),
          Link("/", "04", [["class", linkStyle]]),
          Link("/", "05", [["class", linkStyle]]),
        ],
      },
    ],
  };
}
