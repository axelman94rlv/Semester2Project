import "./interpolate.js";

export default function generateStructure(structure, data = {}) {
  if (structure === null || structure === undefined || structure === false) {
    return document.createTextNode("");
  }

  if (typeof structure === "string") {
    return document.createTextNode(structure.interpolate(data));
  }

  if (typeof structure === "number") {
    return document.createTextNode(String(structure));
  }

  if (Array.isArray(structure)) {
    const fragment = document.createDocumentFragment();

    for (let child of structure) {
      fragment.appendChild(generateStructure(child, data));
    }

    return fragment;
  }

  if (!structure.type) {
    console.warn("Structure invalide, type manquant :", structure);
    return document.createTextNode("");
  }

  const element = document.createElement(structure.type);

  if (structure.attributes) {
    for (let attribute of structure.attributes) {
      if (!Array.isArray(attribute)) continue;

      const [name, value] = attribute;

      if (!name) continue;

      if (name === "class") {
        if (Array.isArray(value)) {
          element.className = value.filter(Boolean).join(" ");
        } else {
          element.className = value ?? "";
        }
      } else if (name === "style") {
        const customStyle = Object.fromEntries(value);
        Object.assign(element.style, customStyle);
      } else if (name.startsWith("data-")) {
        const dataKey = name.replace("data-", "");
        element.dataset[dataKey] = value;
      } else {
        element.setAttribute(name, value);
      }
    }
  }

  if (structure.events) {
    for (let event of structure.events) {
      const [eventName, callback] = event;

      if (eventName && typeof callback === "function") {
        element.addEventListener(eventName, callback);
      }
    }
  }

  if (structure.children) {
    for (let child of structure.children) {
      const childElement = generateStructure(child, data);
      element.appendChild(childElement);
    }
  }

  return element;
}