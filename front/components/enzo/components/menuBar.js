import appleLogo from "../../../lib/img/enzo/apple-logo.svg";
import wifiIcon from "../../../lib/img/enzo/menu-wifi.svg";
import searchIcon from "../../../lib/img/enzo/menu-search.svg";
import personIcon from "../../../lib/img/enzo/menu-person.svg";
import controlIcon from "../../../lib/img/enzo/menu-control.svg";

function MenuLabel(text, { bold = false } = {}) {
  return {
    type: "div",
    attributes: [["class", ["px-[11px]", "py-[4px]", "rounded-[4px]"]]],
    children: [
      {
        type: "span",
        attributes: [
          [
            "class",
            [
              "text-[13px]",
              "leading-[16px]",
              "text-white",
              bold ? "font-bold" : "font-semibold",
              "[text-shadow:0_1px_6px_rgba(0,0,0,0.35)]",
              "whitespace-nowrap",
            ],
          ],
        ],
        children: [text],
      },
    ],
  };
}

function MenuIcon(src, alt) {
  return {
    type: "div",
    attributes: [["class", ["px-[10px]", "py-[4px]", "flex", "items-center"]]],
    children: [
      {
        type: "img",
        attributes: [
          ["src", src],
          ["alt", alt],
          ["class", ["h-[15px]", "w-auto", "opacity-90"]],
        ],
      },
    ],
  };
}

export function MenuBar() {
  return {
    type: "header",
    attributes: [
      [
        "class",
        [
          "enzo-sf",
          "fixed",
          "top-0",
          "left-0",
          "z-50",
          "w-full",
          "h-[32px]",
          "flex",
          "items-center",
          "justify-between",
          "px-[10px]",
          "bg-black/10",
          "backdrop-blur-md",
        ],
      ],
    ],
    children: [
      {
        type: "div",
        attributes: [["class", ["flex", "items-center"]]],
        children: [
          {
            type: "div",
            attributes: [
              ["class", ["px-[11px]", "py-[4px]", "flex", "items-center"]],
            ],
            children: [
              {
                type: "img",
                attributes: [
                  ["src", appleLogo],
                  ["alt", "Apple"],
                  ["class", ["h-[16px]", "w-auto"]],
                ],
              },
            ],
          },
          MenuLabel("Portfolio", { bold: true }),
          MenuLabel("Figma"),
          MenuLabel("2026"),
        ],
      },

      {
        type: "div",
        attributes: [["class", ["flex", "items-center"]]],
        children: [
          MenuIcon(wifiIcon, "Wi-Fi"),
          MenuIcon(searchIcon, "Recherche"),
          MenuIcon(personIcon, "Compte"),
          MenuIcon(controlIcon, "Centre de contrôle"),
          MenuLabel("Enzo Moita"),
        ],
      },
    ],
  };
}

export default MenuBar;
