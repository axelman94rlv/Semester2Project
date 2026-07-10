import { stackColorClasses } from "./stack-colors.js";

export default function StackBadge(name) {
  const [bgClass, fgClass] = stackColorClasses(name);
  return {
    type: "span",
    attributes: [
      [
        "class",
        [
          "inline-block",
          "px-2.5",
          "py-1",
          "text-xs",
          "font-medium",
          "rounded-full",
          "whitespace-nowrap",
          bgClass,
          fgClass,
        ],
      ],
    ],
    children: [name],
  };
}

// Rangée de badges à partir d'une liste de technos.
export function StackBadges(names = [], extraClasses = []) {
  return {
    type: "div",
    attributes: [["class", ["flex", "flex-wrap", "gap-2", ...extraClasses]]],
    children: names.map((name) => StackBadge(name)),
  };
}
