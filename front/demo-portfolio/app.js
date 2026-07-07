// Bootstrap : câble le store, l'abonnement et le premier rendu.
// C'est le futur rôle du module "app" : assembler les briques.
//
// Flux : setState → le store notifie → l'abonné rappelle render → écran à jour.
// Le bouton du Header ne connaît ni render ni le DOM : il ne fait que setState.

import render from "../lib/render.js";
import createStore from "../lib/store.js";
import seoScore from "../lib/seo-score.js";
import PortfolioPage from "./pages/portfolio-page.js";
import SeoPanel from "./components/seo-panel.js";
import donnees from "./data.js";

const root = document.getElementById("root");
const store = createStore(donnees);

// Le panneau SEO vit dans sa propre racine, hors de #root : il audite le
// rendu sans se compter lui-même (seoScore ne regarde que la racine passée).
const seoRoot = document.createElement("div");
document.body.appendChild(seoRoot);
let seoOuvert = false;

function auditerSeo() {
  const rapport = seoScore(document, root);
  render(
    seoRoot,
    SeoPanel(rapport, {
      ouvert: seoOuvert,
      onToggle() {
        seoOuvert = !seoOuvert;
        auditerSeo();
      },
    })
  );
}

// Les actions que la page peut déclencher (passées en props aux composants).
const actions = {
  toggleTheme() {
    const suivant = store.getState().theme === "clair" ? "sombre" : "clair";
    store.setState({ theme: suivant });
  },
};

function paint() {
  render(root, PortfolioPage(store.getState(), actions), store.getState());
  auditerSeo(); // le DOM vient d'être (re)produit : on le note
}

store.subscribe(paint); // à chaque setState, on repeint
paint(); // premier affichage
