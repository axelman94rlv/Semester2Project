import Window, { TrafficLights } from "./components/window.js";
import generateStructure from "../../lib/generate-structure.js";
import { getCollection } from "../../api/payload.js";
import { API_BASE_URL } from "../../api/config.js";

const PAYLOAD_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

import snakePreview from "../../lib/img/enzo/finder/project-snake.png";
import pokedexPreview from "../../lib/img/enzo/finder/project-pokedex.png";
import dashboardPreview from "../../lib/img/enzo/finder/project-dashboard.png";
import monitoringPreview from "../../lib/img/enzo/finder/project-monitoring.png";

export const projects = [
  {
    key: "snake",
    title: "Snake game",
    client: "EEMI",
    year: "2025",
    stack: ["C++", "SFML"],
    preview: snakePreview,
    description:
      "Développement d'un jeu de type Snake en C++ à l'aide de la bibliothèque graphique SFML. " +
      "Modélisation de la logique du serpent, gestion des collisions et système de progression. " +
      "Fonctionnalités : plusieurs niveaux de difficulté, sauvegarde du meilleur score, et " +
      "intégration d'animations, de musiques et d'éléments graphiques pour enrichir l'expérience de jeu.",
  },
  {
    key: "pokedex",
    title: "Pokedex",
    client: "EEMI",
    year: "2025",
    stack: ["HTML", "CSS", "JavaScript", "PokéAPI"],
    preview: pokedexPreview,
    description:
      "Développement d'un Pokédex interactif permettant de consulter et rechercher les Pokémon " +
      "ainsi que leurs caractéristiques (types, statistiques, évolutions). Récupération dynamique " +
      "des données via la PokéAPI et affichage en temps réel côté client. Front-end responsive " +
      "avec système de recherche et de filtres.",
  },
  {
    key: "dashboard",
    title: "Dashboard",
    client: "Daven",
    year: "2026",
    stack: ["React", "TypeScript"],
    preview: dashboardPreview,
    description:
      "Tableau de bord analytique de recrutement pour Daven : visualisation des performances par " +
      "canal (candidatures, entretiens, embauches), suivi des sources d'acquisition et des délais " +
      "moyens. Graphiques dynamiques et filtres (période, ville, contrat, département, filiale).",
  },
  {
    key: "monitoring",
    title: "Monitoring",
    client: "Daven",
    year: "2026",
    stack: ["TypeScript", "API", "1Password"],
    preview: monitoringPreview,
    description:
      "Développement d'un outil interne destiné aux développeurs, centralisant les données " +
      "techniques nécessaires au suivi quotidien : mapping des sources de données, monitoring de la " +
      "création des accès clients et supervision des intégrations. Back-end en TypeScript : " +
      "agrégation des données issues de différents services via des liaisons API, et 1Password " +
      "pour la gestion des accès.",
  },
];

const IMG_SHADOW = "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]";

function galleryImage(src, alt) {
  return {
    type: "img",
    attributes: [
      ["src", src],
      ["alt", alt],
      ["class", ["w-full", "h-auto", "rounded-[10px]", IMG_SHADOW]],
    ],
  };
}

function galleryChildren(project) {
  if (project.previews && project.previews.length > 0) {
    return project.previews.map((src) => galleryImage(src, project.title));
  }
  return [
    {
      type: "img",
      attributes: [
        ["src", project.preview],
        ["alt", project.title],
        [
          "class",
          [
            "max-w-full",
            "max-h-full",
            "object-contain",
            "rounded-[10px]",
            IMG_SHADOW,
          ],
        ],
      ],
    },
  ];
}

function buildPreview(project) {
  return {
    type: "div",
    attributes: [
      ["class", ["flex-[1.4]", "min-w-0", "overflow-y-auto", "bg-[#f3f3f5]"]],
    ],
    children: [
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "enzo-project-gallery",
              "min-h-full",
              "flex",
              "flex-col",
              "items-center",
              "justify-center",
              "gap-[16px]",
              "p-[24px]",
            ],
          ],
        ],
        children: galleryChildren(project),
      },
    ],
  };
}

let payloadProjectsCache = null;
async function fetchPayloadProjects() {
  if (payloadProjectsCache) return payloadProjectsCache;
  const data = await getCollection("projects?depth=2");
  payloadProjectsCache = data?.docs ?? [];
  return payloadProjectsCache;
}

function mediaUrl(image) {
  const url =
    image?.url || image?.sizes?.large?.url || image?.sizes?.medium?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : PAYLOAD_ORIGIN + url;
}

export async function loadProjectImages(key) {
  const project = projects.find((p) => p.key === key);
  if (!project) return;

  let urls = [];
  try {
    const docs = await fetchPayloadProjects();
    const normalize = (s) => (s || "").toLowerCase().trim();
    const doc = docs.find(
      (d) => normalize(d.title) === normalize(project.title),
    );
    if (doc && Array.isArray(doc.images)) {
      urls = doc.images.map((item) => mediaUrl(item.image)).filter(Boolean);
    }
  } catch (error) {
    console.error(
      "Payload : impossible de charger les images du projet",
      error,
    );
  }

  if (urls.length === 0) return;

  project.previews = urls;

  const gallery = document.querySelector(
    `[data-window="project-${key}"] .enzo-project-gallery`,
  );
  if (!gallery) return;

  gallery.classList.remove("justify-center");
  gallery.innerHTML = "";
  for (const src of urls) {
    gallery.appendChild(generateStructure(galleryImage(src, project.title)));
  }
}

function stackTag(name) {
  return {
    type: "span",
    attributes: [
      [
        "class",
        [
          "inline-flex",
          "items-center",
          "px-[12px]",
          "py-[5px]",
          "rounded-full",
          "border",
          "border-black/15",
          "bg-black/[0.03]",
          "text-[12px]",
          "font-medium",
          "text-black/70",
        ],
      ],
    ],
    children: [name],
  };
}

export function ProjectDetail(project) {
  return Window({
    name: "project-" + project.key,
    trafficLights: false,
    className: ["enzo-sf"],
    bodyClass: ["flex", "flex-col", "h-full"],
    children: [
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "enzo-drag-handle",
              "cursor-move",
              "flex",
              "items-center",
              "px-[16px]",
              "py-[13px]",
              "border-b",
              "border-black/10",
            ],
          ],
        ],
        children: [TrafficLights()],
      },

      {
        type: "div",
        attributes: [["class", ["flex-1", "min-h-0", "flex", "items-stretch"]]],
        children: [
          {
            type: "div",
            attributes: [
              [
                "class",
                ["flex-[1.4]", "min-w-0", "overflow-y-auto", "bg-[#f3f3f5]"],
              ],
            ],
            children: [buildPreview(project)],
          },

          {
            type: "div",
            attributes: [
              [
                "class",
                [
                  "w-[380px]",
                  "shrink-0",
                  "flex",
                  "flex-col",
                  "gap-[18px]",
                  "p-[32px]",
                  "overflow-y-auto",
                ],
              ],
            ],
            children: [
              {
                type: "div",
                attributes: [["class", ["flex", "flex-col", "gap-[4px]"]]],
                children: [
                  {
                    type: "h1",
                    attributes: [
                      [
                        "class",
                        [
                          "text-[26px]",
                          "leading-[30px]",
                          "font-bold",
                          "text-black",
                        ],
                      ],
                    ],
                    children: [project.title],
                  },
                  {
                    type: "p",
                    attributes: [["class", ["text-[13px]", "text-black/50"]]],
                    children: [project.client + " · " + project.year],
                  },
                ],
              },

              {
                type: "p",
                attributes: [
                  ["class", ["text-[14px]", "leading-[1.7]", "text-black/70"]],
                ],
                children: [project.description],
              },

              {
                type: "div",
                attributes: [
                  ["class", ["flex", "flex-col", "gap-[10px]", "mt-[4px]"]],
                ],
                children: [
                  {
                    type: "p",
                    attributes: [
                      [
                        "class",
                        [
                          "text-[11px]",
                          "font-bold",
                          "uppercase",
                          "tracking-[0.12em]",
                          "text-black/45",
                        ],
                      ],
                    ],
                    children: ["Stack"],
                  },
                  {
                    type: "div",
                    attributes: [["class", ["flex", "flex-wrap", "gap-[8px]"]]],
                    children: project.stack.map(stackTag),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
}

export default ProjectDetail;
