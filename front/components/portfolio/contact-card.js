import Icon from "./icon.js";
export default function ContactCard({
  id = "contact",
  name = "",
  role = "",
  links = [],
  ctaLabel = "Contact now",
  ctaHref = "",
} = {}) {
  const linkChildren = (link) => {
    const children = [];
    if (link.icon) {
      children.push(Icon(link.icon, { size: 18, color: "currentColor" }));
    }
    children.push({ type: "span", children: [link.label] });
    return children;
  };

  return {
    type: "section",
    attributes: [
      ["id", id],
      ["class", ["py-20", "px-6", "md:px-8"]],
    ],
    children: [
      {
        type: "div",
        attributes: [
          [
            "class",
            [
              "max-w-md",
              "mx-auto",
              "bg-zinc-900",
              "border",
              "border-zinc-800",
              "rounded-2xl",
              "p-8",
              "text-center",
            ],
          ],
        ],
        children: [
          {
            type: "h2",
            attributes: [["class", ["text-2xl", "font-bold", "text-white"]]],
            children: [name],
          },
          {
            type: "p",
            attributes: [["class", ["text-zinc-400", "mb-6"]]],
            children: [role],
          },
          {
            type: "div",
            attributes: [
              [
                "class",
                ["flex", "justify-center", "gap-3", "flex-wrap", "mb-6"],
              ],
            ],
            children: links.map((link) => ({
              type: "a",
              attributes: [
                ["href", link.href],
                ...(link.href && link.href.startsWith("http")
                  ? [
                      ["target", "_blank"],
                      ["rel", "noopener noreferrer"],
                    ]
                  : []),
                [
                  "class",
                  [
                    "inline-flex",
                    "items-center",
                    "gap-2",
                    "px-4",
                    "py-2",
                    "rounded-lg",
                    "bg-zinc-800",
                    "border",
                    "border-zinc-700",
                    "text-zinc-200",
                    "hover:bg-zinc-700",
                    "transition-colors",
                  ],
                ],
              ],
              children: linkChildren(link),
            })),
          },
          {
            type: "a",
            attributes: [
              ["href", ctaHref],
              [
                "class",
                [
                  "inline-block",
                  "w-full",
                  "px-4",
                  "py-3",
                  "rounded-lg",
                  "bg-indigo-600",
                  "hover:bg-indigo-500",
                  "text-white",
                  "font-medium",
                  "transition-colors",
                ],
              ],
            ],
            children: [ctaLabel],
          },
        ],
      },
    ],
  };
}
