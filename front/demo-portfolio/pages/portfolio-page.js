// La page : compose tous les composants en un seul objet de structure.
// Elle reçoit les données (l'état du store) et les distribue :
//  - en props pour les listes (projets, modules, parcours),
//  - via {{ }} pour les textes ponctuels (le rendu interpole avec ce même état).
// La classe du conteneur dépend du thème → tout le style bascule au setState.

import Header from "../components/header.js";
import Hero from "../components/hero.js";
import Skills from "../components/skills.js";
import Projects from "../components/projects.js";
import Experience from "../components/experience.js";
import Footer from "../components/footer.js";

export default function PortfolioPage(data, actions) {
  return {
    type: "div",
    attributes: [["class", ["portfolio", `theme-${data.theme}`]]],
    children: [
      Header(actions.toggleTheme),
      {
        type: "main",
        attributes: [["class", ["content"]]],
        children: [
          Hero(),
          Skills(data.modules),
          Projects(data.projets),
          Experience(data.parcours),
        ],
      },
      Footer(),
    ],
  };
}
