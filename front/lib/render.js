import generateStructure from "./generate-structure.js";

export default function render(root, structure, data = {}) {
  const element = generateStructure(structure, data);

  if (root.childNodes[0]) {
    root.replaceChild(element, root.childNodes[0]);
  } else {
    root.appendChild(element);
  }
}
