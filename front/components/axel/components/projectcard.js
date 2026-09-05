import { MaskedIcon } from "./button.js";
import Logo from "../../../lib/img/axel/logo_unicolor.svg";
import Arrow from "../../../lib/img/axel/arrow.svg";

// Carte projet du carrousel (proportions de card.svg, hauteur portée à 700).
// Alimentée par la collection Payload `axel-projects`.

// --- Rythme vertical --------------------------------------------------------
// Le corps a une hauteur AUTOMATIQUE : c'est l'espaceur, sous lui, qui absorbe
// le mou. Les écarts ci-dessous sont donc de vrais écarts — les augmenter
// décale les blocs, ça ne rogne jamais le texte.
//
//   700 = 125 (bandeau) + GAP_TITLE + 36 (titre) + GAP_BODY + corps
//       + [espaceur élastique, au moins GAP_BUTTON]
//       + 54 (bouton) + GAP_LOGO + 57 (logo) + BOTTOM
//
// Il reste ~301px au corps, soit 9 lignes à 32px d'interligne.
const CARD_W = "31.5rem"; // 504px
const CARD_H = "43.75rem"; // 700px
const HEADER_H = "6rem"; // 125px, relevé sur la maquette
const GAP_TITLE = "2.5rem"; // bandeau → titre
const GAP_BODY = "1.5rem"; // titre   → description
const GAP_BUTTON = "1.5rem"; // corps   → bouton (écart MINIMUM)
const GAP_LOGO = "1.4375rem"; // bouton  → logo
const BOTTOM = "2.5rem"; // logo    → bas de carte
const SIDE = "2.125rem"; // 34px : gouttière, celle du bouton sur la maquette

// --- Typographie ------------------------------------------------------------
const BODY_SIZE = "1.75rem"; // 28px, relevé sur la maquette
const BODY_LEADING = "2rem"; // 32px (la maquette dit 25px : illisible)

/**
 * @param {object} project   doc axel-projects
 * @param {number} position  numéro affiché dans le bandeau (01, 02, …)
 * @param {function} onOpen  callback « Afficher plus » (optionnel)
 */
export default function ProjectCard(project, position = 1, onOpen = null) {
  const num = String(position).padStart(2, "0");

  return {
    type: "article",
    attributes: [
      [
        "class",
        [
          "rounded-[2.1875rem]",
          "bg-[#C86BFA]/[0.14]",
          "border",
          "border-[#C86BFA]",
          "overflow-hidden",
          "flex",
          "flex-col",
        ],
      ],
      [
        "style",
        [
          ["width", CARD_W],
          ["height", CARD_H],
        ],
      ],
    ],
    children: [
      // ---------- bandeau : le numéro, seul et centré ----------
      {
        type: "header",
        attributes: [
          [
            "class",
            [
              "shrink-0",
              "flex",
              "items-center",
              "justify-center",
              "border-b",
              "border-[#C86BFA]",
              "bg-gradient-to-tr",
              "from-[#C86BFA]/[0.16]",
              "to-transparent",
              "font-['AudiowideCustom']",
              "text-[1.875rem]",
              "text-[#FDC500]",
              "leading-none",
            ],
          ],
          ["style", [["height", HEADER_H]]],
        ],
        children: "0" + [num],
      },

      // ---------- titre ----------
      {
        type: "h3",
        attributes: [
          [
            "class",
            [
              "shrink-0",
              "text-center",
              "font-['AudiowideCustom']",
              "text-[1.875rem]",
              "leading-[2.25rem]",
              "text-[#FDC500]",
            ],
          ],
          [
            "style",
            [
              ["paddingTop", GAP_TITLE],
              ["paddingLeft", SIDE],
              ["paddingRight", SIDE],
            ],
          ],
        ],
        children: [project?.title ?? ""],
      },

      // ---------- corps : hauteur automatique, il ne se fait plus rogner ----------
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "shrink-0",
              "text-center",
              "font-['InconsolataCustom']",
              "text-white",
              "whitespace-pre-line",
            ],
          ],
          [
            "style",
            [
              ["marginTop", GAP_BODY],
              ["paddingLeft", SIDE],
              ["paddingRight", SIDE],
              ["fontSize", BODY_SIZE],
              ["lineHeight", BODY_LEADING],
            ],
          ],
        ],
        children: [project?.shortDescription ?? ""],
      },

      // ---------- espaceur : c'est LUI qui encaisse le mou ----------
      {
        type: "div",
        attributes: [
          ["class", ["flex-1"]],
          ["style", [["minHeight", GAP_BUTTON]]],
        ],
      },

      // ---------- « Afficher plus » ----------
      {
        type: "div",
        attributes: [
          ["class", ["shrink-0"]],
          [
            "style",
            [
              ["paddingLeft", SIDE],
              ["paddingRight", SIDE],
            ],
          ],
        ],
        children: [
          {
            type: "button",
            attributes: [
              ["type", "button"],
              [
                "class",
                [
                  "group",
                  "w-full",
                  "h-[3.375rem]", // 54px
                  "inline-flex",
                  "items-center",
                  "justify-center",
                  "gap-[0.75rem]",
                  "border-[4px]",
                  "border-[#C86BFA]",
                  "text-[#C86BFA]",
                  "font-['AudiowideCustom']",
                  "text-[1.875rem]",
                  "leading-none",
                  "cursor-pointer",
                  "transition-colors",
                  "duration-200",
                  "hover:border-[#FFEE32]",
                  "hover:text-[#FFEE32]",
                ],
              ],
            ],
            events: onOpen ? [["click", () => onOpen(project)]] : [],
            children: ["Afficher plus", MaskedIcon(Arrow, "1.6rem")],
          },
        ],
      },

      // ---------- logo, en bas et centré ----------
      {
        type: "img",
        attributes: [
          ["src", Logo],
          ["alt", ""],
          [
            "class",
            [
              "block",
              "shrink-0",
              "mx-auto",
              "w-[6.4375rem]", // 103px
              "select-none",
              "pointer-events-none",
            ],
          ],
          [
            "style",
            [
              ["marginTop", GAP_LOGO],
              ["marginBottom", BOTTOM],
            ],
          ],
        ],
      },
    ],
  };
}
