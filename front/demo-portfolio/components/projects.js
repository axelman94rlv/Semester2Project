// Projets : grille de cartes, construite par props (map sur les données).

function Tag(label) {
  return { type: "span", attributes: [["class", ["tag"]]], children: [label] };
}

function ProjectCard(projet) {
  return {
    type: "article",
    attributes: [["class", ["card"]]],
    children: [
      {
        type: "div",
        attributes: [["class", ["card-top"]]],
        children: [
          { type: "h3", children: [projet.titre] },
          { type: "span", attributes: [["class", ["card-year"]]], children: [projet.annee] },
        ],
      },
      { type: "p", attributes: [["class", ["card-desc"]]], children: [projet.description] },
      {
        type: "div",
        attributes: [["class", ["card-tags"]]],
        children: projet.tags.map(Tag),
      },
    ],
  };
}

export default function Projects(projets) {
  return {
    type: "section",
    attributes: [["class", ["projects"]]],
    children: [
      { type: "h2", children: ["Projets"] },
      {
        type: "div",
        attributes: [["class", ["card-grid"]]],
        children: projets.map(ProjectCard),
      },
    ],
  };
}
