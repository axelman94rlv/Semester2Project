import "./css/style.css";

import BrowserRouter from "./components/router/browser-router.js";
import routes from "./routes/index.js";
import render from "./lib/render.js";
import seoScore from "./lib/seo-score.js";
import a11yScore from "./lib/a11y-score.js";
import ScorePanel from "./components/portfolio/score-panel.js";

const rootElement = document.getElementById("root");
BrowserRouter(rootElement, routes);

// --- Panneau d'audits (SEO + accessibilité) ---
// Il vit dans sa propre racine, hors de #root, pour ne pas s'auto-auditer
// (les audits ne regardent que #root). Affiché seulement sur /portfolio.
const scoreRoot = document.createElement("div");
document.body.appendChild(scoreRoot);
let auditOuvert = null; // "seo" | "a11y" | null

function auditer() {
  if (window.location.pathname !== "/portfolio") {
    scoreRoot.replaceChildren();
    return;
  }
  const audits = [
    { titre: "seo", ...seoScore(document, rootElement) },
    { titre: "a11y", ...a11yScore(document, rootElement) },
  ];
  render(
    scoreRoot,
    ScorePanel(audits, {
      ouvert: auditOuvert,
      onToggle(titre) {
        auditOuvert = auditOuvert === titre ? null : titre;
        auditer();
      },
    })
  );
}

// Après chaque navigation, le routeur a (re)produit #root : on le note.
// requestAnimationFrame garantit que l'audit passe après le rendu du routeur.
window.addEventListener("pushstate", () => requestAnimationFrame(auditer));
window.addEventListener("popstate", () => requestAnimationFrame(auditer));
requestAnimationFrame(auditer);
