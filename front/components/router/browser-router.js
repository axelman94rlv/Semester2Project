import render from "../../lib/render.js";

export default function BrowserRouter(rootElement, routes) {
  async function refreshPage() {
    const pathname = window.location.pathname;
    const generator = routes[pathname] ?? routes["*"];
    try {
      const pageStructure = await generator();
      render(rootElement, pageStructure);
    } catch (error) {
      console.error("Erreur pendant le rendu :", error);
      render(rootElement, {
        type: "p",
        children: ["Erreur lors du chargement de la page."],
      });
    }
  }
  window.addEventListener("popstate", refreshPage);
  window.addEventListener("pushstate", refreshPage);
  refreshPage();
}

export function BrowserLink(url, label) {
  return {
    type: "a",
    attributes: [["href", url]],
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
