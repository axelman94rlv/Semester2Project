// Audit d'accessibilité (WCAG 2.1 niveau AA) du rendu réel.
// Même forme que seoScore : renvoie { score, note, verifications }.
//
//  - `doc`    : le document (langue, titre, zoom…),
//  - `racine` : la racine applicative auditée (pour ne pas noter l'outillage
//               comme le panneau de score lui-même).
//
// Chaque vérification a un poids ; le score est la somme des poids validés
// (total = 100). La note va de A (≥ 90) à E (< 40).

// ---- Utilitaires de contraste (WCAG) ----

function luminance(r, g, b) {
  const f = (x) => {
    x /= 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function parseColor(couleur) {
  const m = couleur.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((v) => parseFloat(v.trim()));
  const [r, g, b, a = 1] = parts;
  return { r, g, b, a };
}

// Fond effectif RÉELLEMENT rendu derrière un élément : on compose les fonds
// semi-transparents (alpha) sur ceux des ancêtres, jusqu'à un fond opaque.
// Sans ça, un fond à 15 % d'opacité serait pris pour opaque → faux positifs.
function fondEffectif(el) {
  if (!el || el.nodeType !== 1) return { r: 9, g: 9, b: 11, a: 1 }; // bg-zinc-950
  const bg = parseColor(getComputedStyle(el).backgroundColor);
  if (!bg || bg.a === 0) return fondEffectif(el.parentElement);
  if (bg.a >= 1) return { r: bg.r, g: bg.g, b: bg.b, a: 1 };
  // Semi-transparent : mélange (source-over) avec le fond du dessous.
  const sous = fondEffectif(el.parentElement);
  return {
    r: bg.r * bg.a + sous.r * (1 - bg.a),
    g: bg.g * bg.a + sous.g * (1 - bg.a),
    b: bg.b * bg.a + sous.b * (1 - bg.a),
    a: 1,
  };
}

// Compose une couleur de premier plan (éventuellement translucide) sur son fond.
function composer(fg, bg) {
  if (fg.a >= 1) return fg;
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  };
}

function ratioContraste(c1, c2) {
  const l1 = luminance(c1.r, c1.g, c1.b);
  const l2 = luminance(c2.r, c2.g, c2.b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

export default function a11yScore(doc = document, racine = doc.body) {
  const verifications = [];

  function verifier(id, label, poids, ok, conseil, details = "") {
    verifications.push({
      id,
      label,
      poids,
      ok,
      details,
      conseil: ok ? "" : conseil,
    });
  }

  // ---------- Document ----------

  const lang = doc.documentElement.getAttribute("lang") ?? "";
  verifier(
    "lang",
    "Langue déclarée sur <html> (WCAG 3.1.1)",
    8,
    lang.trim().length > 0,
    'Ajoute lang sur <html> (ex. <html lang="fr">) pour les lecteurs d\'écran.',
    lang || "absent"
  );

  const titre = doc.querySelector("title")?.textContent.trim() ?? "";
  verifier(
    "titre",
    "Titre de page présent (WCAG 2.4.2)",
    6,
    titre.length > 0,
    "Donne un <title> décrivant la page : c'est la première chose annoncée.",
    titre || "absent"
  );

  const viewport = doc.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? "";
  verifier(
    "zoom",
    "Zoom non bloqué (WCAG 1.4.4)",
    6,
    viewport !== "" && !/user-scalable\s*=\s*no|maximum-scale\s*=\s*1\b/.test(viewport),
    "Ne bloque pas le zoom : retire user-scalable=no et maximum-scale=1 du viewport."
  );

  // ---------- Structure ----------

  const h1 = racine.querySelectorAll("h1");
  verifier(
    "h1-unique",
    "Un seul <h1> (WCAG 1.3.1)",
    10,
    h1.length === 1,
    h1.length === 0
      ? "Ajoute un <h1> : le titre principal de la page."
      : "Garde un seul <h1> ; les autres titres doivent être des <h2>…",
    `${h1.length} trouvé(s)`
  );

  const titres = [...racine.querySelectorAll("h1, h2, h3, h4, h5, h6")];
  let hierarchieOk = titres.length > 0;
  for (let i = 1; i < titres.length; i++) {
    const saut = Number(titres[i].tagName[1]) - Number(titres[i - 1].tagName[1]);
    if (saut > 1) hierarchieOk = false;
  }
  verifier(
    "hierarchie",
    "Hiérarchie des titres sans saut (WCAG 1.3.1)",
    8,
    hierarchieOk,
    "N'ignore aucun niveau de titre (h1 → h2 → h3…).",
    titres.map((t) => t.tagName.toLowerCase()).join(" → ") || "aucun titre"
  );

  const landmarks = ["main", "nav", "footer"].filter(
    (b) => racine.querySelector(b) !== null || doc.querySelector(b) !== null
  );
  verifier(
    "landmarks",
    "Repères ARIA (main, nav, footer) (WCAG 1.3.1)",
    8,
    landmarks.length === 3,
    "Structure la page avec <main>, <nav> et <footer> pour la navigation au clavier/lecteur d'écran.",
    landmarks.join(", ") || "aucun"
  );

  // ---------- Images ----------

  const images = [...racine.querySelectorAll("img")];
  const sansAlt = images.filter((img) => img.getAttribute("alt") === null);
  verifier(
    "images-alt",
    "Attribut alt sur toutes les images (WCAG 1.1.1)",
    12,
    sansAlt.length === 0,
    "Chaque <img> doit avoir un alt (texte décrivant l'image, ou alt=\"\" si décorative).",
    images.length === 0
      ? "aucune image"
      : `${images.length - sansAlt.length}/${images.length} avec alt`
  );

  // ---------- Noms accessibles des éléments interactifs ----------

  const interactifs = [...racine.querySelectorAll("a, button")];
  const sansNom = interactifs.filter((el) => {
    const texte =
      (el.textContent || "").trim() ||
      el.getAttribute("aria-label") ||
      el.getAttribute("title") ||
      el.querySelector("img")?.getAttribute("alt");
    return !texte;
  });
  verifier(
    "noms-accessibles",
    "Liens et boutons ont un nom accessible (WCAG 4.1.2)",
    12,
    sansNom.length === 0,
    "Donne un intitulé à chaque lien/bouton (texte visible ou aria-label), surtout ceux à icône seule.",
    `${interactifs.length - sansNom.length}/${interactifs.length} nommés`
  );

  // ---------- Liens : href valide + libellé clair ----------

  const liens = [...racine.querySelectorAll("a")];
  const liensVagues = ["cliquez ici", "ici", "en savoir plus", "lire la suite", "click here"];
  const liensFaibles = liens.filter((a) => {
    const texte = (a.textContent.trim() || a.getAttribute("aria-label") || "").toLowerCase();
    return liensVagues.includes(texte);
  });
  verifier(
    "liens-explicites",
    "Intitulés de liens explicites (WCAG 2.4.4)",
    6,
    liensFaibles.length === 0,
    "Évite « cliquez ici » : le texte du lien doit décrire sa destination.",
    `${liens.length} lien(s)`
  );

  // ---------- tabindex positif (piège de focus) ----------

  const tabindexPositif = [...racine.querySelectorAll("[tabindex]")].filter(
    (el) => Number(el.getAttribute("tabindex")) > 0
  );
  verifier(
    "tabindex",
    "Pas de tabindex positif (WCAG 2.4.3)",
    5,
    tabindexPositif.length === 0,
    "N'utilise pas tabindex > 0 : il casse l'ordre naturel de tabulation.",
    `${tabindexPositif.length} élément(s) avec tabindex > 0`
  );

  // ---------- Champs de formulaire étiquetés ----------

  const champs = [...racine.querySelectorAll("input, select, textarea")].filter(
    (el) => !["hidden", "submit", "button", "reset"].includes(el.getAttribute("type"))
  );
  const champsSansLabel = champs.filter((el) => {
    if (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby")) return false;
    const id = el.getAttribute("id");
    if (id && racine.querySelector(`label[for="${id}"]`)) return false;
    if (el.closest("label")) return false;
    return true;
  });
  verifier(
    "labels",
    "Champs de formulaire étiquetés (WCAG 1.3.1 / 4.1.2)",
    7,
    champsSansLabel.length === 0,
    "Associe un <label> à chaque champ (ou aria-label).",
    champs.length === 0 ? "aucun champ" : `${champs.length - champsSansLabel.length}/${champs.length} étiquetés`
  );

  // ---------- Contraste du texte (WCAG 1.4.3, AA) ----------

  const elementsTexte = [...racine.querySelectorAll("*")].filter((el) => {
    const aTexteDirect = [...el.childNodes].some(
      (n) => n.nodeType === 3 && n.textContent.trim().length > 0
    );
    if (!aTexteDirect) return false;
    const style = getComputedStyle(el);
    return style.visibility !== "hidden" && style.display !== "none";
  });

  let testables = 0;
  let echecsContraste = 0;
  for (const el of elementsTexte) {
    const style = getComputedStyle(el);
    const fgBrut = parseColor(style.color);
    if (!fgBrut) continue;
    const bg = fondEffectif(el);
    const fg = composer(fgBrut, bg);
    const ratio = ratioContraste(fg, bg);
    // Seuil AA : 3:1 pour le grand texte (≥ 24px, ou ≥ 18.66px gras), sinon 4.5:1.
    const taille = parseFloat(style.fontSize);
    const gras = Number(style.fontWeight) >= 700;
    const grand = taille >= 24 || (taille >= 18.66 && gras);
    const seuil = grand ? 3 : 4.5;
    testables++;
    if (ratio < seuil - 0.05) echecsContraste++;
  }
  verifier(
    "contraste",
    "Contraste texte/fond suffisant (WCAG 1.4.3 AA)",
    12,
    echecsContraste === 0,
    "Augmente le contraste : 4.5:1 pour le texte normal, 3:1 pour le grand texte.",
    testables === 0 ? "aucun texte" : `${testables - echecsContraste}/${testables} conformes`
  );

  // ---------- Score ----------

  const score = verifications.reduce((total, v) => total + (v.ok ? v.poids : 0), 0);
  const note = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 40 ? "D" : "E";

  return { score, note, verifications };
}
