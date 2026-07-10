// Page d'accueil : un écran centré avec un bouton "Portfolio d'Enzo" qui
// ouvre la page du portfolio via une navigation SPA (même mécanisme que le
// routeur : history.pushState + événement "pushstate"). Un pied de page en
// bas propose les mentions légales et la politique de confidentialité.

import SiteFooter from "../components/portfolio/site-footer.js";

const FOOTER_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
];

function naviguer(url) {
  return (event) => {
    event.preventDefault();
    window.history.pushState({}, "", url);
    window.dispatchEvent(new Event("pushstate"));
  };
}

export default function HomePage() {
  return {
    type: "div",
    attributes: [
      [
        "class",
        ["min-h-screen", "bg-zinc-950", "text-zinc-200", "flex", "flex-col"],
      ],
    ],
    children: [
      {
        type: "main",
        attributes: [
          [
            "class",
            [
              "flex-1",
              "flex",
              "flex-col",
              "items-center",
              "justify-center",
              "text-center",
              "px-6",
              "gap-6",
            ],
          ],
        ],
        children: [
          {
            type: "h1",
            attributes: [
              ["class", ["text-4xl", "md:text-6xl", "font-bold", "text-white"]],
            ],
            children: ["Enzo Moïta"],
          },
          {
            type: "p",
            attributes: [["class", ["text-lg", "text-zinc-300", "max-w-md"]]],
            children: ["Full stack developer — apprenti chez Daven (Paris)"],
          },
          {
            type: "a",
            attributes: [
              ["href", "/portfolio"],
              [
                "class",
                [
                  "inline-block",
                  "mt-2",
                  "px-8",
                  "py-4",
                  "rounded-xl",
                  "bg-indigo-600",
                  "hover:bg-indigo-500",
                  "text-white",
                  "text-lg",
                  "font-semibold",
                  "shadow-lg",
                  "transition-colors",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-indigo-300",
                  "focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-zinc-950",
                ],
              ],
            ],
            events: [["click", naviguer("/portfolio")]],
            children: ["Portfolio d'Enzo →"],
          },
        ],
      },
      SiteFooter({ links: FOOTER_LINKS }),
    ],
  };
}
