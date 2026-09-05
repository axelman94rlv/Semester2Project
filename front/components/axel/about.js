import HexaBackground from "../../lib/img/axel/hexa_background.svg";

// Géométrie de hexa_background.svg (1440 × 1973) ----------------------------
// En w-full, l'image fait 1973/1440 = 137.01% de la largeur de la fenêtre.
const IMG_H = "137.01vw";

// Le champ dense d'hexagones commence à y=295, soit 20.49vw sous le haut du
// fichier. En remontant l'image d'exactement ça, il démarre pile à la limite
// des sections : rien d'opaque ne mord sur le portrait du hero. C'est le
// plancher — descendre plus bas rouvrirait un vide au-dessus du champ.
const OVERLAP = "40vw";

// Gouttière latérale : 80px à 1440, la même que la carte de la maquette.
const SIDE = "5.56vw";

// Où commence le contenu dans le fond, mesuré depuis le haut de la section.
const CONTENT_TOP = "-20vw"; // 0.00vw : le fond est déjà bien positionné

/**
 * Coquille de la section « à propos » : le fond hexagonal et la gouttière.
 * Les composants de la section se passent en argument.
 *   AboutPart([Description(), Stack(), ...])
 */
export default function AboutPart(children = []) {
  return {
    type: "section",
    attributes: [
      ["id", "a-propos"],
      // z-10 : passe au-dessus du hero, qui est confiné en z-0
      ["class", ["relative", "z-10", "w-full"]],
    ],

    children: [
      // ---------- fond : hexagones seuls, sur la transparence ----------
      // Le violet vient du <main>. Rien d'opaque ici, donc seules les formes
      // de l'illustration passent par-dessus le hero.
      {
        type: "img",
        attributes: [
          ["src", HexaBackground],
          ["alt", ""],
          [
            "class",
            [
              "absolute",
              "left-0",
              "block",
              "w-full",
              "select-none",
              "pointer-events-none",
            ],
          ],
          ["style", [["top", `-${OVERLAP}`]]], // déborde sur le hero
        ],
      },

      // ---------- contenu ----------
      // L'image est en absolute et ne donne donc pas sa hauteur à la section :
      // le min-height la reprend, moins la part qui déborde sur le hero.
      {
        type: "div",
        attributes: [
          ["class", ["relative", "z-10", "flex", "flex-col", "pb-[12vw]"]],
          [
            "style",
            [
              ["minHeight", `calc(${IMG_H} - ${OVERLAP})`],
              ["paddingLeft", SIDE],
              ["paddingRight", SIDE],
              ["top", CONTENT_TOP],
            ],
          ],
        ],
        children,
      },
    ],
  };
}
