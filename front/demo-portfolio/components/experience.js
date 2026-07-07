// Parcours : liste chronologique simple, construite par props.

function Step(etape) {
  return {
    type: "li",
    attributes: [["class", ["step"]]],
    children: [
      { type: "span", attributes: [["class", ["step-period"]]], children: [etape.periode] },
      {
        type: "div",
        children: [
          { type: "p", attributes: [["class", ["step-role"]]], children: [etape.poste] },
          { type: "p", attributes: [["class", ["step-place"]]], children: [etape.lieu] },
        ],
      },
    ],
  };
}

export default function Experience(parcours) {
  return {
    type: "section",
    attributes: [["class", ["experience"]]],
    children: [
      { type: "h2", children: ["Parcours"] },
      { type: "ul", attributes: [["class", ["timeline"]]], children: parcours.map(Step) },
    ],
  };
}
