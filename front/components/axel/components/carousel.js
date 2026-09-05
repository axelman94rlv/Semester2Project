import { getAxelProjects } from "../../../api/axel-projects.js";
import { IconButton } from "./button.js";
import ProjectCard from "./projectcard.js";
import Arrow from "../../../lib/img/axel/arrow.svg";

// --- Réglages des cartes d'arrière-plan -------------------------------------
// SHIFT est un pourcentage de la largeur d'une carte (504px), donc la mise en
// page reste juste quelle que soit la taille rendue.
//   bord intérieur d'une carte latérale = (SHIFT - SIDE_SCALE/2) × 504
//   bord extérieur                      = (SHIFT + SIDE_SCALE/2) × 504
// À 85 / 0.7 : intérieur = 252px (elle affleure la carte centrale) et
// extérieur = 605px, ce qui dégage la place des chevrons.
const SHIFT = 85;
const SIDE_SCALE = 0.5;
const SIDE_OPACITY = "0.5";

const TRACK_H = "43.75rem"; // 700px : la hauteur d'une carte
const CHEVRON_INSET = "2rem"; // marge des chevrons aux bords de l'écran
const TITLE_GAP = "5rem"; // titre → piste

let current = 0;
let count = 0;

/** Écart signé le plus court entre i et la carte active, avec bouclage. */
function offsetOf(i) {
  const half = Math.floor(count / 2);
  return ((((i - current + half) % count) + count) % count) - half;
}

function updateCarousel() {
  const slides = document.querySelectorAll("[data-slide]");
  if (!slides.length) return;

  slides.forEach((slide, i) => {
    const o = offsetOf(i);
    const active = o === 0;
    const visible = Math.abs(o) <= 1;

    slide.style.transform =
      `translate(-50%, -50%) translateX(${o * SHIFT}%) ` +
      `scale(${active ? 1 : SIDE_SCALE})`;
    slide.style.opacity = active ? "1" : visible ? SIDE_OPACITY : "0";
    slide.style.zIndex = active ? "20" : "10";
    slide.style.pointerEvents = active ? "auto" : "none";
  });
}

function step(delta) {
  if (!count) return;
  current = (current + delta + count) % count;
  updateCarousel();
}

function setupCarousel() {
  // le DOM est rendu juste après l'appel du composant → on rejoue l'init,
  // comme le fait le hero
  requestAnimationFrame(() => requestAnimationFrame(updateCarousel));
  setTimeout(updateCarousel, 100);
  setTimeout(updateCarousel, 400);
}

export default async function Carousel({ onOpen } = {}) {
  const projects = await getAxelProjects();

  count = projects.length;
  current = 0;

  setupCarousel();

  const chevron = (delta, label, flipped) => ({
    type: "div",
    attributes: [
      [
        "class",
        [
          "absolute",
          "top-1/2",
          "-translate-y-1/2",
          "z-30",
          ...(flipped ? ["rotate-180"] : []),
        ],
      ],
      ["style", [[delta < 0 ? "left" : "right", CHEVRON_INSET]]],
    ],
    children: [
      IconButton(Arrow, {
        ariaLabel: label,
        onClick: () => step(delta),
        className: ["rounded-full", "w-[3.5rem]", "h-[3.5rem]"],
      }),
    ],
  });

  return {
    type: "section",
    attributes: [
      ["data-carousel", "true"],
      [
        "class",
        [
          // pleine largeur : on s'échappe de la gouttière de la section about
          // pour que les cartes latérales et les chevrons aient la place.
          "relative",
          "left-1/2",
          "w-screen",
          "-translate-x-1/2",
          "mt-[6vw]",
        ],
      ],
    ],
    children: [
      // ---------- titre (cf. MES PROJETS.svg, capitale 45,3px) ----------
      {
        type: "h2",
        attributes: [
          [
            "class",
            [
              "text-center",
              "font-['AudiowideCustom']",
              "text-[4rem]",
              "leading-none",
              "text-[#F9C600]",
            ],
          ],
        ],
        children: ["MES PROJETS"],
      },

      // ---------- la piste ----------
      {
        type: "div",
        attributes: [
          ["class", ["relative", "overflow-hidden"]],
          [
            "style",
            [
              ["height", TRACK_H],
              ["marginTop", TITLE_GAP],
            ],
          ],
        ],
        children: [
          ...projects.map((project, i) => ({
            type: "div",
            attributes: [
              ["data-slide", String(i)],
              [
                "class",
                [
                  "absolute",
                  "left-1/2",
                  "top-1/2",
                  "transition-all",
                  "duration-500",
                  "ease-out",
                  "will-change-transform",
                ],
              ],
            ],
            children: [ProjectCard(project, project?.order ?? i + 1, onOpen)],
          })),

          ...(count > 1
            ? [
                chevron(-1, "Projet précédent", true),
                chevron(1, "Projet suivant", false),
              ]
            : []),
        ],
      },
    ],
  };
}
