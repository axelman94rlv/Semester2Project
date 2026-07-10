import { StackBadges } from "./stack-badge.js";

export default function FeaturedProjects({
  id = "featured",
  title = "Featured projects",
  projects = [],
} = {}) {
  const card = (project, index) => {
    const sources = project.images ?? (project.image ? [project.image] : []);

    const imgClasses = [
      "w-full",
      "rounded-xl",
      "object-cover",
      "border",
      "border-zinc-800",
    ];

    const image = {
      type: "div",
      attributes: [
        ["class", ["w-full", "md:w-1/2", "flex", "flex-col", "gap-3"]],
      ],
      children: sources.map((src) => ({
        type: "img",
        attributes: [
          ["src", src],
          ["alt", project.imageAlt ?? project.name ?? ""],
          ["class", imgClasses],
        ],
      })),
    };

    const text = {
      type: "div",
      attributes: [["class", ["w-full", "md:w-1/2"]]],
      children: [
        {
          type: "h3",
          attributes: [
            ["class", ["text-xl", "font-bold", "text-white", "mb-3"]],
          ],
          children: [project.name ?? ""],
        },
        {
          type: "p",
          attributes: [
            [
              "class",
              [
                "text-zinc-400",
                "leading-relaxed",
                "whitespace-pre-line",
                "mb-4",
              ],
            ],
          ],
          children: [project.description ?? ""],
        },
        StackBadges(project.stack ?? []),
      ],
    };

    const blocks = index % 2 === 1 ? [text, image] : [image, text];

    return {
      type: "div",
      attributes: [
        [
          "class",
          [
            "flex",
            "flex-col",
            "md:flex-row",
            "gap-6",
            "items-start",
            "bg-zinc-900",
            "border",
            "border-zinc-800",
            "rounded-2xl",
            "p-6",
          ],
        ],
      ],
      children: blocks,
    };
  };

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
            attributes: [["class", ["flex", "flex-col", "gap-6"]]],
            children: projects.map((project, index) => card(project, index)),
          },
        ],
      },
    ],
  };
}
