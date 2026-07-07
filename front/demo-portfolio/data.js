// Données de démonstration du portfolio.
// Dans le vrai produit, ces données viendront de Payload via le module api,
// puis seront posées dans le store (api → setState → render).

export default {
  theme: "clair", // "clair" | "sombre" — état d'affichage, vit dans le store
  profil: {
    prenom: "Axel",
    nom: "B.",
    titre: "Développeur front — je construis les outils qui construisent mes sites.",
    accroche:
      "Plutôt que d'empiler des frameworks, j'ai écrit le mien : Vanilla-Engine. Cette page est rendue par lui — moteur de rendu, state réactif, interpolation, routing. Zéro dépendance.",
    ville: "Paris",
    email: "axel@example.dev",
    github: "github.com/axelman94rlv",
  },
  modules: [
    { nom: "interpolate", role: "Remplit les {{ trous }} des templates avec les données." },
    { nom: "render", role: "Objet de structure → DOM, avec re-render ciblé." },
    { nom: "store", role: "État réactif : setState notifie, l'écran se repeint." },
    { nom: "router", role: "Navigation SPA sans rechargement (History API)." },
  ],
  projets: [
    {
      titre: "Vanilla-Engine",
      description:
        "Micro-framework JS écrit from scratch : rendu déclaratif par objets de structure, réactivité par abonnement, interpolation de templates.",
      tags: ["Vanilla JS", "Framework", "Zéro dépendance"],
      annee: "2026",
    },
    {
      titre: "Generator",
      description:
        "Générateur de portfolios propulsé par Vanilla-Engine et alimenté par un CMS headless. Templates dynamiques, rendu public performant.",
      tags: ["Payload CMS", "SPA", "Cloudflare Pages"],
      annee: "2026",
    },
    {
      titre: "Galerie SPA",
      description:
        "Galerie d'images en single-page : routing maison, pagination réactive, chargement asynchrone piloté par le store.",
      tags: ["Router", "Store", "Fetch"],
      annee: "2025",
    },
  ],
  parcours: [
    { periode: "2023 — 2026", poste: "Bachelor Web Development", lieu: "École Decode, Paris" },
    { periode: "2025", poste: "Stage développeur front", lieu: "Studio web, Île-de-France" },
    { periode: "2024", poste: "Projets freelance", lieu: "Sites vitrines & intégration" },
  ],
};
