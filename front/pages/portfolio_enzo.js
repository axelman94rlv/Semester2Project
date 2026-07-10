import Sidebar from "../components/portfolio/sidebar.js";
import Hero from "../components/portfolio/hero.js";
import About from "../components/portfolio/about.js";
import TechStack from "../components/portfolio/tech-stack.js";
import Projects from "../components/portfolio/projects.js";
import FeaturedProjects from "../components/portfolio/featured-projects.js";
import ContactCard from "../components/portfolio/contact-card.js";

const MEDIA_BASE = "http://localhost:3000/media";
const AVATAR = MEDIA_BASE + "/Enzo.png";
const DASHBOARD_IMG_1 = MEDIA_BASE + "/dashboard1.png";
const DASHBOARD_IMG_2 = MEDIA_BASE + "/dashboard2.png";
const SNAKE_IMG = MEDIA_BASE + "/snake.png";

const AVATAR_FALLBACK = "https://api.dicebear.com/7.x/pixel-art/svg?seed=Enzo";

function handleAvatarError(event) {
  const img = event.currentTarget;
  if (img.src !== AVATAR_FALLBACK) img.src = AVATAR_FALLBACK;
}

const GITHUB_URL = "https://github.com/EnzoMta";
const EMAIL = "moitaenzo@gmail.com";

export default function PortfolioEnzo() {
  return {
    type: "div",
    attributes: [["class", ["min-h-screen", "bg-zinc-950", "text-zinc-200"]]],
    children: [
      // Lien d'évitement (WCAG 2.4.1) : masqué, visible au focus clavier.
      {
        type: "a",
        attributes: [
          ["href", "#home"],
          [
            "class",
            [
              "sr-only",
              "focus:not-sr-only",
              "focus:fixed",
              "focus:top-2",
              "focus:left-2",
              "focus:z-50",
              "focus:px-4",
              "focus:py-2",
              "focus:rounded-lg",
              "focus:bg-indigo-600",
              "focus:text-white",
            ],
          ],
        ],
        children: ["Aller au contenu"],
      },
      Sidebar({
        name: "Enzo",
        role: "Full stack developer",
        avatar: AVATAR,
        onAvatarError: handleAvatarError,
        links: [
          { label: "Home", anchor: "home" },
          { label: "About me", anchor: "about" },
          { label: "Tech stack", anchor: "stack" },
          { label: "Projects", anchor: "projects" },
          { label: "Featured", anchor: "featured" },
          { label: "Contact", anchor: "contact" },
        ],
        socials: [
          { icon: "github", href: GITHUB_URL, label: "GitHub" },
          { icon: "mail", href: "mailto:" + EMAIL, label: "Email" },
        ],
      }),
      {
        type: "main",
        attributes: [["class", ["ml-0", "md:ml-56"]]],
        children: [
          Hero({
            id: "home",
            greeting: "Hi there, I'm Enzo",
            avatar: AVATAR,
            onAvatarError: handleAvatarError,
            tagline: "Full stack developer — apprentice at Daven (Paris)",
            tags: [
              "React / JavaScript",
              "PHP / Laravel",
              "Python",
              "TypeScript",
            ],
          }),

          About({
            id: "about",
            title: "About me",
            text:
              "Developer in apprenticeship at Daven (Paris), building my skills one project at a time. " +
              "I work across the full stack — HTML/CSS and React/JavaScript for the front, PHP/Laravel on the back, Python when it makes sense.",
          }),

          TechStack({
            id: "stack",
            title: "Tech stack",
            items: [
              "HTML",
              "CSS",
              "Python",
              "PHP",
              "TypeScript",
              "React",
              "JavaScript",
              "Docker",
              "Laravel",
            ],
          }),

          Projects({
            id: "projects",
            title: "Projects",
            projects: [
              {
                name: "Lorebase",
                description:
                  "Custom CMS built from scratch with our own framework design system",
                stack: ["PHP", "HTML", "CSS", "JS"],
                status: "✅ Done",
              },
              {
                name: "Snake SFML",
                description: "Classic Snake game with graphical rendering",
                stack: ["C++", "SFML"],
                status: "✅ Done",
              },
              {
                name: "MiniTweet",
                description: "Minimal Twitter-like social app",
                stack: ["PHP"],
                status: "✅ Done",
              },
              {
                name: "Epure",
                description:
                  "E-commerce website built from scratch with Django",
                stack: ["Python", "Django"],
                status: "✅ Done",
              },
              {
                name: "DecoDLE",
                description:
                  "Daily word game for students and teachers at our school",
                stack: ["Laravel"],
                status: "✅ Done",
              },
            ],
          }),

          FeaturedProjects({
            id: "featured",
            title: "Featured projects",
            projects: [
              {
                name: "Dashboard",
                images: [DASHBOARD_IMG_1, DASHBOARD_IMG_2],
                imageAlt: "Dashboard client de suivi RH",
                description:
                  "Conception et développement d'un dashboard client permettant le suivi des données RH (candidatures, entretiens, embauches, performances des canaux de recrutement) avec analyse par période et comparaison historique.\n\n" +
                  "Back-end (TypeScript) : interconnexion des différentes bases de données et mise en place d'un système de filtres dynamiques (ville, contrat, fonction, département, filiale) pour fluidifier la navigation. Développement d'un espace administrateur permettant de superviser et intervenir sur les comptes clients en cas d'anomalie.\n\n" +
                  "Front-end (React) : interface de visualisation construite avec la librairie Tremor pour produire un dashboard complet et lisible (graphiques, KPI, courbes d'évolution).",
                stack: ["TypeScript", "React", "Tremor"],
              },
              {
                name: "Snake SFML",
                image: SNAKE_IMG,
                imageAlt: "Menu de sélection du niveau du jeu Snake",
                description:
                  "Développement d'un jeu de type Snake en C++ à l'aide de la bibliothèque graphique SFML. Modélisation de la logique du serpent, gestion des collisions et système de progression.\n\n" +
                  "Fonctionnalités : plusieurs niveaux de difficulté, sauvegarde du meilleur score, intégration d'animations, de musiques et d'éléments graphiques pour enrichir l'expérience de jeu.",
                stack: ["C++", "SFML"],
              },
            ],
          }),

          ContactCard({
            id: "contact",
            name: "Enzo Moïta",
            role: "Full stack developer",
            links: [
              { label: "Email", href: "mailto:" + EMAIL, icon: "mail" },
              { label: "GitHub", href: GITHUB_URL, icon: "github" },
            ],
            ctaLabel: "Contact now",
            ctaHref: "mailto:" + EMAIL,
          }),

          {
            type: "footer",
            attributes: [
              ["class", ["py-8", "text-center", "text-sm", "text-zinc-400"]],
            ],
          },
        ],
      },
    ],
  };
}
