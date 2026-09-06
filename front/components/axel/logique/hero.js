// Logique du hero : parallaxe pilotée par le scroll, et fiche profil au clic
// sur le portrait. Le squelette vit dans ../hero.js.
//
// Le soleil descend, franchit la ligne d'horizon (div violette = couleur du
// fond) dont le raccord est planqué derrière les hexagones -> il disparait.
// Le portrait glisse ensuite de derrière cette ligne jusqu'à sa place, s'y
// fige un instant, puis repart avec la page.
// Aucune opacité, tout est réversible (remonter = rembobiner).

import generateStructure from "../../../lib/generate-structure.js";
import ProfileCard from "../components/profilecard.js";
import { closeProfileCard } from "./profilecard.js";

// --- Timeline (en fraction de hauteur d'écran) ------------------------------
const RUN = 0.6; // longueur de scroll de l'animation (en écrans)
const SUN_TRAVEL = 1.2; // distance de descente totale du soleil
const PORTRAIT_START = 0.5; // écrans de scroll avant qu'il commence à sortir
const PORTRAIT_SLIDE = 0.55; // écrans de scroll que dure la descente
const PORTRAIT_RISE = 0.55; // de combien il part au-dessus de sa place
const PORTRAIT_Y = 0.6; // où il se pose (fraction d'écran)
const DWELL = 0.6; // écrans de scroll où il reste figé avant de repartir
const CITY_PARALLAX = 0.6; // 0 = fixe, 1 = suit le scroll

// --- Recul du portrait quand la fiche s'affiche -----------------------------
const CARD_SHIFT = "14rem"; // fiche fermée
const CARD_SHIFT_OPEN = "27rem"; // fiche dépliée

let cardShown = false;
let cardMounted = false;

let heroAnimSetup = false;
let rafId = null;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function updateHero() {
  rafId = null;

  const section = document.getElementById("hero");
  const scene = document.querySelector('[data-scene="hero"]');
  if (!section || !scene) return;

  const celestial = scene.querySelector("[data-celestial]");
  const horizon = scene.querySelector("[data-horizon]");
  const cityscape = scene.querySelector("[data-cityscape]");
  const portrait = scene.querySelector("[data-portrait]");
  if (!celestial || !horizon || !cityscape || !portrait) return;

  const vh = window.innerHeight;
  const rect = section.getBoundingClientRect();
  const run = vh * RUN;
  const scrolled = Math.max(0, -rect.top); // scroll BRUT (non plafonné)
  const s = Math.min(scrolled, run); // plafonné pour l'animation
  const p = s / run; // progression 0 → 1

  // soleil : descend et passe sous la ligne d'horizon → masqué
  celestial.style.transform = `translate(-50%, ${p * vh * SUN_TRAVEL}px)`;

  // ville + hexagones + horizon : solidaires, parallaxe douce
  const slow = `translateY(${s * CITY_PARALLAX}px)`;
  cityscape.style.transform = slow;
  horizon.style.transform = slow;

  // portrait : glisse de derrière la ligne d'horizon jusqu'à sa place, s'y
  // fige un instant, puis repart avec la page.
  const slide = clamp(
    (scrolled - vh * PORTRAIT_START) / (vh * PORTRAIT_SLIDE),
    0,
    1,
  );
  portrait.hidden = slide <= 0;

  const lock = vh * (PORTRAIT_START + PORTRAIT_SLIDE + DWELL);
  const past = Math.max(0, scrolled - lock);

  // Le portrait vit DANS l'horizon (pour être rogné par la ligne), mais on le
  // veut positionné par rapport à l'écran : on retranche la position écran du
  // haut de l'horizon, qui défile en parallaxe.
  const horizonTop = rect.top + vh + s * CITY_PARALLAX;
  const centerY = vh * (PORTRAIT_Y - PORTRAIT_RISE * (1 - slide)) - past;
  portrait.style.transform = `translate(-50%, -50%) translateY(${centerY - horizonTop}px)`;
}

function onScroll() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(updateHero);
}

/** Affiche/masque la fiche à droite du portrait, et recule ce dernier. */
export async function togglePortraitCard() {
  const dock = document.querySelector("[data-portraitdock]");
  const slot = document.querySelector("[data-cardslot]");
  if (!dock || !slot) return;

  // le hero ne possède que le recul du portrait ; la fiche gère son propre
  // dépliement et nous rappelle via onToggle pour qu'on ajuste ce recul.
  const shift = (open) => {
    dock.style.transform = `translateX(-${open ? CARD_SHIFT_OPEN : CARD_SHIFT})`;
  };

  if (!cardMounted) {
    cardMounted = true;
    slot.appendChild(generateStructure(await ProfileCard({ onToggle: shift })));
  }

  cardShown = !cardShown;
  if (!cardShown) closeProfileCard(); // on masque toujours en état replié

  dock.style.transform = cardShown ? `translateX(-${CARD_SHIFT})` : "";
  slot.style.opacity = cardShown ? "1" : "0";
  slot.style.pointerEvents = cardShown ? "auto" : "none";
}

export function mountHero() {
  if (!heroAnimSetup) {
    heroAnimSetup = true;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  // le DOM est rendu juste après l'appel du composant → on rejoue l'init
  requestAnimationFrame(() => requestAnimationFrame(updateHero));
  setTimeout(updateHero, 100);
  setTimeout(updateHero, 400);
}

export function destroyHero() {
  if (!heroAnimSetup) return;
  heroAnimSetup = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  if (rafId !== null) cancelAnimationFrame(rafId);
  rafId = null;
  cardShown = false;
  cardMounted = false;
}
