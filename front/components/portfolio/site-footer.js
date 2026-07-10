// Pied de page du site : liens légaux (mentions légales, politique de
// confidentialité) + ligne de copyright. Les liens internes naviguent en
// SPA (history.pushState + événement "pushstate", comme le routeur).
// `links` : liste de { label, href, external? }.

function naviguer(url) {
  return (event) => {
    event.preventDefault();
    window.history.pushState({}, "", url);
    window.dispatchEvent(new Event("pushstate"));
  };
}

export default function SiteFooter({ author = "Enzo Moïta", links = [] } = {}) {
  const year = new Date().getFullYear();

  return {
    type: "footer",
    attributes: [
      [
        "class",
        [
          "border-t",
          "border-zinc-800",
          "px-6",
          "py-8",
          "flex",
          "flex-col",
          "items-center",
          "gap-4",
          "text-sm",
          "text-zinc-400",
        ],
      ],
    ],
    children: [
      {
        type: "nav",
        attributes: [
          ["aria-label", "Liens légaux"],
          ["class", ["flex", "flex-wrap", "justify-center", "gap-x-6", "gap-y-2"]],
        ],
        children: links.map((link) => ({
          type: "a",
          attributes: [
            ["href", link.href],
            ...(link.external
              ? [["target", "_blank"], ["rel", "noopener noreferrer"]]
              : []),
            [
              "class",
              [
                "rounded",
                "underline",
                "text-zinc-300",
                "hover:text-white",
                "transition-colors",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-indigo-400",
              ],
            ],
          ],
          ...(link.external ? {} : { events: [["click", naviguer(link.href)]] }),
          children: [link.label],
        })),
      },
      {
        type: "p",
        attributes: [["class", ["text-zinc-500"]]],
        children: [`© ${year} ${author}`],
      },
    ],
  };
}
