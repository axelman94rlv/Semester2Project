import StackBadge from "./stack-badge.js";

export default function TechStack({
  id = "stack",
  title = "Tech stack",
  items = [],
} = {}) {
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
            attributes: [["class", ["flex", "flex-wrap", "gap-2.5"]]],
            children: items.map((item) => StackBadge(item)),
          },
        ],
      },
    ],
  };
}
