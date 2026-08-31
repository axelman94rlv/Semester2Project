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

# Utilisation de l’API Payload

Cette partie explique comment connecter le frontend Vanilla JS à une API Payload lancée en local.

---

## Principe

Le frontend tourne sur :

```txt
http://localhost:5173
```

Payload tourne sur :

```txt
http://localhost:3000
```

L’API de Payload est disponible ici :

```txt
http://localhost:3000/api
```

Exemple pour récupérer les posts :

```txt
http://localhost:3000/api/posts
```

---

## Fichier de configuration

Créer un fichier :

```txt
api/config.js
```

Contenu :

```js
export const API_BASE_URL = "http://localhost:3000/api";
```

Ce fichier permet de centraliser l’URL de l’API.

Si l’URL change plus tard, il suffit de modifier ce fichier.

---

## Fichier pour appeler Payload

Créer un fichier :

```txt
api/payload.js
```

Contenu :

```js
import { API_BASE_URL } from "./config.js";

export async function getCollection(collectionName) {
  try {
    const response = await fetch(`${API_BASE_URL}/${collectionName}`);

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération Payload :", error);
    return null;
  }
}
```

Cette fonction permet de récupérer n’importe quelle collection Payload.

---

## Exemple d’utilisation

Dans une page, importer la fonction :

```js
import { getCollection } from "../api/payload.js";
```

Puis récupérer les données :

```js
const payloadData = await getCollection("posts");
```

Payload renvoie généralement les données dans `docs`.

Exemple :

```js
const posts = payloadData?.docs ?? [];
```

---

## Exemple complet dans une page

```js
import { getCollection } from "../api/payload.js";

export default async function PageTable() {
  const payloadData = await getCollection("posts");

  const posts = payloadData?.docs ?? [];

  return {
    type: "div",
    children: [
      {
        type: "h1",
        children: ["Liste des posts"],
      },

      ...posts.map((post) => ({
        type: "p",
        children: [post.title ?? "Sans titre"],
      })),
    ],
  };
}
```

---

## Important

Comme on utilise `await`, la fonction de la page doit être `async`.

```js
export default async function PageTable() {
  const data = await getCollection("posts");

  return {
    type: "div",
    children: ["Page chargée"],
  };
}
```

Le routeur doit aussi attendre la page :

```js
const pageStructure = await generator();
```

Sinon, le framework essaiera d’afficher une `Promise` au lieu d’afficher la page.

---

## CORS Payload

Si le frontend ne peut pas contacter Payload, il faut vérifier le CORS.

Dans `payload.config.ts` ou `payload.config.js`, ajouter :

```js
export default buildConfig({
  cors: [
    "http://localhost:5173",
  ],

  csrf: [
    "http://localhost:5173",
  ],

  // reste de la configuration
});
```

Puis redémarrer Payload :

```bash
npm run dev
```

---

## Vérifications rapides

Vérifier que Payload est lancé :

```txt
http://localhost:3000
```

Vérifier que l’API répond :

```txt
http://localhost:3000/api/posts
```

Vérifier que le frontend est lancé :

```txt
http://localhost:5173
```

---

## Résumé

```txt
api/config.js       → contient l’URL de base de Payload
api/payload.js      → contient la fonction fetch réutilisable
pages/*.js          → utilisent getCollection()
Payload /api/posts  → renvoie les posts
```


## Auteur

- Baptiste ROY
- Axel BARBELION
- Enzo MOITA

Projet réalisé dans le cadre du Semester2Project.
