import SiteFooter from "./site-footer.js";

// Mise en page commune aux pages légales (mentions légales, confidentialité).
// `sections` : liste de { heading, paragraphs: [texte...] }.
// Structure accessible : lien retour, <main> avec un <h1>, sections en <h2>.

function naviguer(url) {
  return (event) => {
    event.preventDefault();
    window.history.pushState({}, "", url);
    window.dispatchEvent(new Event("pushstate"));
  };
}

export default function LegalLayout({
  title = "",
  updated = "",
  sections = [],
  footerLinks = [],
} = {}) {
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
        attributes: [["class", ["flex-1", "w-full", "max-w-2xl", "mx-auto", "px-6", "py-12"]]],
        children: [
          {
            type: "a",
            attributes: [
              ["href", "/"],
              [
                "class",
                [
                  "inline-block",
                  "mb-8",
                  "text-sm",
                  "text-zinc-300",
                  "hover:text-white",
                  "underline",
                  "rounded",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-indigo-400",
                ],
              ],
            ],
            events: [["click", naviguer("/")]],
            children: ["← Retour à l'accueil"],
          },
          {
            type: "h1",
            attributes: [["class", ["text-3xl", "font-bold", "text-white", "mb-2"]]],
            children: [title],
          },
          ...(updated
            ? [
                {
                  type: "p",
                  attributes: [["class", ["text-sm", "text-zinc-400", "mb-8"]]],
                  children: [`Dernière mise à jour : ${updated}`],
                },
              ]
            : []),
          ...sections.map((section) => ({
            type: "section",
            attributes: [["class", ["mb-8"]]],
            children: [
              {
                type: "h2",
                attributes: [["class", ["text-xl", "font-semibold", "text-white", "mb-3"]]],
                children: [section.heading],
              },
              ...section.paragraphs.map((texte) => ({
                type: "p",
                attributes: [
                  ["class", ["text-zinc-300", "leading-relaxed", "mb-3", "whitespace-pre-line"]],
                ],
                children: [texte],
              })),
            ],
          })),
        ],
      },
      SiteFooter({ links: footerLinks }),
    ],
  };
}
