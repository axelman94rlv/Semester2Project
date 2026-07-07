// Audit SEO du rendu : inspecte le DOM réellement produit par render()
// et retourne un rapport chiffré { score, note, verifications }.
//
// Deux périmètres :
//  - le document (métadonnées : <title>, <meta>, lang…),
//  - la racine applicative (le contenu généré par le moteur), pour ne pas
//    auditer les éléments d'outillage (comme le panneau de score lui-même).
//
// Chaque vérification a un poids ; le score est la somme des poids validés
// (total = 100). La note va de A (≥ 90) à E (< 40).

export default function seoScore(doc = document, racine = doc.body) {
  const verifications = [];

  function verifier(id, label, poids, ok, conseil, details = "") {
    verifications.push({ id, label, poids, ok, details, conseil: ok ? "" : conseil });
  }

  // ---------- Métadonnées (document) ----------

  const titre = doc.querySelector("title")?.textContent.trim() ?? "";
  verifier(
    "titre",
    "Balise <title> (10–60 caractères)",
    10,
    titre.length >= 10 && titre.length <= 60,
    "Ajoute un <title> descriptif de 10 à 60 caractères.",
    titre ? `${titre.length} caractères` : "absente"
  );

  const description = doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ?? "";
  verifier(
    "meta-description",
    "Meta description (50–160 caractères)",
    10,
    description.length >= 50 && description.length <= 160,
    "Ajoute une meta description de 50 à 160 caractères : c'est le texte affiché sous le lien dans Google.",
    description ? `${description.length} caractères` : "absente"
  );

  const lang = doc.documentElement.getAttribute("lang") ?? "";
  verifier(
    "lang",
    "Attribut lang sur <html>",
    8,
    lang.length > 0,
    'Déclare la langue de la page : <html lang="fr">.',
    lang || "absent"
  );

  verifier(
    "viewport",
    "Meta viewport (mobile-friendly)",
    5,
    doc.querySelector('meta[name="viewport"]') !== null,
    "Ajoute <meta name=\"viewport\"> : l'affichage mobile compte pour le référencement."
  );

  verifier(
    "canonical",
    "Lien canonique",
    5,
    doc.querySelector('link[rel="canonical"]') !== null,
    'Ajoute <link rel="canonical"> pour indiquer l\'URL de référence de la page.'
  );

  const ogTitre = doc.querySelector('meta[property="og:title"]') !== null;
  const ogDescription = doc.querySelector('meta[property="og:description"]') !== null;
  verifier(
    "open-graph",
    "Balises Open Graph (partage social)",
    8,
    ogTitre && ogDescription,
    "Ajoute og:title et og:description pour contrôler l'aperçu lors d'un partage."
  );

  // ---------- Contenu (racine applicative) ----------

  const h1 = racine.querySelectorAll("h1");
  verifier(
    "h1-unique",
    "Un <h1> et un seul",
    12,
    h1.length === 1,
    h1.length === 0 ? "Ajoute un <h1> : c'est le titre principal lu par les moteurs." : "Garde un seul <h1> par page.",
    `${h1.length} trouvé(s)`
  );

  const titres = [...racine.querySelectorAll("h1, h2, h3, h4, h5, h6")];
  let hierarchieOk = titres.length > 0;
  for (let i = 1; i < titres.length; i++) {
    const saut = Number(titres[i].tagName[1]) - Number(titres[i - 1].tagName[1]);
    if (saut > 1) hierarchieOk = false; // ex. h2 → h4 : un niveau sauté
  }
  verifier(
    "hierarchie-titres",
    "Hiérarchie des titres sans saut",
    8,
    hierarchieOk,
    "Enchaîne les niveaux sans en sauter (h1 → h2 → h3…).",
    titres.map((t) => t.tagName.toLowerCase()).join(" → ") || "aucun titre"
  );

  const images = [...racine.querySelectorAll("img")];
  const sansAlt = images.filter((img) => !img.getAttribute("alt")?.trim());
  verifier(
    "images-alt",
    "Texte alternatif sur les images",
    10,
    sansAlt.length === 0,
    "Chaque <img> doit avoir un attribut alt décrivant l'image.",
    images.length === 0 ? "aucune image" : `${images.length - sansAlt.length}/${images.length} avec alt`
  );

  const liens = [...racine.querySelectorAll("a")];
  const liensVagues = ["cliquez ici", "ici", "en savoir plus", "lire la suite"];
  const liensFaibles = liens.filter((a) => {
    const texte = (a.textContent.trim() || a.getAttribute("aria-label") || "").toLowerCase();
    return texte === "" || liensVagues.includes(texte);
  });
  verifier(
    "liens",
    "Liens présents et descriptifs",
    7,
    liens.length > 0 && liensFaibles.length === 0,
    liens.length === 0
      ? "Ajoute des liens (mailto, GitHub, projets…) : une page sans lien est une impasse pour les moteurs."
      : "Donne un texte descriptif à chaque lien (évite « cliquez ici »).",
    `${liens.length} lien(s)`
  );

  const landmarks = ["main", "header", "footer"].filter((balise) => racine.querySelector(balise) !== null);
  verifier(
    "landmarks",
    "Structure sémantique (main, header, footer)",
    10,
    landmarks.length === 3,
    "Utilise les balises <main>, <header> et <footer> plutôt que des <div>.",
    landmarks.join(", ") || "aucune"
  );

  const mots = racine.textContent.trim().split(/\s+/).filter(Boolean);
  verifier(
    "contenu",
    "Contenu textuel suffisant (≥ 150 mots)",
    7,
    mots.length >= 150,
    "Étoffe le contenu : les moteurs ont besoin de texte pour comprendre la page.",
    `${mots.length} mots`
  );

  // ---------- Score ----------

  const score = verifications.reduce((total, v) => total + (v.ok ? v.poids : 0), 0);
  const note = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 40 ? "D" : "E";

  return { score, note, verifications };
}
