import generateStructure from "../../lib/generate-structure.js";

export default function BrowserRouter(rootElement, routes) {
  async function render() {
    const pathname = window.location.pathname;
    const generator = routes[pathname] ?? routes["*"];

    try {
      rootElement.innerHTML = "Chargement...";

      const pageStructure = await generator();

      rootElement.innerHTML = "";
      rootElement.appendChild(generateStructure(pageStructure));

      if (window.location.hash) {
        requestAnimationFrame(() => {
          scrollToAnchor(window.location.hash);
        });
      }
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

function scrollToAnchor(hash) {
  const target = document.querySelector(hash);

  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function BrowserLink(url, label, attr = []) {
  return {
    type: "a",

    attributes: [
      ["href", url],
      ...attr,
    ],

    events: [
      [
        "click",
        function (event) {
          event.preventDefault();

          if (url.startsWith("#")) {
            window.history.pushState(
              {},
              "",
              `${window.location.pathname}${url}`,
            );

            scrollToAnchor(url);

            return;
          }

          const destination = new URL(url, window.location.origin);
          const currentPath = window.location.pathname;

          if (
            destination.pathname === currentPath &&
            destination.hash
          ) {
            window.history.pushState(
              {},
              "",
              `${destination.pathname}${destination.hash}`,
            );

            scrollToAnchor(destination.hash);

            return;
          }

          window.history.pushState({}, "", url);
          window.dispatchEvent(new Event("pushstate"));
        },
      ],
    ],

    children: [label],
  };
}