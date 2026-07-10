import { StackBadges } from "./stack-badge.js";
export default function Projects({
  id = "projects",
  title = "Projects",
  projects = [],
} = {}) {
  const headerCell = (label) => ({
    type: "th",
    attributes: [
      [
        "class",
        [
          "text-left",
          "font-semibold",
          "text-zinc-400",
          "text-sm",
          "px-4",
          "py-3",
        ],
      ],
    ],
    children: [label],
  });

  const statusBadge = (status) => ({
    type: "span",
    attributes: [
      [
        "class",
        [
          "inline-flex",
          "items-center",
          "gap-1",
          "px-2.5",
          "py-1",
          "text-xs",
          "rounded-full",
          "bg-emerald-500/15",
          "text-emerald-400",
          "border",
          "border-emerald-500/30",
          "whitespace-nowrap",
        ],
      ],
    ],
    children: [status],
  });

  return {
    type: "section",
    attributes: [
      ["id", id],
      ["class", ["py-16", "px-6", "md:px-8", "border-b", "border-zinc-800"]],
    ],
    children: [
      {
        type: "div",
        attributes: [["class", ["max-w-4xl", "mx-auto"]]],
        children: [
          {
            type: "h2",
            attributes: [
              ["class", ["text-2xl", "font-bold", "text-white", "mb-6"]],
            ],
            children: [title],
          },
          {
            type: "div",
            attributes: [["class", ["overflow-x-auto"]]],
            children: [
              {
                type: "table",
                attributes: [
                  ["class", ["w-full", "border-collapse", "min-w-[640px]"]],
                ],
                children: [
                  {
                    type: "thead",
                    children: [
                      {
                        type: "tr",
                        attributes: [
                          ["class", ["border-b", "border-zinc-800"]],
                        ],
                        children: [
                          headerCell("Project"),
                          headerCell("Description"),
                          headerCell("Stack"),
                          headerCell("Status"),
                        ],
                      },
                    ],
                  },
                  {
                    type: "tbody",
                    children: projects.map((project) => ({
                      type: "tr",
                      attributes: [
                        ["class", ["border-b", "border-zinc-800/60"]],
                      ],
                      children: [
                        {
                          type: "td",
                          attributes: [
                            [
                              "class",
                              [
                                "px-4",
                                "py-4",
                                "align-top",
                                "text-white",
                                "font-medium",
                                "whitespace-nowrap",
                              ],
                            ],
                          ],
                          children: [project.name ?? ""],
                        },
                        {
                          type: "td",
                          attributes: [
                            [
                              "class",
                              ["px-4", "py-4", "align-top", "text-zinc-400"],
                            ],
                          ],
                          children: [project.description ?? ""],
                        },
                        {
                          type: "td",
                          attributes: [
                            ["class", ["px-4", "py-4", "align-top"]],
                          ],
                          children: [StackBadges(project.stack ?? [])],
                        },
                        {
                          type: "td",
                          attributes: [
                            ["class", ["px-4", "py-4", "align-top"]],
                          ],
                          children: project.status
                            ? [statusBadge(project.status)]
                            : [],
                        },
                      ],
                    })),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
