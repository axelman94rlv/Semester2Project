import Sun from "../../lib/img/axel/sun.svg";
import City from "../../lib/img/axel/city.svg";
import HexUnite from "../../lib/img/axel/hexagone_unite.svg";
import Portrait from "../../lib/img/axel/profil.png";

import generateStructure from "../../lib/generate-structure.js";
import ProfileCard, { closeProfileCard } from "./components/profilecard.js";

// --- Hero : parallaxe pilotée par le scroll --------------------------------
// Le soleil descend, franchit la ligne d'horizon (div violette = couleur du
// fond) dont le raccord est planqué derrière les hexagones -> il disparait.
// Le portrait glisse ensuite de derrière cette ligne jusqu'à sa place, s'y
// fige un instant, puis repart avec la page.
// Aucune opacité, tout est réversible (remonter = rembobiner).

// Réglages (en fraction de hauteur d'écran) -----------------------------------
const RUN = 0.6; // longueur de scroll de l'animation (en écrans)
const SUN_TRAVEL = 1.2; // distance de descente totale du soleil
// Portrait : timeline propre, indépendante du soleil -------------------------
const PORTRAIT_START = 0.5; // écrans de scroll avant qu'il commence à sortir
const PORTRAIT_SLIDE = 0.55; // écrans de scroll que dure la descente
const PORTRAIT_RISE = 0.55; // de combien il part au-dessus de sa place
const PORTRAIT_Y = 0.6; // où il se pose (fraction d'écran)
const DWELL = 0.6; // écrans de scroll où il reste figé avant de repartir
const CITY_PARALLAX = 0.6; // 0 = fixe, 1 = suit le scroll

// Fiche profil (clic sur le portrait) ----------------------------------------
const CARD_SHIFT = "14rem"; // recul du portrait, fiche fermée
const CARD_SHIFT_OPEN = "27rem"; // recul du portrait, fiche dépliée
const CARD_GAP = "2rem"; // espace entre le portrait et la fiche

let cardShown = false;
let cardMounted = false;

let heroAnimSetup = false;
let rafId = null;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function updateHero() {
  rafId = null;

  const section = document.getElementById("hero");
  const scene = document.querySelector('[data-scene="hero"]');
  if (!section || !scene) return;

  const celestial = scene.querySelector("[data-celestial]");
  const horizon = scene.querySelector("[data-horizon]");
  const cityscape = scene.querySelector("[data-cityscape]");
  const portrait = document.querySelector("[data-portrait]");
  if (!celestial || !horizon || !cityscape || !portrait) return;

  const vh = window.innerHeight;
  const rect = section.getBoundingClientRect();
  const run = vh * RUN;
  const scrolled = Math.max(0, -rect.top); // scroll BRUT (non plafonné)
  const s = Math.min(scrolled, run); // plafonné pour l'animation
  const p = s / run; // progression 0 → 1

  // soleil : descend et passe sous la ligne d'horizon → masqué
  const sunY = p * vh * SUN_TRAVEL;
  celestial.style.transform = `translate(-50%, ${sunY}px)`;

  // ville + hexagones + horizon : solidaires, parallaxe douce
  const slow = `translateY(${s * CITY_PARALLAX}px)`;
  cityscape.style.transform = slow;
  horizon.style.transform = slow;

  // portrait : glisse de derrière la ligne d'horizon jusqu'à sa place, s'y
  // fige un instant, puis repart avec la page.
  const slide = clamp(
    (scrolled - vh * PORTRAIT_START) / (vh * PORTRAIT_SLIDE),
    0,
    1,
  );
  portrait.hidden = slide <= 0;

  const lock = vh * (PORTRAIT_START + PORTRAIT_SLIDE + DWELL);
  const past = Math.max(0, scrolled - lock);

  // Le portrait vit DANS l'horizon (pour être rogné par la ligne), mais on le
  // veut positionné par rapport à l'écran : on retranche la position écran du
  // haut de l'horizon, qui défile en parallaxe.
  const horizonTop = rect.top + vh + s * CITY_PARALLAX;
  const centerY = vh * (PORTRAIT_Y - PORTRAIT_RISE * (1 - slide)) - past;
  portrait.style.transform = `translate(-50%, -50%) translateY(${centerY - horizonTop}px)`;
}

function onScroll() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(updateHero);
}

// --- fiche profil : affichage/masquage au clic sur le portrait --------------
async function toggleProfileCard() {
  const dock = document.querySelector("[data-portraitdock]");
  const slot = document.querySelector("[data-cardslot]");
  if (!dock || !slot) return;

  // le hero ne possède que le recul du portrait ; la fiche gère son propre
  // dépliement et nous rappelle via onToggle pour qu'on ajuste ce recul.
  const shift = (open) => {
    dock.style.transform = `translateX(-${open ? CARD_SHIFT_OPEN : CARD_SHIFT})`;
  };

  if (!cardMounted) {
    cardMounted = true;
    slot.appendChild(generateStructure(await ProfileCard({ onToggle: shift })));
  }

  cardShown = !cardShown;
  if (!cardShown) closeProfileCard(); // on masque toujours en état replié

  dock.style.transform = cardShown ? `translateX(-${CARD_SHIFT})` : "";
  slot.style.opacity = cardShown ? "1" : "0";
  slot.style.pointerEvents = cardShown ? "auto" : "none";
}

function setupHeroAnim() {
  if (!heroAnimSetup) {
    heroAnimSetup = true;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  // le DOM est rendu juste après l'appel du composant → on rejoue l'init
  requestAnimationFrame(() => requestAnimationFrame(updateHero));
  setTimeout(updateHero, 100);
  setTimeout(updateHero, 400);
}

// ---------------------------------------------------------------------------

export default function HeroPart() {
  setupHeroAnim();

  return {
    type: "section",
    attributes: [
      ["id", "hero"],
      [
        "class",
        ["relative", "z-0", "h-[300vh]", "overflow-hidden", "bg-[#3d0066]"],
      ],
    ],
    children: [
      {
        type: "div",
        attributes: [
          ["data-scene", "hero"],
          ["class", ["absolute", "inset-0"]],
        ],
        children: [
          // 1. soleil (derrière tout)
          {
            type: "div",
            attributes: [
              ["data-celestial", "true"],
              [
                "class",
                [
                  "absolute",
                  "left-1/2",
                  "-translate-x-1/2",
                  "top-[10vh]",
                  "z-10",
                  "w-[115vh]",
                  "h-[115vh]",
                  "will-change-transform",
                ],
              ],
            ],
            children: [
              {
                type: "img",
                attributes: [
                  ["src", Sun],
                  ["alt", ""],
                  ["data-sun", "true"],
                  [
                    "class",
                    [
                      "absolute",
                      "inset-0",
                      "block",
                      "w-full",
                      "h-full",
                      "max-w-none",
                    ],
                  ],
                ],
              },
            ],
          },

          // 2. ligne d'horizon : plan violet qui masque le soleil en bas.
          //    Il héberge aussi le portrait : overflow-hidden → tout ce qui
          //    remonte au-dessus de la ligne est rogné par elle.
          {
            type: "div",
            attributes: [
              ["data-horizon", "true"],
              [
                "class",
                [
                  "absolute",
                  "left-0",
                  "top-[100vh]", // glisse-la sous les hexagones
                  "w-full",
                  "h-[300vh]",
                  "z-[15]",
                  "bg-[#3d0066]",
                  "overflow-hidden",
                  "will-change-transform",
                ],
              ],
            ],
            children: [
              // portrait : enfant de l'horizon → rogné par la ligne, et derrière
              // les hexagones (z-20). Position écran recalculée à chaque frame.
              // [data-portrait]     : porte la transform du SCROLL (rAF)
              // [data-portraitdock] : porte le décalage du CLIC (transition)
              {
                type: "div",
                attributes: [
                  ["data-portrait", "true"],
                  ["hidden", "true"],
                  [
                    "class",
                    ["absolute", "left-1/2", "top-0", "will-change-transform"],
                  ],
                ],
                children: [
                  {
                    type: "div",
                    attributes: [
                      ["data-portraitdock", "true"],
                      [
                        "class",
                        [
                          "relative",
                          "transition-transform",
                          "duration-500",
                          "ease-out",
                        ],
                      ],
                    ],
                    children: [
                      // le portrait rond (cliquable)
                      {
                        type: "div",
                        attributes: [
                          [
                            "class",
                            [
                              "w-[60vh]",
                              "h-[60vh]",
                              "rounded-full",
                              "overflow-hidden",
                              "cursor-pointer",
                            ],
                          ],
                        ],
                        events: [["click", toggleProfileCard]],
                        children: [
                          {
                            type: "img",
                            attributes: [
                              ["src", Portrait],
                              ["alt", "Axel Barbellion"],
                              [
                                "class",
                                ["block", "w-full", "h-full", "object-cover"],
                              ],
                            ],
                          },
                        ],
                      },

                      // la fiche : collée à droite du portrait, remplie au 1er clic
                      {
                        type: "div",
                        attributes: [
                          ["data-cardslot", "true"],
                          [
                            "class",
                            [
                              "absolute",
                              "left-full",
                              "top-1/2",
                              "-translate-y-1/2",
                              "opacity-0",
                              "pointer-events-none",
                              "transition-opacity",
                              "duration-500",
                            ],
                          ],
                          ["style", [["marginLeft", CARD_GAP]]],
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // 3. bloc ville + hexagones (solidaires, hexagones AU-DESSUS et remontés)
          {
            type: "div",
            attributes: [
              ["data-cityscape", "true"],
              [
                "class",
                [
                  "absolute",
                  "left-0",
                  "top-[45vh]",
                  "w-full",
                  "z-20",
                  "will-change-transform",
                ],
              ],
            ],
            children: [
              {
                type: "img",
                attributes: [
                  ["src", City],
                  ["alt", ""],
                  ["class", ["relative", "z-10", "block", "w-full"]],
                ],
              },
              {
                type: "img",
                attributes: [
                  ["src", HexUnite],
                  ["alt", ""],
                  [
                    "class",
                    ["relative", "z-30", "block", "w-full", "-mt-[15vh]"],
                  ],
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
