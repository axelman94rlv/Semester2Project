# Semester2Project — Framework Vanilla JS

Ce projet est un framework maison développé en JavaScript Vanilla.  
Il permet de créer une application SPA sans utiliser React, Vue ou Angular.

Le framework contient :

- un système de routing
- un moteur de génération HTML depuis des objets JavaScript
- des pages dynamiques
- des composants réutilisables
- une configuration Tailwind CSS

---

## Prérequis

Avant de lancer le projet, il faut avoir installé :

- Node.js
- npm

Pour vérifier :

```bash
node -v
npm -v
```

---

## Installation

Cloner le projet :

```bash
git clone <url-du-repo>
```

Entrer dans le dossier du projet :

```bash
cd Semester2Project/front
```

Installer les dépendances :

```bash
npm install
```

---

## Lancer le projet

Lancer le serveur de développement :

```bash
npm run dev
```

Puis ouvrir l’URL affichée dans le terminal, généralement :

```txt
http://localhost:5173
```

Ne pas ouvrir directement le fichier `index.html` dans le navigateur.

---

## Routes disponibles

L’application utilise un routeur maison.

Les routes disponibles sont :

```txt
/           → page d’accueil
/table      → page tableau
/gallery    → page galerie
```

Attention : si le projet utilise le `BrowserRouter`, il faut lancer le projet avec Vite via `npm run dev`.

---

## Structure du projet

```txt
front/
├── components/
│   └── router/
│       ├── browser-router.js
│       ├── hash-router.js
│       └── link.js
│
├── css/
│   └── style.css
│
├── lib/
│   └── generate-structure.js
│
├── pages/
│   ├── gallery-page.js
│   ├── table-page.js
│   └── not-found-page.js
│
├── routes/
│   └── index.js
│
├── index.html
├── index.js
├── index_vanilla.js
├── index2.js
├── package.json
├── tailwind.config.js
└── README.md
```

---

## Fonctionnement du framework

Le fichier `index.html` contient le conteneur principal de l’application :

```html
<div id="root"></div>
```

Le fichier `index.js` récupère ce conteneur et lance le routeur :

```js
import BrowserRouter from "./components/router/browser-router.js";
import routes from "./routes/index.js";

const rootElement = document.getElementById("root");

BrowserRouter(rootElement, routes);
```

Le routeur lit l’URL actuelle du navigateur, par exemple :

```txt
/table
/gallery
```

Ensuite, il cherche la page correspondante dans le fichier :

```txt
routes/index.js
```

Exemple :

```js
import PageGallery from "../pages/gallery-page.js";
import PageTable from "../pages/table-page.js";
import Page404 from "../pages/not-found-page.js";

export default {
  "/": PageGallery,
  "/table": PageTable,
  "/gallery": PageGallery,
  "*": Page404,
};
```

Si la route existe, la page est affichée.  
Sinon, la page 404 est affichée.

---

## Moteur de rendu

Les pages ne retournent pas directement du HTML.

Elles retournent une structure JavaScript :

```js
{
  type: "div",
  attributes: [
    ["class", "p-4 bg-red-500 text-white"]
  ],
  children: [
    "Hello world"
  ]
}
```

Cette structure est ensuite transformée en vrai HTML par la fonction :

```txt
lib/generate-structure.js
```

Le framework génère automatiquement les éléments HTML avec :

- le type de balise
- les attributs
- les classes CSS
- les enfants

---

## Ajouter une page

Créer un fichier dans le dossier `pages`.

Exemple :

```txt
pages/about-page.js
```

```js
export default function AboutPage() {
  return {
    type: "main",
    attributes: [
      ["class", "p-6"]
    ],
    children: [
      {
        type: "h1",
        attributes: [
          ["class", "text-2xl font-bold"]
        ],
        children: ["À propos"]
      }
    ]
  };
}
```

Puis ajouter la route dans `routes/index.js` :

```js
import AboutPage from "../pages/about-page.js";

export default {
  "/": PageGallery,
  "/about": AboutPage,
  "/table": PageTable,
  "/gallery": PageGallery,
  "*": Page404,
};
```

La page sera disponible ici :

```txt
http://localhost:5173/about
```

---

## Ajouter une classe CSS ou Tailwind

Dans une page, les classes se mettent dans les attributs :

```js
attributes: [
  ["class", "bg-red-500 text-white p-4 rounded"]
]
```

Si le moteur utilise `classList.add`, il est aussi possible d’utiliser un tableau :

```js
attributes: [
  ["class", ["bg-red-500", "text-white", "p-4", "rounded"]]
]
```

---

## Tailwind CSS

Les classes Tailwind sont utilisables directement dans les pages JS.

Exemple :

```js
{
  type: "button",
  attributes: [
    ["class", "bg-blue-500 text-white px-4 py-2 rounded"]
  ],
  children: ["Clique ici"]
}
```

Si les styles Tailwind ne s’appliquent pas, vérifier que le fichier CSS est bien importé dans `index.js` :

```js
import "./css/style.css";
```

Et que le fichier `css/style.css` contient :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Vérifier aussi que `tailwind.config.js` scanne bien les fichiers JavaScript :

```js
export default {
  content: [
    "./index.html",
    "./index.js",
    "./components/**/*.js",
    "./pages/**/*.js",
    "./routes/**/*.js",
    "./lib/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## Problème connu avec `/table` ou `/gallery`

Si une route comme `/table` affiche une erreur 404, c’est probablement que le projet n’est pas lancé avec Vite.

Il faut bien utiliser :

```bash
npm run dev
```

Et non :

```bash
python3 -m http.server
```

---

## Commandes utiles

Installer les dépendances :

```bash
npm install
```

Lancer le projet :

```bash
npm run dev
```

Compiler le projet :

```bash
npm run build
```

Prévisualiser la version compilée :

```bash
npm run preview
```

---

## Auteur

Projet réalisé dans le cadre du Semester2Project.
