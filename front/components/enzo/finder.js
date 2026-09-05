import Window, { TrafficLights } from "./components/window.js";
import folderBlue from "../../lib/img/enzo/finder/folder-blue.svg";
import clockIcon from "../../lib/img/enzo/finder/clock.svg";
import teamIcon from "../../lib/img/enzo/finder/team.svg";
import desktopIcon from "../../lib/img/enzo/finder/desktop.svg";
import documentIcon from "../../lib/img/enzo/finder/document.svg";
import downloadIcon from "../../lib/img/enzo/finder/download.svg";
import cloudIcon from "../../lib/img/enzo/finder/cloud.svg";
import houseIcon from "../../lib/img/enzo/finder/house.svg";
import driveIcon from "../../lib/img/enzo/finder/drive.svg";
import chevronRight from "../../lib/img/enzo/finder/chevron-right.svg";
import chevronDown from "../../lib/img/enzo/finder/chevron-down.svg";
import snakeThumb from "../../lib/img/enzo/finder/project-snake.png";
import pokedexThumb from "../../lib/img/enzo/finder/project-pokedex.png";
import monitoringThumb from "../../lib/img/enzo/finder/project-monitoring.png";

const PROJECTS = [
  {
    key: "snake",
    name: "Snake game",
    client: "EEMI",
    date: "2025",
    icon: snakeThumb,
  },
  {
    key: "pokedex",
    name: "Pokedex",
    client: "EEMI",
    date: "2025",
    icon: pokedexThumb,
  },
  {
    key: "dashboard",
    name: "Dashboard",
    client: "Daven",
    date: "2026",
    icon: monitoringThumb,
  },
  {
    key: "monitoring",
    name: "Monitoring",
    client: "Daven",
    date: "2026",
    icon: monitoringThumb,
  },
];

const SIDEBAR = [
  { type: "item", icon: folderBlue, label: "Projets", selected: true },
  { type: "item", icon: clockIcon, label: "Récents" },
  { type: "item", icon: teamIcon, label: "En équipe" },
  { type: "label", label: "Favorites" },
  { type: "item", icon: desktopIcon, label: "Bureau" },
  { type: "item", icon: documentIcon, label: "Document" },
  { type: "item", icon: downloadIcon, label: "Download" },
  { type: "label", label: "Location" },
  { type: "item", icon: cloudIcon, label: "Cloud" },
  { type: "item", icon: houseIcon, label: "Enzo - perso" },
  { type: "item", icon: driveIcon, label: "Enzo - pro" },
];

function SidebarItem({ icon, label, selected = false }) {
  return {
    type: "button",
    attributes: [
      ["type", "button"],
      [
        "class",
        [
          "w-full",
          "flex",
          "items-center",
          "gap-[6px]",
          "px-[10px]",
          "py-[4px]",
          "rounded-[7px]",
          "text-left",
          "transition-colors",
          selected ? "bg-black/10" : "hover:bg-black/5",
        ],
      ],
    ],
    children: [
      {
        type: "span",
        attributes: [
          [
            "class",
            ["w-[18px]", "shrink-0", "flex", "items-center", "justify-center"],
          ],
        ],
        children: [
          {
            type: "img",
            attributes: [
              ["src", icon],
              ["alt", ""],
              ["class", ["w-[14px]", "h-[14px]", "object-contain"]],
            ],
          },
        ],
      },
      {
        type: "span",
        attributes: [
          [
            "class",
            [
              "text-[11px]",
              "leading-[16px]",
              "font-medium",
              "whitespace-nowrap",
              selected ? "text-[#1a1a1a]" : "text-black/80",
            ],
          ],
        ],
        children: [label],
      },
    ],
  };
}

function SidebarLabel(text) {
  return {
    type: "div",
    attributes: [["class", ["w-full", "px-[10px]", "pt-[10px]", "pb-[3px]"]]],
    children: [
      {
        type: "span",
        attributes: [
          [
            "class",
            ["text-[11px]", "leading-[16px]", "font-bold", "text-[#1a1a1a]"],
          ],
        ],
        children: [text],
      },
    ],
  };
}

function ListHeader() {
  const cell = ["text-[11px]", "leading-[14px]"];
  return {
    type: "div",
    attributes: [
      [
        "class",
        ["flex", "items-center", "h-[28px]", "border-b", "border-black/5"],
      ],
    ],
    children: [
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "flex-1",
              "min-w-0",
              "flex",
              "items-center",
              "gap-[6px]",
              "pl-[48px]",
              "pr-[6px]",
            ],
          ],
        ],
        children: [
          {
            type: "span",
            attributes: [["class", [...cell, "font-bold", "text-black/85"]]],
            children: ["Nom"],
          },
          {
            type: "img",
            attributes: [
              ["src", chevronDown],
              ["alt", ""],
              ["class", ["w-[10px]", "h-[6px]", "opacity-60"]],
            ],
          },
        ],
      },
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "w-[160px]",
              "shrink-0",
              "flex",
              "items-center",
              "h-[16px]",
              "pl-[8px]",
              "border-l",
              "border-black/10",
            ],
          ],
        ],
        children: [
          {
            type: "span",
            attributes: [["class", [...cell, "text-black/50"]]],
            children: ["Client"],
          },
        ],
      },
      {
        type: "div",
        attributes: [
          [
            "class",
            ["w-[140px]", "shrink-0", "flex", "items-center", "pl-[8px]"],
          ],
        ],
        children: [
          {
            type: "span",
            attributes: [["class", [...cell, "text-black/50"]]],
            children: ["Date"],
          },
        ],
      },
    ],
  };
}

function ProjectRow(project) {
  const secondary = [
    "text-[13px]",
    "leading-[16px]",
    "text-black/50",
    "truncate",
    "block",
  ];
  return {
    type: "button",
    attributes: [
      ["type", "button"],
      ["data-app", "project"],
      ["data-project", project.key],
      ["title", project.name],
      [
        "class",
        [
          "w-full",
          "flex",
          "items-center",
          "h-[24px]",
          "rounded-[6px]",
          "transition-colors",
          "cursor-pointer",
          "hover:bg-[#2479ff]/10",
        ],
      ],
    ],
    children: [
      // Colonne Nom
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "flex-1",
              "min-w-0",
              "flex",
              "items-center",
              "gap-[4px]",
              "pl-[10px]",
              "pr-[8px]",
            ],
          ],
        ],
        children: [
          {
            type: "img",
            attributes: [
              ["src", chevronRight],
              ["alt", ""],
              ["class", ["w-[6px]", "h-[9px]", "opacity-50", "shrink-0"]],
            ],
          },
          {
            type: "div",
            attributes: [
              [
                "class",
                [
                  "w-[18px]",
                  "h-[18px]",
                  "rounded-[3px]",
                  "overflow-hidden",
                  "shrink-0",
                  "bg-black/5",
                ],
              ],
            ],
            children: [
              {
                type: "img",
                attributes: [
                  ["src", project.icon],
                  ["alt", ""],
                  ["class", ["w-full", "h-full", "object-cover"]],
                ],
              },
            ],
          },
          {
            type: "span",
            attributes: [
              [
                "class",
                ["text-[13px]", "leading-[16px]", "text-black/85", "truncate"],
              ],
            ],
            children: [project.name],
          },
        ],
      },
      {
        type: "div",
        attributes: [["class", ["w-[160px]", "shrink-0", "px-[8px]"]]],
        children: [
          {
            type: "span",
            attributes: [["class", secondary]],
            children: [project.client],
          },
        ],
      },
      {
        type: "div",
        attributes: [["class", ["w-[140px]", "shrink-0", "px-[8px]"]]],
        children: [
          {
            type: "span",
            attributes: [["class", secondary]],
            children: [project.date],
          },
        ],
      },
    ],
  };
}

export function Finder({ projects = PROJECTS, className = [] } = {}) {
  const sidebarChildren = SIDEBAR.map((entry) =>
    entry.type === "label" ? SidebarLabel(entry.label) : SidebarItem(entry),
  );

  return Window({
    name: "finder",
    trafficLights: false,
    className: [
      "enzo-sf",
      "w-[940px]",
      "max-w-[92vw]",
      "min-h-[460px]",
      ...className,
    ],
    bodyClass: ["flex", "flex-col", "h-full"],
    children: [
      {
        type: "div",
        attributes: [
          [
            "class",
            ["enzo-drag-handle", "cursor-move", "flex", "items-center", "px-[13px]", "py-[12px]"],
          ],
        ],
        children: [TrafficLights()],
      },

      {
        type: "div",
        attributes: [
          [
            "class",
            ["flex", "items-stretch", "gap-[10px]", "px-[10px]", "pb-[12px]", "flex-1", "min-h-0"],
          ],
        ],
        children: [
          {
            type: "aside",
            attributes: [
              [
                "class",
                [
                  "w-[126px]",
                  "shrink-0",
                  "flex",
                  "flex-col",
                  "gap-[4px]",
                  "p-[10px]",
                  "rounded-[11px]",
                  "bg-black/[0.03]",
                ],
              ],
            ],
            children: sidebarChildren,
          },

          {
            type: "div",
            attributes: [["class", ["flex-1", "min-w-0", "pt-[2px]"]]],
            children: [ListHeader(), ...projects.map(ProjectRow)],
          },
        ],
      },
    ],
  });
}

export default Finder;
