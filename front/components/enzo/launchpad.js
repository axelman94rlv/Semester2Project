import htmlIcon from "../../lib/img/enzo/skills/html.svg";
import cssIcon from "../../lib/img/enzo/skills/css.svg";
import pythonIcon from "../../lib/img/enzo/skills/python.svg";
import phpIcon from "../../lib/img/enzo/skills/php.svg";
import typescriptIcon from "../../lib/img/enzo/skills/typescript.svg";
import reactIcon from "../../lib/img/enzo/skills/react.svg";
import javascriptIcon from "../../lib/img/enzo/skills/javascript.svg";
import dockerIcon from "../../lib/img/enzo/skills/docker.svg";
import laravelIcon from "../../lib/img/enzo/skills/laravel.svg";
import gitIcon from "../../lib/img/enzo/skills/git.svg";

const skills = [
  { name: "HTML", icon: htmlIcon, level: 90 },
  { name: "CSS", icon: cssIcon, level: 90 },
  { name: "Python", icon: pythonIcon, level: 75 },
  { name: "PHP", icon: phpIcon, level: 50 },
  { name: "TypeScript", icon: typescriptIcon, level: 60 },
  { name: "React", icon: reactIcon, level: 50 },
  { name: "JavaScript", icon: javascriptIcon, level: 70 },
  { name: "Docker", icon: dockerIcon, level: 45 },
  { name: "Laravel", icon: laravelIcon, level: 25 },
  { name: "Git", icon: gitIcon, level: 50 },
];

function closeOnBackdropClick(event) {
  if (event.target === event.currentTarget) {
    event.currentTarget.remove();
  }
}

function skillCell(skill) {
  return {
    type: "div",
    attributes: [
      [
        "class",
        ["flex", "flex-col", "items-center", "gap-[12px]", "w-[190px]"],
      ],
    ],
    children: [
      {
        type: "img",
        attributes: [
          ["src", skill.icon],
          ["alt", skill.name],
          ["title", skill.name],
          [
            "class",
            [
              "w-[132px]",
              "h-[132px]",
              "object-contain",
              "drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]",
            ],
          ],
        ],
      },
      {
        type: "span",
        attributes: [
          [
            "class",
            ["text-white", "text-[14px]", "font-medium", "leading-none"],
          ],
        ],
        children: [skill.name],
      },
      {
        type: "div",
        attributes: [
          [
            "class",
            ["flex", "items-center", "justify-center", "gap-[10px]", "w-full"],
          ],
        ],
        children: [
          {
            type: "div",
            attributes: [
              [
                "class",
                [
                  "relative",
                  "h-[5px]",
                  "w-[124px]",
                  "rounded-full",
                  "bg-white/25",
                  "overflow-hidden",
                ],
              ],
            ],
            children: [
              {
                type: "div",
                attributes: [
                  ["class", ["h-full", "rounded-full", "bg-white"]],
                  ["style", [["width", skill.level + "%"]]],
                ],
              },
            ],
          },
          {
            type: "span",
            attributes: [
              [
                "class",
                ["text-[13px]", "leading-none", "text-white/90", "w-[34px]"],
              ],
            ],
            children: [skill.level + "%"],
          },
        ],
      },
    ],
  };
}

export function Launchpad() {
  return {
    type: "div",
    attributes: [
      ["data-window", "launchpad"],
      [
        "class",
        [
          "enzo-sf",
          "absolute",
          "inset-0",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "gap-[2.5rem]",
          "px-[3rem]",
          "bg-black/40",
          "backdrop-blur-xl",
          "cursor-pointer",
        ],
      ],
    ],
    events: [["click", closeOnBackdropClick]],
    children: [
      {
        type: "h2",
        attributes: [
          [
            "class",
            [
              "text-white",
              "text-[2rem]",
              "font-semibold",
              "tracking-wide",
              "pointer-events-none",
            ],
          ],
        ],
        children: ["Stacks & compétences"],
      },
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "grid",
              "grid-cols-5",
              "gap-x-[3.5rem]",
              "gap-y-[3.25rem]",
              "cursor-default",
            ],
          ],
        ],
        children: skills.map(skillCell),
      },
      {
        type: "p",
        attributes: [
          ["class", ["text-white/50", "text-[0.8rem]", "pointer-events-none"]],
        ],
        children: ["Cliquez n'importe où pour fermer"],
      },
    ],
  };
}

export default Launchpad;
