import generateStructure from "../../lib/generate-structure.js";

export default function HashRouter(rootElement, routes) {
  async function render() {
    const hash = window.location.hash || "#/";
    const pathname = hash.replace("#", "");

    const generator = routes[pathname] ?? routes["*"];

    try {
      rootElement.innerHTML = "Chargement...";

      const pageStructure = await generator();

      rootElement.innerHTML = "";
      rootElement.appendChild(generateStructure(pageStructure));
    } catch (error) {
      console.error("Erreur pendant le rendu :", error);

      rootElement.innerHTML = "";

      const errorElement = document.createElement("p");
      errorElement.textContent = "Erreur lors du chargement de la page.";
      rootElement.appendChild(errorElement);
    }
  }

  window.addEventListener("hashchange", render);

  render();
}

export function HashLink(url, label) {
  return {
    type: "a",
    attributes: [
      ["href", `#${url}`],
    ],
    children: [label],
  };
}