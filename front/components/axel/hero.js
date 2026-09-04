import Sun from "../../lib/img/axel/sun.svg";
import City from "../../lib/img/axel/city.svg";
import HexUnite from "../../lib/img/axel/hexagone_unite.svg";
import HexBreak from "../../lib/img/axel/hexagone_break.svg";
import Portrait from "../../lib/img/axel/profil.png";

// --- Hero : parallaxe pilotée par le scroll --------------------------------
// Le soleil descend, franchit la ligne d'horizon (div violette = couleur du
// fond) dont le raccord est planqué derrière les hexagones -> il disparait.
// Pile à ce moment les hexagones cassent (unite -> break) et le portrait sort
// juste en dessous, se fige un instant, puis repart avec la page.
// Aucune opacité, tout est réversible (remonter = rembobiner).

// Réglages (en fraction de hauteur d'écran) -----------------------------------
const RUN = 1.5; // longueur de scroll de l'animation (en écrans)
const SUN_TRAVEL = 1.6; // distance de descente totale du soleil
const BAND = 0.72; // descente du soleil à laquelle il entre dans les hexagones
const EMERGE = 0.5; // de combien le portrait ressort sous les hexagones
const DWELL = 0.6; // écrans de scroll où le portrait reste figé avant de repartir
const CITY_PARALLAX = 0.55; // 0 = fixe, 1 = suit le scroll

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
  const hexUnite = scene.querySelector("[data-hexunite]");
  const hexBreak = scene.querySelector("[data-hexbreak]");
  const portrait = document.querySelector("[data-portrait]");
  if (
    !celestial ||
    !horizon ||
    !cityscape ||
    !hexUnite ||
    !hexBreak ||
    !portrait
  )
    return;

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

  // hexagones : cassure NETTE dès que le soleil entre dedans (aucune opacité)
  const bandY = vh * BAND;
  hexUnite.hidden = sunY >= bandY;
  hexBreak.hidden = sunY < bandY;

  // portrait : sort juste sous les hexagones, se fige, puis repart avec la page
  const emergeMax = vh * EMERGE;
  const rawEmerge = sunY - bandY;
  const emerge = clamp(rawEmerge, 0, emergeMax);
  portrait.hidden = rawEmerge <= 0;

  const sLock = ((bandY + emergeMax) / (vh * SUN_TRAVEL)) * run;
  const past = Math.max(0, scrolled - sLock - vh * DWELL);
  portrait.style.transform = `translate(-50%, -50%) translateY(${emerge - past}px)`;
}

function onScroll() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(updateHero);
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
      ["class", ["relative", "h-[400vh]", "overflow-hidden", "bg-[#3d0066]"]],
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

          // 2. ligne d'horizon : plan violet qui masque le soleil en bas
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
                  "will-change-transform",
                ],
              ],
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
                type: "div",
                attributes: [
                  ["class", ["relative", "z-30", "w-full", "-mt-[15vh]"]],
                ],
                children: [
                  {
                    type: "img",
                    attributes: [
                      ["src", HexUnite],
                      ["alt", ""],
                      ["data-hexunite", "true"],
                      ["class", ["block", "w-full"]],
                    ],
                  },
                  {
                    type: "img",
                    attributes: [
                      ["src", HexBreak],
                      ["alt", ""],
                      ["data-hexbreak", "true"],
                      ["hidden", "true"],
                      [
                        "class",
                        ["absolute", "left-0", "top-0", "block", "w-full"],
                      ],
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // portrait : fixe, au-dessus du plan violet (z-16) mais derrière les
      // hexagones (z-20) → il traverse la bande puis se pose en dessous
      {
        type: "div",
        attributes: [
          ["data-portrait", "true"],
          ["hidden", "true"],
          [
            "class",
            [
              "fixed",
              "left-1/2",
              "top-[60vh]",
              "z-[16]",
              "w-[60vh]",
              "h-[60vh]",
              "rounded-full",
              "overflow-hidden",
              "cursor-pointer",
              "will-change-transform",
            ],
          ],
        ],
        events: [["click", () => console.log("portrait cliqué")]],
        children: [
          {
            type: "img",
            attributes: [
              ["src", Portrait],
              ["alt", "Axel Barbellion"],
              ["class", ["block", "w-full", "h-full", "object-cover"]],
            ],
          },
        ],
      },
    ],
  };
}
