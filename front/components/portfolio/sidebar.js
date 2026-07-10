import Icon from "./icon.js";

export default function Sidebar({
  name = "Portfolio",
  role = "",
  avatar,
  onAvatarError,
  links = [],
  socials = [],
} = {}) {
  const profile = [];

  if (avatar) {
    profile.push({
      type: "img",
      attributes: [
        ["src", avatar],
        ["alt", name],
        [
          "class",
          ["w-9", "h-9", "md:w-16", "md:h-16", "rounded-full", "object-cover"],
        ],
      ],
      ...(onAvatarError ? { events: [["error", onAvatarError]] } : {}),
    });
  }

  profile.push({
    type: "div",
    children: [
      {
        // Nom de marque : volontairement PAS un <h1> (le seul <h1> de la
        // page est le titre du hero) pour garder une hiérarchie AA correcte.
        type: "p",
        attributes: [
          ["class", ["text-base", "md:text-xl", "font-bold", "leading-tight"]],
        ],
        children: [name],
      },
      ...(role
        ? [
            {
              type: "p",
              attributes: [
                ["class", ["hidden", "md:block", "text-sm", "text-zinc-400"]],
              ],
              children: [role],
            },
          ]
        : []),
    ],
  });

  const socialRow = {
    type: "div",
    attributes: [
      ["class", ["flex", "items-center", "gap-3", "md:mt-auto", "md:pt-6"]],
    ],
    children: socials.map((social) => ({
      type: "a",
      attributes: [
        ["href", social.href],
        ["target", "_blank"],
        ["rel", "noopener noreferrer"],
        ["title", social.label ?? social.icon],
        // Lien à icône seule : nom accessible obligatoire (AA).
        ["aria-label", social.label ?? social.icon],
        [
          "class",
          [
            "text-zinc-400",
            "hover:text-white",
            "transition-colors",
            "flex",
            "items-center",
            "rounded",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-indigo-400",
          ],
        ],
      ],
      children: [Icon(social.icon, { size: 20, color: "currentColor" })],
    })),
  };

  return {
    type: "nav",
    attributes: [
      ["aria-label", "Navigation du portfolio"],
      [
        "class",
        [
          // Mobile : barre horizontale collée en haut.
          "sticky",
          "top-0",
          "z-20",
          "w-full",
          "flex",
          "flex-row",
          "items-center",
          "gap-4",
          "overflow-x-auto",
          "bg-zinc-900",
          "border-b",
          "border-zinc-800",
          "text-white",
          "px-4",
          "py-3",
          // Desktop : colonne fixée à gauche.
          "md:fixed",
          "md:top-0",
          "md:left-0",
          "md:h-screen",
          "md:w-56",
          "md:flex-col",
          "md:items-stretch",
          "md:gap-0",
          "md:border-b-0",
          "md:border-r",
          "md:px-6",
          "md:py-6",
          "md:overflow-y-auto",
        ],
      ],
    ],
    children: [
      {
        type: "div",
        attributes: [
          ["class", ["flex", "items-center", "gap-3", "md:mb-6", "shrink-0"]],
        ],
        children: profile,
      },
      {
        type: "ul",
        attributes: [
          ["class", ["flex", "flex-row", "md:flex-col", "gap-1", "shrink-0"]],
        ],
        children: links.map((link) => ({
          type: "li",
          children: [
            {
              type: "a",
              attributes: [
                ["href", "#" + link.anchor],
                [
                  "class",
                  [
                    "block",
                    "px-3",
                    "py-2",
                    "rounded",
                    "whitespace-nowrap",
                    "text-zinc-300",
                    "hover:bg-zinc-800",
                    "hover:text-white",
                    "transition-colors",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-indigo-400",
                  ],
                ],
              ],
              children: [link.label],
            },
          ],
        })),
      },
      ...(socials.length ? [socialRow] : []),
    ],
  };
}
