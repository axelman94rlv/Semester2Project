import { getAxelProjects } from "../../../api/axel-projects.js";
import { IconButton } from "./button.js";
import ProjectCard from "./projectcard.js";
import { mountCarousel } from "../logique/carousel.js";
import Arrow from "../../../lib/img/axel/arrow.svg";

// Squelette du carrousel projets. Le placement des cartes et la navigation
// sont dans ../logique/carousel.js

const TRACK_H = "43.75rem";
const CHEVRON_INSET = "2rem";
const TITLE_GAP = "3rem";

/** Chevron de navigation. `delta` vaut -1 (précédent) ou 1 (suivant). */
function Chevron(delta, label, flipped) {
  return {
    type: "div",
    attributes: [
      ["data-step", String(delta)],
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
        className: ["rounded-full", "w-[3.5rem]", "h-[3.5rem]"],
      }),
    ],
  };
}

export default async function Carousel({ onOpen } = {}) {
  const projects = await getAxelProjects();

  mountCarousel();

  return {
    type: "section",
    attributes: [
      ["data-carousel", "true"],
      [
        "class",
        ["relative", "left-1/2", "w-screen", "-translate-x-1/2", "mt-[6vw]"],
      ],
    ],
    children: [
      // ---------- titre  ----------
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

          ...(projects.length > 1
            ? [
                Chevron(-1, "Projet précédent", true),
                Chevron(1, "Projet suivant", false),
              ]
            : []),
        ],
      },
    ],
  };
}
