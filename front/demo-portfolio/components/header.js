// Header : barre du haut + la "preuve vivante" du moteur.
// Le bouton thème appelle onToggleTheme (fourni par la page), qui fait un
// store.setState → le store notifie → render repeint TOUTE la page.
// Le chip d'état est interpolé : {{ theme }} vient du store.

export default function Header(onToggleTheme) {
  return {
    type: "header",
    attributes: [["class", ["site-header"]]],
    children: [
      {
        type: "div",
        attributes: [["class", ["brand"]]],
        children: [
          { type: "span", attributes: [["class", ["brand-mark"]]], children: ["◆"] },
          { type: "span", children: ["{{ profil.prenom }} {{ profil.nom }}"] },
        ],
      },
      {
        type: "div",
        attributes: [["class", ["engine-chip"]]],
        children: [
          { type: "span", attributes: [["class", ["chip-label"]]], children: ["moteur"] },
          { type: "span", children: ["Vanilla-Engine"] },
          { type: "span", attributes: [["class", ["chip-sep"]]], children: ["·"] },
          { type: "span", attributes: [["class", ["chip-label"]]], children: ["état"] },
          { type: "span", attributes: [["class", ["chip-state"]]], children: ["{{ theme }}"] },
        ],
      },
      {
        type: "button",
        attributes: [["class", ["theme-toggle"]], ["type", "button"]],
        events: [["click", onToggleTheme]],
        children: ["Basculer le thème"],
      },
    ],
  };
}
