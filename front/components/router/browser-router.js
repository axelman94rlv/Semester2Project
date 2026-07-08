import render from "../../lib/render.js";
export default function BrowserRouter(rootElement, routes) {
  async function render() {
    const pathname = window.location.pathname;
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

  window.addEventListener("popstate", render);
  window.addEventListener("pushstate", render);

  render();
}

export function BrowserLink(url, label) {
  return {
    type: "a",
    attributes: [
      ["href", url],
    ],
    events: [
      [
        "click",
        function (event) {
          event.preventDefault();

          window.history.pushState({}, "", url);
          window.dispatchEvent(new Event("pushstate"));
        },
      ],
    ],
    children: [label],
  };
}