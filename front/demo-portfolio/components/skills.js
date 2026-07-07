// Compétences présentées comme des "modules du moteur" — parce que c'est vrai.
// Ici, pas de {{ }} : la liste est construite par props (map sur les données),
// car l'interpolation résout des valeurs, pas des tableaux. Les deux approches
// cohabitent : {{ }} pour du texte ponctuel, props pour les listes.

function Module(mod) {
  return {
    type: "li",
    attributes: [["class", ["module"]]],
    children: [
      { type: "code", attributes: [["class", ["module-name"]]], children: [mod.nom] },
      { type: "p", attributes: [["class", ["module-role"]]], children: [mod.role] },
    ],
  };
}

export default function Skills(modules) {
  return {
    type: "section",
    attributes: [["class", ["skills"]]],
    children: [
      { type: "h2", children: ["Modules du moteur"] },
      {
        type: "p",
        attributes: [["class", ["section-sub"]]],
        children: ["Chaque brique ci-dessous tourne en ce moment même pour afficher cette page."],
      },
      {
        type: "ul",
        attributes: [["class", ["module-grid"]]],
        children: modules.map(Module),
      },
    ],
  };
}
