// Panneau flottant affichant un ou plusieurs audits { score, note,
// verifications } (SEO, accessibilité…). Chaque audit a un badge cliquable
// qui déplie sa checklist détaillée. Rendu avec les mêmes briques que le
// reste de l'app (objets structure + Tailwind).

const NOTE_BG = {
  A: "bg-emerald-500",
  B: "bg-lime-500",
  C: "bg-yellow-500",
  D: "bg-orange-500",
  E: "bg-red-500",
};

function ligne(v) {
  return {
    type: "li",
    attributes: [["class", ["flex", "gap-2", "items-start", "py-2", "border-b", "border-zinc-800"]]],
    children: [
      {
        type: "span",
        attributes: [
          [
            "class",
            [
              "shrink-0",
              "mt-0.5",
              "font-bold",
              v.ok ? "text-emerald-400" : "text-red-400",
            ],
          ],
          ["aria-hidden", "true"],
        ],
        children: [v.ok ? "✓" : "✕"],
      },
      {
        type: "div",
        attributes: [["class", ["flex-1", "min-w-0"]]],
        children: [
          {
            type: "p",
            attributes: [["class", ["text-sm", "text-zinc-200"]]],
            children: [v.details ? `${v.label} — ${v.details}` : v.label],
          },
          ...(v.conseil
            ? [
                {
                  type: "p",
                  attributes: [["class", ["text-xs", "text-zinc-400", "mt-0.5"]]],
                  children: [v.conseil],
                },
              ]
            : []),
        ],
      },
      {
        type: "span",
        attributes: [["class", ["shrink-0", "text-xs", "text-zinc-500"]]],
        children: [`${v.poids} pts`],
      },
    ],
  };
}

function badge(audit, { ouvert, onToggle }) {
  return {
    type: "button",
    attributes: [
      ["type", "button"],
      ["aria-expanded", String(ouvert)],
      ["aria-label", `Audit ${audit.titre} : ${audit.score} sur 100, note ${audit.note}. ${ouvert ? "Replier" : "Déplier"} le détail.`],
      [
        "class",
        [
          "flex",
          "items-center",
          "gap-2",
          "px-3",
          "py-1.5",
          "rounded-full",
          "shadow-lg",
          "text-black",
          "text-sm",
          "font-semibold",
          NOTE_BG[audit.note] ?? "bg-zinc-500",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-white",
        ],
      ],
    ],
    events: [["click", onToggle]],
    children: [
      { type: "span", attributes: [["class", ["uppercase", "tracking-wide"]]], children: [audit.titre] },
      { type: "span", children: [`${audit.score}/100`] },
      {
        type: "span",
        attributes: [["class", ["px-1.5", "rounded", "bg-black/20"]]],
        children: [audit.note],
      },
    ],
  };
}

function details(audit) {
  return {
    type: "div",
    attributes: [
      [
        "class",
        [
          "w-80",
          "max-w-[90vw]",
          "max-h-[60vh]",
          "overflow-y-auto",
          "bg-zinc-900",
          "border",
          "border-zinc-700",
          "rounded-xl",
          "shadow-2xl",
          "p-4",
        ],
      ],
    ],
    children: [
      {
        type: "p",
        attributes: [["class", ["text-sm", "font-bold", "text-white", "mb-2"]]],
        children: [`Audit ${audit.titre} — ${audit.score}/100 (${audit.note})`],
      },
      {
        type: "ul",
        attributes: [["class", ["m-0", "p-0", "list-none"]]],
        children: audit.verifications.map(ligne),
      },
    ],
  };
}

// audits : liste de { titre, score, note, verifications }.
// ouvert : titre de l'audit déplié (ou null). onToggle(titre) : bascule.
export default function ScorePanel(audits = [], { ouvert = null, onToggle } = {}) {
  const detailOuvert = audits.find((a) => a.titre === ouvert);
  return {
    type: "aside",
    attributes: [
      ["aria-label", "Audits de la page (SEO et accessibilité)"],
      [
        "class",
        ["fixed", "bottom-4", "right-4", "z-50", "flex", "flex-col", "gap-2", "items-end"],
      ],
    ],
    children: [
      ...(detailOuvert ? [details(detailOuvert)] : []),
      {
        type: "div",
        attributes: [["class", ["flex", "gap-2"]]],
        children: audits.map((audit) =>
          badge(audit, {
            ouvert: ouvert === audit.titre,
            onToggle: () => onToggle(audit.titre),
          })
        ),
      },
    ],
  };
}
