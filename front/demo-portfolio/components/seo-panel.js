// Panneau SEO : affiche le rapport de seoScore(), rendu par Vanilla-Engine
// lui-même (le moteur note sa propre sortie, et l'affiche avec ses propres
// briques). Badge flottant → clic → checklist détaillée avec les conseils.

function LigneVerification(v) {
  const children = [
    {
      type: "span",
      attributes: [["class", ["seo-check-icon", v.ok ? "est-ok" : "est-ko"]]],
      children: [v.ok ? "✓" : "✕"],
    },
    {
      type: "div",
      attributes: [["class", ["seo-check-corps"]]],
      children: [
        {
          type: "p",
          attributes: [["class", ["seo-check-label"]]],
          children: [v.details ? `${v.label} — ${v.details}` : v.label],
        },
        ...(v.conseil
          ? [{ type: "p", attributes: [["class", ["seo-check-conseil"]]], children: [v.conseil] }]
          : []),
      ],
    },
    { type: "span", attributes: [["class", ["seo-check-poids"]]], children: [`${v.poids} pts`] },
  ];
  return { type: "li", attributes: [["class", ["seo-check"]]], children };
}

export default function SeoPanel(rapport, { ouvert, onToggle }) {
  const badge = {
    type: "button",
    attributes: [
      ["class", ["seo-badge", `note-${rapport.note}`]],
      ["type", "button"],
      ["aria-expanded", String(ouvert)],
    ],
    events: [["click", onToggle]],
    children: [
      { type: "span", attributes: [["class", ["seo-badge-label"]]], children: ["seo"] },
      { type: "span", attributes: [["class", ["seo-badge-score"]]], children: [`${rapport.score}/100`] },
      { type: "span", attributes: [["class", ["seo-badge-note"]]], children: [rapport.note] },
    ],
  };

  const details = {
    type: "div",
    attributes: [["class", ["seo-details"]]],
    children: [
      {
        type: "p",
        attributes: [["class", ["seo-details-titre"]]],
        children: ["Audit SEO du rendu — Vanilla-Engine"],
      },
      {
        type: "ul",
        attributes: [["class", ["seo-check-liste"]]],
        children: rapport.verifications.map(LigneVerification),
      },
    ],
  };

  return {
    type: "aside",
    attributes: [["class", ["seo-panel"]], ["aria-label", "Audit SEO de la page"]],
    children: ouvert ? [details, badge] : [badge],
  };
}
