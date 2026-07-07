// Hero : la thèse de la page. Gros titre interpolé + accroche.

export default function Hero() {
  return {
    type: "section",
    attributes: [["class", ["hero"]]],
    children: [
      {
        type: "p",
        attributes: [["class", ["eyebrow"]]],
        children: ["portfolio — rendu par vanilla-engine"],
      },
      { type: "h1", children: ["{{ profil.titre }}"] },
      { type: "p", attributes: [["class", ["hero-sub"]]], children: ["{{ profil.accroche }}"] },
      {
        type: "div",
        attributes: [["class", ["hero-meta"]]],
        children: [
          { type: "span", children: ["{{ profil.ville }}"] },
          { type: "span", attributes: [["class", ["dot"]]], children: ["•"] },
          { type: "span", children: ["{{ profil.email }}"] },
          { type: "span", attributes: [["class", ["dot"]]], children: ["•"] },
          { type: "span", children: ["{{ profil.github }}"] },
        ],
      },
    ],
  };
}
